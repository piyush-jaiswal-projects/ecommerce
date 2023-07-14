const dotenv = require('dotenv')
const Razorpay = require('razorpay')
const crypto = require('crypto')
const axios = require('axios')
const url = require('url')

const Payment = require('../../models/payments')
const User = require('../../models/user')

dotenv.config();

const instance = new Razorpay({
    key_id: process.env.RZP_KEY_ID,
    key_secret: process.env.RZP_KEY_SECRET,
});

function CalDelDate(id, address) {
    var today = new Date();
    var dayAfterTomorrow = new Date();
    dayAfterTomorrow.setDate(today.getDate() + 7);
    return dayAfterTomorrow.toLocaleDateString('en-US', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
    });
}

const checkout = function (req, res) {
    const { userId, orderDetails, paymentAmt, address } = req.body;

    var options = {
        amount: (Number(paymentAmt) * 100),
        currency: "INR"
    };

    instance.orders.create(options, async function (err, order) {
        if (err) {
            console.log(err);
            res.status(400).send({ message: "Order Creation Failed", order: {}, success: false });
            return;
        }

        res.status(200).send({ message: "Order Created", order: order, key: process.env.RZP_KEY_ID, success: true });
    });
}

const paymentVerfication = async function (req, res) {
    const currentUrl = req.protocol + '://' + req.get('host') + req.originalUrl;

    const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = req.body;
    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const parsedUrl = new URL(currentUrl);
    const queryParams = Object.fromEntries(parsedUrl.searchParams.entries());
    const userId = queryParams.id;

    const generated_signature = crypto
        .createHmac("sha256", process.env.RZP_KEY_SECRET)
        .update(body.toString())
        .digest("hex");

    const redirectFailureurl = process.env.FRONTEND_REDIRECT + `paymentfailed/?reference=0`;
    const redirectSuccessurl = process.env.FRONTEND_REDIRECT + `paymentsuccess/?reference=${razorpay_payment_id}`;

    if (generated_signature !== razorpay_signature) {
        res.redirect(redirectFailureurl);
        return;
    }

    try {
        await axios.post(`${process.env.BACKEND_URL}/api/user/placeOrder`,
            { userId: userId, refNum: razorpay_payment_id })
            .then((response) => {
                if (response.data.success) {
                    res.redirect(redirectSuccessurl);
                    return;
                }
                else {
                    res.redirect(redirectFailureurl);
                }
            })
    } catch (error) {
        console.log(error);
        res.redirect(process.env.FRONTEND_REDIRECT + `error`);
    }
}

module.exports = { checkout, paymentVerfication }