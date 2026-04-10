const express = require("express");
const app = express();
const db = require("./db");

const bodyParser = require("body-parser");
app.use(bodyParser.json()); //req.body



const PORT = 3000;


app.get("/", (req,res) => {
    res.send("welcome to our resturent , what can i help you");
});


const PersonDetailRoutes = require("./routes/personRoute");
const MenuItemRoutes = require("./routes/menuRoute");
app.use("/api/auth", PersonDetailRoutes, MenuItemRoutes);

app.listen(PORT, () => {
    console.log(`Server is runnign on PORT ${PORT}`);
})