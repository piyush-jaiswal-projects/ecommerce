
const User = require('../../models/user');

const dotenv = require('dotenv');
dotenv.config();

const accountSid = process.env.Twilio_SID;
const authToken = process.env.Twilio_Auth_Token;
const twiliophonenumber = process.env.Twilio_Phone_Number;

const client = require('twilio')(accountSid, authToken);

const sendOtp = async function (phoneNumber, otp) {
    const message = `Greetings from 1610 Collections. Your OTP is: ${otp}`;
  
    client.messages
      .create({
        body: message,
        from: twiliophonenumber,
        to: phoneNumber
      })
      .then(message => console.log(message.sid))
      .catch(error => console.log("Error: " + error));
}

const generateOtp = function (length) {
    const digits = '0123456789';
    let otp = '';
  
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * digits.length);
      otp += digits[randomIndex];
    }
  
    return otp;
}

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
        await sendOtp(username, otp);
    
        res.status(200).send({otp: "", message: "OTP Sent", success: true});
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