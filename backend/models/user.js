const mongoose = require('mongoose')


const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    userName: { type: String, required: true },
    addresses: [{
        location: { type: String },
        pincode: { type: Number },
        delCharge: {type: Number}
    }],
    password: { type: String, requires: true},
    cart: [{
        product: {},
        selectedSize: { type: String },
        quantity: { type: Number },
        orderStatus: { type: String },
        expectedDelivery: {type: String}
    }],
    placedOrders: {
        items: [],
        refNum: []
    },
    wishlist: [{
        product: {},
        selectedSize: { type: String },
        quantity: {type: Number}
    }]
})

module.exports = mongoose.model("User", userSchema);