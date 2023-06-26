const User = require('../../models/user')

const getDetails = async (req, res) => {
    const { userId } = req.body;
    const user = await User.findOne({ _id: userId });
    if (!user) {
        res.status(400).send({ message: "User doesn't exist", success: false });
    }
    res.status(200).send({ message: "Details Received", user: user, success: true });
}

const addToCart = async (req, res) => {
    const { userId, product } = req.body;
    const user = await User.findOne({ _id: userId });
    if (!user) {
        res.status(400).send({ message: "User doesn't exist" });
    }
    const newCart = [...user.cart, product];
    const status = await User.updateOne({ _id: userId }, { $set: { cart: newCart } });
    if (status.acknowledged) {
        res.status(200).send({ message: "Product added to cart", success: true });
        return;
    }
    res.status(400).send({ message: "Can't add product to cart", success: false });
}

const addToWishlist = async (req, res) => {
    const { userId, product } = req.body;
    const user = await User.findOne({ _id: userId });
    if (!user) {
        res.status(400).send({ message: "User doesn't exist", success: false });
    }
    const newWishlist = [...user.wishlist, product];
    const status = await User.updateOne({ _id: userId }, { $set: { wishlist: newWishlist } });
    if (status.acknowledged) {
        res.status(200).send({ message: "Product added", success: true });
        return;
    }
    res.status(400).send({ message: "Can't add product to wishlist", success: false });
}

const getCart = async (req, res) => {
    const { userId } = req.body;
    const user = await User.findOne({ _id: userId });
    if (!user) {
        res.status(400).send({ message: "User doesn't exist", success: false });
    }
    else {
        res.status(200).send({ message: "Cart Received", cart: user.cart, success: true });
    }
}

const getWishlist = async (req, res) => {
    const { userId } = req.body;
    const user = await User.findOne({ _id: userId });
    if (!user) {
        res.status(400).send({ message: "User doesn't exist", success: false });
    }
    else {
        res.status(200).send({ message: "Wishlist Received", wishlist: user.wishlist, success: true });
    }
}

const placeOrder = async (req, res) => {
    const { userId, cart } = req.body;
    const user = await User.findOne({ _id: userId });
    if (!user) {
        res.status(400).send({ message: "User doesn't exist", success: false });
    }
    const status = await User.updateOne({ _id: userId }, { $set: { placedOrders: cart } });
    if (status.acknowledged) {
        res.status(200).send({ message: "Order placed", success: true });
        return;
    }
    res.status(400).send({ message: "Order not placed", success: false});
}

module.exports = {getDetails, addToCart, addToWishlist, getCart, getWishlist, placeOrder}