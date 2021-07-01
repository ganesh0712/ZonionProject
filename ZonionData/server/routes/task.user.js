const express = require('express');

//controller
//validator
const Restaurant = require('../models/Restorant');

const router = express.Router();


router.get('/',async(req,res)=>{
let restaurantsArray =[];

await Restaurant.find()
    .then(restaurants=> {
        res.send(restaurants)
        // restaurants.map(restaurant=> {
        //      restaurantsArray.push(restaurant);
    
    })
});




router.get('/:id',);



module.exports = router;
