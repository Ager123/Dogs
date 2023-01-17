const { Router } = require('express');
// const Dogs = require("./dogs");
// const Temperaments = require("./temperaments")
const axios = require('axios');
const { Dog, Temperament } = require('../db.js');
const { getAllDogs, createDog ,getDbTemperaments,getApiTempsToDb } = require('../accion/controllers');
const { API_KEY } = process.env;

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get('/', (req, res) => {
    res.status(200).send('index')
});

router.get('/dogs', async (req, res) => {
    try {
      const { name } = req.query;
      const info = await getAllDogs(); 
  
      if (!name) {
        res.status(200).send(info); 
      }
      else {
        const filtrado = info.filter(ele => ele.name.toLowerCase().includes(name.toLowerCase())); 
  
        filtrado.length ?    res.status(200).send(filtrado) :   res.status(400).send('No breed matches'); 
      }
    } catch (error) {
      res.status(400).send(error); 
    }
  });

  router.get('/dogs/:idRaza', async (req, res) => {
    try {
        const id = req.params.idRaza;
        const allDogs = await getAllDogs();
  
        if (id) {
            let idDog = await allDogs.filter(dog => dog.id == id);
            idDog.length ? 
             res.status(200).send(idDog) : 
             res.status(404).send("Breed not found");
        }
    } catch (error) {
        res.status(400).send(error);
    }
  });

  router.post("/dogs", async (req, res) => {
    try {
        const dogData = { name, height, weight, avgWeight, image, temperament, lifespan, created } = req.body;
        if(!name||!height||!weight||!lifespan||!image||!temperament.length)return res.status(400).send("Datos imcompletos");
        if(name.length>100) return res.status(400).send("Name is too long")
        if(isNaN(avgWeight)) return res.status(400).send("Avg weight is NaN")

        const newDog = await createDog(dogData)
        // console.log(newDog)
        return res.status(201).send(newDog[0].id)
    } catch (error) {
        res.status(404).send(error)
    }
})

router.get("/temperaments", async (req,res)=>{
    try{
        const dbTemperament= await getDbTemperaments();
        // const dbTemperament = await Temperament.findAll({
        //     include: [{
        //         model: Dog,
        //         attributes: ['name'],
        //         through: {
        //             attributes: []
        //         }
        //     }]
        // })
        if(dbTemperament.length<50){
            const dbT= await getApiTempsToDb();
            // const apiData = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`)
            // const apiTemperament = apiData.data.map(e => {
            //     return{
            //         temperament: e.temperament
            //     }
            // })
            // let aux = apiTemperament.map(e => Object.values(e)).flat().join(', ').split(', ');
            // let aux2 = new Set(aux)
            // let aux3 = [...aux2]
            // let arrayTemperaments = aux3.filter(e => e !== '').slice(1);
            // let temperamentsFinal = arrayTemperaments.sort()
            // temperamentsFinal.map(e => Temperament.findOrCreate({
            //     where: {name: e}
            // }))
            // const dbT = await Temperament.findAll({
            //     include: [{
            //         model: Dog,
            //         attributes: ['name'],
            //         through: {
            //             attributes: []
            //         }
            //     }]
            // })
            return res.status(200).send(dbT)
        } else{ res.status(200).send(dbTemperament)}
    }catch (error){
        res.status(404).send(error)
    }
})

module.exports = router;