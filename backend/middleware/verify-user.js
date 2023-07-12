const User = require('../models/user')

const verifyUser = async (req, res, next) => {
    try {
        const { userId } = req.body;
        if (userId === "") {
            res.status(400).send({ message: "Wrong User ID", success: false });
            return;
        }

        const user = await User.findOne({ _id: userId });

        if (!user) {
            res.status(400).send({ message: "User doesn't exist", success: false });
            return;
        }

        res.locals.user = user;
        next()
    } catch (error) {
        console.log("Midleware Error: " + error);
        res.status(500).send({ message: "Server Crashed", success: false });
    }
}

module.exports = { verifyUser }