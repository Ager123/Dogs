const { Router } = require('express');
// const Dogs = require("./dogs");
// const Temperaments = require("./temperaments")
const axios = require('axios');
const { Dog, Temperament } = require('../db.js');
const { getAllDogs, createDog } = require('../accion/controllers');
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
  
        filtrado.length ? 
        res.status(200).send(filtrado) :
         res.status(400).send('No se encuentra el perro'); 
      }
  
  
    } catch (error) {
      res.send('getAllDogs error', error); 
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
             res.status(404).json("Raza no encontrada xD");
        }
    } catch (error) {
        res.status(400).json("getAllDogs:idRaza error");
    }
  });

  router.post("/dogs", async (req, res) => {
    try {
        const dogData = { name, height, weight, image, temperament, lifespan, created } = req.body;

        if(!name||!height||!weight||!lifespan||!image||!temperament)return res.status(400).json("Datos imcompletos");

        const newDog = await createDog(dogData)
        return res.status(201).send(`Perro agregado exitosamente`)

    } catch (error) {
        console.log(error)
    }
})

router.get("/temperaments", async (req,res)=>{
    try{
        const dbTemperament = await Temperament.findAll({
            include: [{
                model: Dog,
                attributes: ['name'],
                through: {
                    attributes: []
                }
            }]
        })
        if(!dbTemperament.length){
            const apiData = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`)

            const apiTemperament = apiData.data.map(e => {
                return{
                    temperament: e.temperament
                }
            })

            let aux = apiTemperament.map(e => Object.values(e)).flat().join(', ').split(', ');
            let aux2 = new Set(aux)
            let aux3 = [...aux2]
            let arrayTemperaments = aux3.filter(e => e !== '').slice(1);

            let temperamentsFinal = arrayTemperaments.sort()
           // console.log(temperamentsFinal)

            temperamentsFinal.map(e => Temperament.findOrCreate({
                where: {name: e}
            }))
            const dbT = await Temperament.findAll({
                include: [{
                    model: Dog,
                    attributes: ['name'],
                    through: {
                        attributes: []
                    }
                }]
            })
            return res.json(dbT)
        } else{ res.json(dbTemperament)}
    }catch (error){
        console.log(error)
    }
}
)
  


// router.use('/dogs', Dogs);
// router.use('/temperaments', Temperaments);




module.exports = router;
