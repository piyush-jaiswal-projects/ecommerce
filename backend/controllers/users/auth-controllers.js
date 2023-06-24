
const User = require('../../models/user')

const signup = async function (req, res) {
    try {
        const { name, username, password } = req.body;
        const existingUser = await User.findOne({ userName: username });

    if (existingUser) {
        res.status(400).send({ message: "User Already Exists" })
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
        res.status(200).send({message: "Registration Success"});
    }
    catch (err) {
        console.log(err);
        res.status(500).send({message: "Registration Failed!"});
    }
}

const login = async function (req, res) {
    console.log("Login Requested");
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ userName: username });
        if (user.password === password) {
            res.status(200).send({message: "Login Success"});
        }
    }
    catch (err) {
        console.log(err);
        res.status(500).send({message: "Login Failed!"});
    }

}


module.exports = {signup, login}