const mongoose = require('mongoose');



const hotelSchema = mongoose.Schema({
    name: {type : String,
            required :true},
    address : {type : String,
                 required :true},
    phoneNo : {type : Number,
                required :true},
    imageUrl : [{type : String}],
    restaurant_no : {
            type : Number,
            required:true,
            unique: true
    },
    openTime:{type : String,
                },
    closeTime:{type : String,
                },
    tag:{type: Boolean}
   
},

{timestamps:true}
)

module.exports = Restaurant = mongoose.model("restaurants",hotelSchema)