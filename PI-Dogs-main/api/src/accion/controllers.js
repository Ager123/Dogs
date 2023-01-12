const axios = require('axios');
const { Dog, Temperament } = require('../db.js');
const { API_KEY } = process.env;

const getApiInfo = async () => {
    
    const api = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`);
        const apiInfo = await api.data.map((el) => {
            return {
                id: el.id,
                name: el.name,
                image: el.image.url,
                lifespan: el.life_span,
                weight: el.weight.metric,
                height: el.height.metric,
                temperament: el.temperament
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

        const {name, height, weight, image, temperament, lifespan, created} = dogData
       
        const newDog = await Dog.create({
            name,
            height,
            weight,
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

        return newDog
    }
    
module.exports = { getApiInfo, getDbInfo, getAllDogs, createDog };