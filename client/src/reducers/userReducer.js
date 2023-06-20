import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    userLoggedIn: false,
    userId: "",
    userName: "",
    cart: [],
    wishlist: [],
    error: null
}

const userReducer = createSlice({
    name: "users",
    initialState,
    reducers: {
        logInUser(state, action) {
            return {
                ...state,
                userLoggedIn: true,
                userName: action.payload.name
            }
        },
        logOutUser(state, action) {
            return {
                ...state,
                userLoggedIn: false
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