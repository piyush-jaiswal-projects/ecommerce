const mongoose = require('mongoose')


const userSchema = new mongoose.Schema({
    userId: { type: String, required: true, unique: true },
    userName: { type: String, required: true },
    addresses: [{type:String, required: true}],
    cart: [{
        product: {},
        selectedSize: { type: String },
        quantity: {type: Number}
    }],
    placedOrders: [],
    wishlist: []
})

module.exports = mongoose.model("User", userSchema);