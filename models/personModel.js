const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const personSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },

    work: {
        type: String,
        enume: ["chef", "waiter", "manager"],
        required: true
    },

    mobile: {
        type: Number
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    address: {
        type: String
    },

    salery: {
        type:Number,
        required: true
    },
    username: {
        type:String,
        required: true
    },
    password: {
        type:String,
        required: true
    }
});

personSchema.pre("save", async function () {
    const person = this;

    // hash the password only if it has been modified (or new)
    if(!person.isModified("password")) return ;
    try{
        //  generation hash password
        const salt = await bcrypt.genSalt(10);

        // hash password
        const hashPassword = await bcrypt.hash(person.password, salt);
        // override to the plain password with the hash password
        person.password = hashPassword;
        
        
    }catch(err){
        console.log(err);
    }
})

personSchema.methods.comparePassword = async function (candidatePassword) {
    try{
    // Use bcrypt to compare the provided password with the hashed password
      const isMatch = await bcrypt.compare(candidatePassword, this.password);
      return isMatch; 
    }
    catch(err){
        throw err;
    }
}

// create person model
const personModel = mongoose.model("person", personSchema);

module.exports = personModel;