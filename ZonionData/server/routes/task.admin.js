const express = require('express');
const Restaurant = require('../models/Restorant');
const router = express.Router();
const passport = require('passport');

router.post('/addRestaurant', 
    // passport.authenticate('jwt',{session : false}),
            (req,res)=>{
                    const NEW_ADDRESTAURANT= new Restaurant({
                        name:req.body.name,
                        address : req.body.address,
                        phoneNo : req.body.phoneNo,
                        imageUrl : req.body.imageUrl,
                        restaurant_no :req.body.restaurant_no,
                        openTime : req.body.openTime,
                        closeTime : req.body.closeTime,
                        tag: false
                    })
                    NEW_ADDRESTAURANT.save()
                        .then(add=>res.json(add))
                        .catch(err=>console.log(err));
            });

router.delete('/delete/:id',
          (req,res)=>{
                Restaurant.findByIdAndDelete(req.params.id)
                .then(()=> res.json({ success: true }))
                 .catch(err=>console.log(err)) 
            });



router.put('/update/:id',(req,res)=>{
    
    const id =req.params.id;
    

    Restaurant.findByIdAndUpdate(id,req.body,{useFindAndModify:false})
            .then(()=> res.json({ success: true }))
                 .catch(err=>console.log(err)) 
})

router.get('/:id',(req,res)=>{

   let id= req.params.id;
    Restaurant.findById(id)
        .then(restaurant=> {
            res.send(restaurant)
        })
        .catch(err=>console.log(err))
})



            module.exports = router;
        
