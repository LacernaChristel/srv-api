const mongoose = require('mongoose');
const {Schema} = mongoose;

const inventorySchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    reordorPoint: {
        type: Number,
        required: true
    }
});


module.exports =inventorySchema;
