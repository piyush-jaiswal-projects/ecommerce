const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    orderDetails: {},
    paymentAmt: { type: Number, required: true },
    paymentSuccess: { type: Boolean, required: true },
    rzpPaymentId: {type: String},
    rzpOrderId: {type: String},
    rzpSignature: {type: String}
}); 

module.exports = paymentSchema;