import { createSlice } from '@reduxjs/toolkit'
import setCookie from '../functions/setCookie'
import getAllCookies from '../functions/getAllCookies'
import { initialCart } from '../data';

const userData = getAllCookies();

//get user cart from server

const initialState = {
    userLoggedIn: userData.userLoggedIn,
    userId: userData.userId,
    userName: userData.userName,
    addresses: ["Select Your Delivery Address", "New Delhi, India", "Chandigarh, India"],
    placedOrder: [],
    cart: initialCart,
    currAddressCharge: 0,
    wishlist: userData.wishlist,
    error: null
}

const userReducer = createSlice({
    name: "users",
    initialState,
    reducers: {
        logInUser(state, action) {
            // set userid after after login success
            const { name, id, cart, wishlist } = action.payload;
            setCookie(true, name, id, cart, wishlist);
            return {
                ...state,
                userLoggedIn: true,
                userName: action.payload.name
            }
        },
        logOutUser(state, action) {
            setCookie(false, "", "", "", "");
            return {
                ...state,
                userLoggedIn: false
            }
        },
        signUpUser(state, action) {
            // set userid after signup success
            const { name, id, cart, wishlist } = action.payload;
            setCookie(true, name, id, cart, wishlist);
            return {
                ...state,
                userLoggedIn: true,
                userName: action.payload.name
            }
        },
        addToCart(state, action) {
            const newProduct = {
                product: action.payload.product,
                selectedSize: action.payload.size,
                quantity: action.payload.quantity
            }
            const newCart = [...state.cart, newProduct];
            document.cookie = "cart=" + newCart;
            return {
                ...state,
                cart: newCart
            }
        },
        removeFromCart(state, action) {
            const newCart = state.cart.filter((item) => item.product.id !== action.payload.productId)
            return {
                ...state,
                cart: newCart
            }
        },
        addToWishlist(state, action) {
            const newWishlist = [...state.wishlist, action.payload.product];
            return {
                ...state,
                wishlist: newWishlist
            }
        },
        removeFromWishlist(state, action) {
            const newWishlist = state.wishlist.filter((item) => item.product.id === action.payload.productId)
            return {
                ...state,
                cart: newWishlist
            }
        },
        setDeliveryCharge(state, action) {
            return {
                ...state,
                currAddressCharge: action.payload.charge
            }
        },
        placeOrder(state, action) {
            return {
                ...state,
                placedOrder: [...state.placedOrder, action.payload.orderedItem]
            }
        },
        emptyCart(state, action) {
            return {
                ...state,
                cart: [],
                currAddressCharge: 0
            }
        }
    }
})

export default userReducer.reducer;

export const {
    logInUser,
    logOutUser,
    signUpUser,
    addToCart,
    removeFromCart,
    addToWishlist,
    removeFromWishlist,
    setDeliveryCharge,
    placeOrder,
    emptyCart
} = userReducer.actions