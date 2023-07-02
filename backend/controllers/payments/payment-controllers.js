const dotenv = require('dotenv');
const Razorpay = require('razorpay')
const crypto = require('crypto');
const Payment = require('../../models/payments')

dotenv.config();

const instance = new Razorpay({
    key_id: process.env.RZP_KEY_ID,
    key_secret: process.env.RZP_KEY_SECRET,
  });

const checkout = function(req, res) {
    const { userId, orderDetails, paymentAmt } = req.body;

    var options = {
        amount: (Number(paymentAmt) * 100),  
        currency: "INR"
    };
    
      instance.orders.create(options, function(err, order) {
          if (err) {
              console.log(err);
              res.status(400).send({ message: "Order Creation Failed", order: {}, success: false });
              return;
          }
          
          res.status(200).send({ message: "Order Created", order:order, key: process.env.RZP_KEY_ID, success: true });
      });
}

const paymentVerfication = function (req, res) {
    const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = req.body;
    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const generated_signature = crypto
        .createHmac("sha256", process.env.RZP_KEY_SECRET)
        .update(body.toString())
        .digest("hex");
    
    if (generated_signature == razorpay_signature) {
        const redirectSuccessurl = process.env.FRONTEND_REDIRECT + `paymentsuccess/?reference=${razorpay_payment_id}`;
        res.redirect(redirectSuccessurl);
  }
  else {
    const redirectFailureurl = process.env.FRONTEND_REDIRECT + `paymentfailed/?reference=${razorpay_payment_id}`;
      res.redirect(redirectFailureurl);
    }
}

module.exports = {checkout, paymentVerfication}