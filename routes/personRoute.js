const express = require("express");
const router = express.Router();


// database schema requre
const Person = require("../models/personModel");
router.post("/person", async (req, res) => {
   try{
         // here get data from the body parser
    const data = req.body; // assuming the request body contains the person data

    // Create a new person document using the mongoose model
    const newPerson = new Person(data);

    // saved the new person in the database
    const saveData = await newPerson.save();
    console.log("Data saved");
    res.status(200).json(saveData);
   }
   catch(err){
    console.log(err);
    res.status(500).json({
        message: "Internal server error"
    })
   }
})



router.get("/person", async (req, res) => {
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
        req.status(500).json({
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