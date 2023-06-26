
const User = require('../../models/user')

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
        
        await newUser.save();
        res.status(200).send({message: "Registration Success", success: true});
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
    }
    catch (err) {
        console.log(err);
        res.status(500).send({message: "Login Failed!", success: false});
    }

}


module.exports = {signup, login}