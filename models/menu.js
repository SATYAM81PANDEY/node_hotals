const { default: mongoose } = require("mongoose");
const mongooose = require("mongoose");

const menuItemSchema = new mongooose.Schema({
    name: {
        type:String,
        required: true
    },
    price: {
        type:Number,
        required: true
    },
    taste: {
        type:String
    },
    is_drink: {
        type:Boolean,
       default: false
    },
    ingradients: {
        type: [String],
        default: []
    },
    num_sales: {
        type: Number,
        default: 0
    }
});

const menuItemModel = mongoose.model("menu", menuItemSchema);

module.exports = menuItemModel;