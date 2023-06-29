const generateOtp = function () {
    const digits = '0123456789';
    let otp = '';
  
    for (let i = 0; i < 4; i++) {
      const randomIndex = Math.floor(Math.random() * digits.length);
      otp += digits[randomIndex];
    }
  
    return otp;
}

module.exports = { generateOtp }