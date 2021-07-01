const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const passport = require('passport');
const { urlencoded } = require('express');
require('./models/Admin')
require('./models/Restorant')

const admin = require('./routes/admin')
const restaurant = require('./routes/task.admin')
const user = require('./routes/task.user')


const app = express();
//middleware

var corsOptions={
    origin: "http://localhost:3000"
  };
  app.use(cors(corsOptions))
app.use(urlencoded({extended:true}));
app.use(express.json());


const db= require('./dbconfig/db.config').url;

//connect to mongo

mongoose.connect(db,{useCreateIndex:true,
                    useUnifiedTopology:true,
                    useNewUrlParser:true})
                    .then(()=>{console.log('Connected to database')})
                    .catch((e)=>{console.log(e)});

//passport middleware

app.use(passport.initialize());


//define passport.js here
require('./dbconfig/passport')(passport);


//routes

app.use(admin)
app.use(restaurant)
app.use(user)


//connection to server  

const port = process.env.PORT || 8000;
app.listen(port , ()=>{console.log('Connected to Server')})






