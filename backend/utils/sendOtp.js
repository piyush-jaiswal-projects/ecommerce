const dotenv = require('dotenv');
dotenv.config();

const accountSid = process.env.Twilio_SID;
const authToken = process.env.Twilio_Auth_Token;
const twiliophonenumber = process.env.Twilio_Phone_Number;

const client = require('twilio')(accountSid, authToken);

const sendOtp = function (phoneNumber, otp) {
    const message = `Greetings from 1610 Collections. Your OTP is: ${otp}`;
  
    client.messages
      .create({
        body: message,
        from: twiliophonenumber,
        to: phoneNumber
      })
      .then(message => console.log(message.sid))
      .catch(error => console.log(error));
}

module.exports = {sendOtp}
  
