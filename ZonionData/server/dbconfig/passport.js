const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const mongoose = require('mongoose');
const keys =require('./db.config');
const Admin = mongoose.model("admins");

const opts ={};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretOrKey;


module.exports = passport =>{
    passport.use(
        new JWTStrategy(opts,(jwt_payload,done)=>{
                Admin.findById(jwt_payload.id)
                .then(admin => {
                    if(admin) {
                        return done(null,admin);
                    }
                    return done(null, false);
                   })
                .catch(err=>console.log(err))
        })
    );
};

