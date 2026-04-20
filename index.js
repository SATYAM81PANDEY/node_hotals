require("dotenv").config();
const express = require("express");
const app = express();
 const connectToDB = require("./db");
 const passport = require("./auth");



const bodyParser = require("body-parser"); 
app.use(bodyParser.json()); //req.body

 const PORT = process.env.PORT || 3000;
 connectToDB();

// middleware function
const logRequire = (req,res, next) => {
     console.log(`[${new Date().toLocaleString()}] Request Mode to : ${req.originalUrl}`);
    next();
}

app.use(passport.initialize());

app.use(logRequire);

// here use middleware

 const localAuthMiddleware = passport.authenticate("local", {session: false})

 app.get("/", (req,res) => {
    res.send("welcome to our resturent , what can i help you");
    });


const PersonDetailRoutes = require("./routes/personRoute");
const MenuItemRoutes = require("./routes/menuRoute");

app.use("/api/auth", PersonDetailRoutes);
app.use("/api/auth",  MenuItemRoutes);


 app.listen(PORT, () => {
   console.log(`Server is runnign on PORT ${PORT}`);
})


