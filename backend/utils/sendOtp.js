const dotenv = require('dotenv');
dotenv.config();
const twilio = require('twilio')

const accountSid = process.env.Twilio_SID;
const authToken = process.env.Twilio_Auth_Token;
const twiliophonenumber = process.env.Twilio_Phone_Number;



const sendOtp = function (phoneNumber, otp) {
  
}

module.exports = {sendOtp}
  
