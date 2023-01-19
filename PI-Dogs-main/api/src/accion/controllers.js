const axios = require('axios');
const { Dog, Temperament } = require('../db.js');
const { API_KEY } = process.env;

const getApiInfo = async () => {
    const api = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`);
        const apiInfo = await api.data.map((el) => {
            let nw=""
            let [minWeight,maxWeight]=el.weight.metric.split(" - ")
            if(el.weight.metric==="NaN") {
                nw="Unknown"; 
                avgWeight="500"
            }else if(minWeight==="NaN") {
                nw=maxWeight;
                avgWeight=maxWeight
            }else if(!maxWeight){
                nw=minWeight;
                avgWeight=minWeight
            }
            else{ 
                nw=el.weight.metric
                avgWeight=`${(parseInt(maxWeight)+parseInt(minWeight))/2}`
            }
            return {
                id: el.id,
                name: el.name,
                image: el.image.url,
                lifespan: el.life_span,
                weight: nw,
                height: el.height.metric,
                temperament: el.temperament,
                avgWeight
            };
        });
        return apiInfo;  
};

const getDbInfo = async () => {
        return await Dog.findAll({ 
            include: {
                model: Temperament,  
                attributes: ["name"], 
                through: {
                    attributes: [],
                },
            },
        });
};

const getAllDogs = async () => {
        const apiInfo = await getApiInfo();
        const dbInfo = await getDbInfo();
        const allInfo = [...apiInfo, ...dbInfo];
        return allInfo;
}

const createDog = async (dogData) => {
    const {name, height, weight, avgWeight,image, temperament, lifespan, created} = dogData
    const newDog = await Dog.create({
        name,
        height,
        weight,
        avgWeight,
        lifespan,
        image,
        created,
    })
    await temperament.forEach(async (temp) => {
        const tempDb= await Temperament.findOrCreate({
            where: {name:temp}
        })
        await newDog.addTemperament(tempDb[0])
    });
    const createdDog= await Dog.findAll({
        where: {
            name,
            height,
            weight,
            avgWeight,
            lifespan,
            image,
            created,
        }
    })
    return createdDog
}

const getDbTemperaments= async()=>{
    const dbTemps= await Temperament.findAll({
        include: [{
            model: Dog,
            attributes: ['name'],
            through: {
                attributes: []
            }
        }]
    })
    const sortedTemps=dbTemps.sort(function(a,b){
        if(a.name.toLowerCase()>b.name.toLowerCase())return 1;
        if(a.name.toLowerCase()<b.name.toLowerCase())return -1;
        return 0
    })
    return sortedTemps
}

const getApiTempsToDb=async()=>{
    const apiData = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`)
    const apiTemperament = apiData.data.map(e => {
        return{
            temperament: e.temperament
        }
    })
    let tempMap = apiTemperament.map(e => Object.values(e)).flat().join(', ').split(', ');
    let set = new Set(tempMap)
    let tempNoRepeat = [...set]
    let allTemperaments = tempNoRepeat.filter(e => e !== '').slice(1);

    await allTemperaments.map(e => Temperament.findOrCreate(
        {
            where: {name: e}
        }))
    return await getDbTemperaments();
}
module.exports = { getApiInfo, getDbInfo, getAllDogs, createDog,getDbTemperaments,getApiTempsToDb};