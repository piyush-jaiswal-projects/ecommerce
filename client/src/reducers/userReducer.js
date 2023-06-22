import { createSlice } from '@reduxjs/toolkit'
import setCookie from '../functions/setCookie'
import getAllCookies from '../functions/getAllCookies'

const userData = getAllCookies();

const initialState = {
    userLoggedIn: userData.userLoggedIn,
    userId: userData.userId,
    userName: userData.userName,
    cart: userData.cart,
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
            return {
                ...state,
                userLoggedIn: true,
                userName: action.payload.name
            }
        },
        addToCart(state, action) {
            const newCart = [...state.cart, action.payload.product];
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
        }
    }
})

export default userReducer.reducer;

export const {logInUser, logOutUser, addToCart, addToWishlist} = userReducer.actions