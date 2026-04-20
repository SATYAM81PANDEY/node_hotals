const express = require("express");
const router = express.Router();
const  {jwtAuthMiddleware, generateToken} = require("../jwt");

// database schema requre
const Person = require("../models/personModel");
router.post("/signup", async (req, res) => {
   try{
         // here get data from the body parser
    const data = req.body; // assuming the request body contains the person data

    // Create a new person document using the mongoose model
    const newPerson = new Person(data);

    // saved the new person in the database
    const saveData = await newPerson.save();
    console.log("Data saved");
  
    const payLoad = {
        id: saveData.id,
        username: saveData.username
    }

    const token = generateToken(payLoad);
    res.status(200).json({saveData: saveData, token: token});
   }
   catch(err){
    console.log(err);
    res.status(500).json({
        message: "Internal server error"
    })
   }
})

// Create login api
router.post("/login", async (req, res) => {
    try{
       
        //  extract the username and password from the request body
    const {username, password} = req.body;

    // find user by username from database
    const user = await Person.findOne({username: username});

    // if user does not exist or password does not exist then return error
    if(!user || !(await user.comparePassword(password))){
        return res.status(401).json({
            message: "Invalid username or password"
        })
    }

    // if user are found then generate token
    const payload = {
        id: user.id,
        username: user.username
    }

    const token = generateToken(payload);

    // return token as response
    res.json({token});
    }
    catch(err){
       console.log(err);
       res.status(500).json({message: "Internal serer error"});
    }
})

router.get("/person",jwtAuthMiddleware, async (req, res) => {
    try{
       const findData = await Person.find();
       console.log("Data Fetched");
       res.status(200).json(findData);
    }
    catch(err) {
        console.log("internal server error", err);
        res.status(500).json({
            message: "Internal server error"
        })
    }
})


// find perticular workers based on their works
router.get("/person/:work", async (req, res) => {
    try{
        const workType = req.params.work;

    if(workType == "chef" || workType == "waiter" || workType == "manager"){
        const person = await Person.find({work: workType});
        console.log(person);
           res.status(201).json(person);
    }else{
        res.status(404).json({
            message: "404  wrong type please try again"
        })
    }
        
    }
    catch(err){
        console.log(err);
        res.status(500).json({
            message: "Internal server error"
        })
    }
});


// to update user data likke their id
router.put("/person/:id", async (req, res) => {
    try{
       const personId = req.params.id; // extract the id from the url parameter
       const updatedPersonData = req.body; //updated data for the person

       const response = await Person.findByIdAndUpdate(personId, updatedPersonData, {
           new:true, // Return the updated document
           runValidators: true  //run mongoose validation
       });

    //    if data is not found
       if(!response){
        res.status(400).json({
            message: "Person Not Found"
        })
       }

      console.log("Data is Updated");
      res.status(201).json(response);

    }
    catch(err){
        console.log(err);
        res.status(500).json({
            message: "Internal Server Error"
        })
    }
});


// to delete person data
router.delete("/person/:id", async (req, res) => {
   try{
     const personId = req.params.id;

    const response = await Person.findByIdAndDelete(personId);

    if(!response){
        res.status(404).json({
            message: "Person Not Found"
        })
    }
    console.log("Data is deleted");
    res.status(201).json({
        message: "Person Deleted Successfully"
    });
     
   }
   catch(err){
    res.status(500).json({
        message: "Internal Server Error"
    })
   }
    
})


module.exports = router;