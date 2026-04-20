const passport = require("passport");
const Person = require("./models/personModel");
const LocalStrategy = require("passport-local").Strategy;


passport.use(new LocalStrategy(async (USERNAME, Password, done) => {
    try{

      // Authentication logic
         const user = await Person.findOne({username: USERNAME})
      if(!user){
        return done(null, false, {message: "Incorrect Username"});
      }

      const isPasswordMatch = await user.comparePassword(Password);

      if(isPasswordMatch){
        return done(null, user);
      }
      else{
        return done(null, false, {message: "Incorrect password"});
      }
    }catch(err){
      return done(err);
    }
}));

module.exports = passport; // export configured password