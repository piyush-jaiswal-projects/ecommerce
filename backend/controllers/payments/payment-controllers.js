const Payment = require('../../models/payments')
const dotenv = require('dotenv');
dotenv.config();
const Razorpay = require('razorpay')
const crypto = require('crypto');


const instance = new Razorpay({
    key_id: process.env.RZP_KEY_ID,
    key_secret: process.env.RZP_KEY_SECRET,
  });

const checkout = function(req, res) {
    const { userId, orderDetails, paymentAmt } = req.body;

    var options = {
        amount: (Number(paymentAmt) * 100),  // amount in the smallest currency unit
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
        // res.status(200).send({ rzpPaymentId: razorpay_payment_id, rzpOrderId: razorpay_order_id, paymentSuccess: true }).redirect();
  }
  else {
    const redirectFailureurl = process.env.FRONTEND_REDIRECT + `paymentfailed/?reference=${razorpay_payment_id}`;
      res.redirect(redirectFailureurl);
    }
}

module.exports = {checkout, paymentVerfication}