const express = require("express");
const route = express.Router();

const Menu = require("../models/menu");

// Menu worked
// to get data from the client side
route.post("/menu", async (req, res) => {
   try{
     const menuData = req.body;

    const menuDataStore = new Menu(menuData);
    const saveMenuData = await menuDataStore.save();
    console.log(saveMenuData);
    res.status(200).json(saveMenuData);
   }
   catch(err){
      console.log(err);
      res.status(500).json({
        message: "Internal server error"
      })
   }
});



// find menu data from the database
route.get("/menu", async (req,res) => {
   try{
     const findData = await Menu.find();
    console.log("Data Fetched");
    res.status(200).json(findData);
   }
   catch(err) {
         console.log(err);
         res.status(500).json({
           message: "internal server error"
         })
   }
});

// here find teste of food

route.get("/menu/:taste", async(req,res) => {
    try{
      const findTaste = await Menu.find();
      console.log("Taste finded");
        res.status(201).json(findTaste);
     }
     catch(err){
        console.log(err);
        res.status(500).json({
            message: "Internal server error"
        })
     }
})


module.exports = route;