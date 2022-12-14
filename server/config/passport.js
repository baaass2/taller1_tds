const JwtStategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../api/models/user');
const config = require('./database')


module.exports = function(passport){
    let opts = {};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt');
    opts.secretOrKey = config.secret;
    passport.use(new JwtStategy(opts, (jwt_payload, done) => {
        
        //console.log(opts);
        //console.log(jwt_payload);
        User.getUserById(jwt_payload._id, (err, user)=>{
            
            if(err){
                return done(err, false);
            }
            if(user){
                return done(null, user);
            } else {
                return done(null, false);
            }
        });
    }));
}