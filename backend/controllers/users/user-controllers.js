const User = require('../../models/user')

function calculateDelCharge(pincode) {
    const subString = pincode.substring(0, 2);
    const price = [50, 100, 60, 40, 20, 30, 40, 20, 50, 100, 90, 150, 120, 30, 10, 15, 25, 23, 90, 80, 50, 60, 30, 20, 40, 90, 100]
    return price[subString];
}

const getDetails = async (req, res) => {
    const { userId } = req.body;
    const user = await User.findOne({ _id: userId });
    if (!user) {
        res.status(400).send({ message: "User doesn't exist", success: false });
        return;
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
        const user = await User.findOne({ _id: userId });
        if (user) {
            res.status(200).send({ message: "Product added to cart",cart: user.cart, success: true });
        }
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
        const user = await User.findOne({ _id: userId });
        if (user) {
            res.status(200).send({ message: "Product added",wishlist: user.wishlist, success: true });
        }
        return;
    }
    res.status(400).send({ message: "Can't add product to wishlist",wishlist:[], success: false });
}

const getCart = async (req, res) => {
    const { userId } = req.body;
    if (!userId) {
        res.status(400).send({ message: "Invalid User ID", cart: [], success: false });
    }
    else {
        const user = await User.findOne({ _id: userId });
        if (!user) {
            res.status(400).send({ message: "User doesn't exist", cart: [], success: false });
        }
        else {
            res.status(200).send({ message: "Cart Received", cart: user.cart, success: true });
        }   
    }
}

const getWishlist = async (req, res) => {
    const { userId } = req.body;
    if (!userId) {
        res.status(400).send({ message: "Invalid User ID", cart: [], success: false });
    }
    else {
        const user = await User.findOne({ _id: userId });
        if (!user) {
            res.status(400).send({ message: "User doesn't exist", wishlist: [], success: false });
        }
        else {
            res.status(200).send({ message: "Wishlist Received", wishlist: user.wishlist, success: true });
        }
    }
}

const placeOrder = async (req, res) => {
    const { userId, cart } = req.body;
    const user = await User.findOne({ _id: userId });
    if (!user) {
        res.status(400).send({ message: "User doesn't exist", success: false });
        return;
    }
    const newCart = [...user.placedOrders, ...cart];
    const status = await User.updateOne({ _id: userId }, { $set: { placedOrders: newCart, cart: [] } });
    if (status.acknowledged) {
        res.status(200).send({ message: "Order placed", success: true });
        return;
    }
    res.status(400).send({ message: "Order not placed", success: false});
}

const removeFromCart = async (req, res) => {
    const { userId, productId } = req.body;
    const user = await User.findOne({ _id: userId });
    if (!user) {
        res.status(400).send({ message: "Can't Remove From Cart (User doesn't exists)", success: false });
        return;
    }

    const status = await User.updateOne({ _id: userId }, { $pull: { cart: { _id: productId } } });
    if (status.acknowledged === true) {
        const user = await User.findOne({ _id: userId });
        if (user) {
            res.status(200).send({ message: "Item Removed", cart: user.cart, success: true });
        }
    }
    else {
        res.status(400).send({ message: "Item Not Removed",cart:[], success: false});
    }

}

const removeFromWishlist = async (req, res) => {
    const { userId, productId } = req.body;
    const user = await User.findOne({ _id: userId });
    if (!user) {
        res.status(400).send({ message: "Can't Remove From Wishlist (User doesn't exists)", success: false });
        return;
    }

    const status = await User.updateOne({ _id: userId }, { $pull: { wishlist: { _id: productId } } });
    if (status.acknowledged === true) {
        const user = await User.findOne({ _id: userId });
        if (user) {
            res.status(200).send({ message: "Item Removed", wishlist: user.wishlist, success: true });
        }
    }
    else {
        res.status(400).send({ message: "Item Not Removed",wishlist:[], success: false});
    }

}

const getAddresses = async (req, res) => {
    const { userId } = req.body;
    const user = await User.findOne({ _id: userId });
    if (!user) {
        res.status(400).send({ message: "User doesn't exists", success: false });
        return;
    }
    res.status(200).send({ message: "Addresses", addresses: user.addresses, success: true });

}

const setAddress = async (req, res) => {
    const { userId, address, pincode } = req.body;
    const user = await User.findOne({ _id: userId });
    if (!user) {
        res.status(400).send({ message: "User doesn't exists",addresses:[], success: false });
        return;
    }
    const delCharge = calculateDelCharge(pincode);
    const status = await User.updateOne({ _id: userId }, { $set: { addresses: [...user.addresses, {location: address, pincode: pincode, delCharge: delCharge}] } });
    if (status.acknowledged) {
        res.status(200).send({ message: "Addresses", addresses: user.addresses, success: true });
        return;
    }
    res.status(400).send({ message: "Address Not Added",addresses:[], success: false });
}

module.exports = {
    getDetails,
    addToCart,
    addToWishlist,
    getCart,
    getWishlist,
    placeOrder,
    removeFromCart,
    removeFromWishlist,
    getAddresses,
    setAddress
}