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
    res.status(200).send('')
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
        filtrado.length ? 
             res.status(200).send(filtrado) : 
             res.status(200).send(["NotFound"]);
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
             res.status(200).send(["NotFound"]);
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
        return res.status(201).send(newDog[0].id)
    } catch (error) {
        res.status(404).send(error)
    }
})

router.get("/temperaments", async (req,res)=>{
    try{
        const dbTemperament= await getDbTemperaments();
        if(dbTemperament.length<50){
            const dbT= await getApiTempsToDb();
            return res.status(200).send(dbT)
        } else{ res.status(200).send(dbTemperament)}
    }catch (error){
        res.status(404).send(error)
    }
})

router.delete('/dogs',async (req,res)=>{
  let {id} = req.query
  try {
    await Dog.destroy({
     where: {
      id: id,
        }
    })
    res.status(200).json('dog deleted');  
  } catch (error) {
    res.status(400).json(error)
  }})

module.exports = router;