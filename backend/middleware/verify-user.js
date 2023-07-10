const User = require('../models/user')

const verifyUser = async (req, res, next) => {
    const { userId } = req.body;

    if (!userId) {
        res.status(400).send({ message: "Invalid User ID", cart: [], success: false });
        return;
    }

    const user = await User.findOne({ _id: userId });

    if (!user) {
        res.status(400).send({ message: "User doesn't exist", success: false });
        return;
    }

    res.locals.user = user;
    next()
}

module.exports = {verifyUser}