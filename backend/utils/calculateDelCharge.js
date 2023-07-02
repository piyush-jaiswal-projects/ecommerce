function calculateDelCharge(pincode) {
    const subString = pincode.substring(0, 2);
    const price = [50, 100, 60, 40, 20, 30, 40, 20, 50, 100, 90, 150, 120, 30, 10, 15, 25, 23, 90, 80, 50, 60, 30, 20, 40, 90, 100]
    return price[subString];
}

module.exports = calculateDelCharge;