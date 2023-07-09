const dotenv = require('dotenv')
dotenv.config()

const User = require('../../models/user')
const calculateDelCharge = require('../../utils/calculateDelCharge')
const { ObjectId } = require('mongodb')


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
        return;
    }

    const newCart = [...user.cart, product];

    const status = await User.updateOne({ _id: userId }, { $set: { cart: newCart } });
    if (status.acknowledged) {
        const user = await User.findOne({ _id: userId });
        if (user) {
            res.status(200).send({ message: "Product added to cart", cart: user.cart, success: true });
            return;
        }
    }
    res.status(400).send({ message: "Can't add product to cart", success: false });
}


const addToWishlist = async (req, res) => {
    const { userId, product } = req.body;

    const user = await User.findOne({ _id: userId });
    if (!user) {
        res.status(400).send({ message: "User doesn't exist", success: false });
        return;
    }

    const newWishlist = [...user.wishlist, product];
    const status = await User.updateOne({ _id: userId }, { $set: { wishlist: newWishlist } });
    if (status.acknowledged) {
        const user = await User.findOne({ _id: userId });
        if (user) {
            res.status(200).send({ message: "Product added",wishlist: user.wishlist, success: true });
            return;
        }
    }
    res.status(400).send({ message: "Can't add product to wishlist",wishlist:[], success: false });
}


const getCart = async (req, res) => {
    const { userId } = req.body;
    if (!userId) {
        res.status(400).send({ message: "Invalid User ID", cart: [], success: false });
        return;
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
    try {
        const { userId, refNum } = req.body;
            
        const user = await User.findOne({ _id: userId });
        if (!user) {
            res.status(400).send({ message: "User doesn't exist", success: false });
            return;
        }
        const newOrders = [...user.placedOrders.items, ...user.cart];
        const newRefNum = [...user.placedOrders.refNum, refNum];
        const status = await User.updateOne({ _id: userId }, { $set: { placedOrders: { items: newOrders, refNum: newRefNum }, cart: [] } });

        if (!status.acknowledged) {
            res.status(400).send({ message: "Order Not Placed", success: false });
            return;
        } 

        res.status(200).send({message: "Order Placed", success: true})
        
    } catch (error) {
        console.log(error);
        res.status(400).send({ message: "Order Not Placed", success: false });
    }
}

const cancelOrder = async (req, res) => {
    console.log("Got a call");
    try {
        const { userId, orderId } = req.body;
            
        const user = await User.findOne({ _id: userId });
        if (!user) {
            res.status(400).send({ message: "User doesn't exist", success: false });
            return;
        }
        const orders = user.placedOrders;
        const oid = new ObjectId(orderId)
        for (let i = 0; i < orders.items.length; i++){
            if (oid.equals(orders.items[i]._id)) {
                console.log("inside");
                orders.items[i].expectedDelivery = "---"
                orders.items[i].orderStatus = "CANCELLED"
            }
        }

        const status = await User.updateOne({ _id: userId },
            { $set: { placedOrders: { items: orders.items, refNum: user.placedOrders.refNum }, cart: [] } });

        if (!status.acknowledged) {
            res.status(400).send({ message: "Order Cancellation Failure", success: false });
            return;
        } 

        res.status(200).send({message: "Order Cancelled", success: true})
        
    } catch (error) {
        console.log(error);
        res.status(400).send({ message: "Order Cancellation Failure", success: false });
    }
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
    if (!userId) {
        res.status(400).send({ message: "User doesn't exists", success: false });
        return;
    }
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
        res.status(200).send({ message: "Addresses", addresses: [...user.addresses, {location: address, pincode: pincode, delCharge: delCharge}], success: true });
        return;
    }
    res.status(400).send({ message: "Address Not Added",addresses:[], success: false });
}

const getOrders = async (req, res) => {
    const { userId } = req.body;
    if (!userId) {
        res.status(400).send({ message: "Invalid User ID", cart: [], success: false });
        return;
    }
    else {
        const user = await User.findOne({ _id: userId });
        if (!user) {
            res.status(400).send({ message: "User doesn't exist", placedOrders: [], success: false });
        }
        else {
            res.status(200).send({ message: "Orders Received", placedOrders: user.placedOrders, success: true });
        }   
    }
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
    setAddress,
    getOrders,
    cancelOrder
}