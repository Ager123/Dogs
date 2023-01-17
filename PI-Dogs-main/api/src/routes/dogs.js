const { Router } = require('express');
const { getAllDogs, createDog } = require('../accion/controllers');
const { Dog, Temperament } = require('../db');
const  axios  = require("axios");

const router = Router();

//-------------------------------DELETE------------------------------

     router.delete('/',async (req,res)=>{
        let {name} = req.query
        try {
         await Dog.destroy({
            where: {
              name: name,
            }
          })
          res.status(200).json('dog deleted');  
        } catch (error) {
          console.log(error)
        }})