
const User = require('../../models/user');
const axios = require('axios')
const { generateOtp } = require('../../utils/generateOtp')
const { sendOtp } = require('../../utils/sendOtp')

const dotenv = require('dotenv');
dotenv.config();
const twilio = require('twilio')

const accountSid = process.env.Twilio_SID;
const authToken = process.env.Twilio_Auth_Token;
const twiliophonenumber = process.env.Twilio_Phone_Number;


const otp = async function (req, res) {
    try {
        const { name, username, password } = req.body;
        const existingUser = await User.findOne({ userName: username });

    // if (existingUser) {
    //     res.status(400).send({ message: "User Already Exists", success: false})
    //     return;
    // }
        
        
        //create otp 
        const otp = generateOtp(4);
        console.log(otp);
        //handle promise properly
        const message = `Greetings from 1610 Collections. Your OTP is: ${otp}`;

        // const client = new twilio(accountSid, authToken)
        // client.messages
        //     .create({
        //         body: message,
        //         from: twiliophonenumber,
        //         to: username
        //     })
        //     .then(message => {
        //         console.log(message);
        //         res.status(200).send({otp: otp, message: "OTP Sent", success: true});
        //     })
        //     .catch(error => {
        //         console.log(">>>>>Catched Error: " + error)
        //         res.status(400).send({message: "OTP not sent", success: false});
        //     });

        // var data = JSON.stringify({
        //     "messages": [
        //         {
        //         "channel": "sms",
        //         "recipients": [
        //             username
        //         ],
        //         "content": message,
        //         "msg_type": "text",
        //         "data_coding": "text"
        //         }
        //     ],
        //     "message_globals": {
        //         "originator": "SignOTP",
        //         "report_url": "https://the_url_to_recieve_delivery_report.com"
        //     }
        //     });
            
        //     var config = {
        //     method: 'post',
        //     url: 'https://api.d7networks.com/messages/v1/send',
        //     headers: { 
        //         'Content-Type': 'application/json', 
        //         'Accept': 'application/json', 
        //         'Authorization': `Bearer`
        //     },
        //     data : data
        //     };
        
        //     axios(config)
        //     .then(function (response) {
        //     console.log(JSON.stringify(response.data));
        //     })
        //     .catch(function (error) {
        //     console.log(error);
        //     });

    }
    catch (err) {
        console.log(err);
        res.status(500).send({message: "OTP not sent", success: false});
    }
}

const signup = async function (req, res) {
    try {
        const { name, username, password } = req.body;

        const existingUser = await User.findOne({ userName: username });
    if (existingUser) {
        res.status(400).send({ message: "User Already Exists", success: false})
        return;
    }

    const newUser = new User({
        name: name,
        userName: username,
        password: password,
        addresses: [],
        cart: [],
        placedOrders: [],
        wishlist: []
    })
        
        const user = await newUser.save();
        res.status(200).send({user: user,   message: "Registration Success", success: true});
    }
    catch (err) {
        console.log(err);
        res.status(500).send({message: "Registration Failed!", success: false});
    }
}

const login = async function (req, res) {
    try {
        const { username, password } = req.body;

        const user = await User.findOne({ userName: username });
        if (!user) {
            res.status(400).send({ message: "User doesn't exist!", success: false });
            return;
        }

        if (user.password === password) {
            res.status(200).send({message: "Login Success", user: user, success: true});
        }
        else {
            res.status(400).send({message: "Wrong Credentials", success: false});
        }
    }
    catch (err) {
        console.log(err);
        res.status(500).send({message: "Login Failed!", success: false});
    }

}


module.exports = {signup, login, otp}