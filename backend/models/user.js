const mongoose = require('mongoose')


const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    userName: { type: String, required: true },
    addresses: [{ type: String }],
    password: { type: String, requires: true},
    cart: [{
        product: {},
        selectedSize: { type: String },
        quantity: {type: Number}
    }],
    placedOrders: [],
    wishlist: [{
        product: {},
        selectedSize: { type: String },
        quantity: {type: Number}
    }]
})

module.exports = mongoose.model("User", userSchema);