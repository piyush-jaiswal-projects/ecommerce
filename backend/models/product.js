const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    productId: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    stock: { type: Number},
    noOfPurchases: { type: Number },
    size: [],
    brand: {type: String},
    desc: { type: String, required: true },
    reviews: [{
        reviewerName: { type: String, required: true },
        reviewDesc: { type: String },
        rating: {type: Number, required: true}
    }],
    images: [{type: String, required: true}]
})

module.exports=mongoose.model("Product", productSchema)