import { createSlice } from '@reduxjs/toolkit'

import { setCookie, getAllCookies } from '../functions'
import { getUserCart, getUserAddress, getUserWishlist, getUserOrders } from '../api'

import {
    signupAsync,
    loginAsync,
    removeCartAsync,
    removeWishlistAsync,
    addCartAsync,
    addWishlistAsync,
    placeOrderAsync
} from './userAsyncThunks';

const userData = getAllCookies();
const cart = getUserCart;
const placedOrders = getUserOrders;
const wishlist = getUserWishlist;
const addresses = getUserAddress;

const initialState = {
    userLoggedIn: userData.userLoggedIn,
    userId: userData.userId,
    userName: userData.userName,
    contact: userData.contact,
    addresses: [...addresses],
    placedOrder: placedOrders,
    cart: cart,
    currAddressCharge: 0,
    wishlist: wishlist,
    isError: false,
    message: "",
    isLoading: false
}

const userReducer = createSlice({
    name: "users",
    initialState,
    reducers: {
        logOutUser(state, action) {
            setCookie(false, "", "", "", "");
            return {
                ...state,
                userLoggedIn: false
            }
        }
    },
    extraReducers: (builder) => {
        builder
            
            .addCase(signupAsync.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.message = action.payload.message;
                const user = action.payload.user;
                state.userLoggedIn = true;
                state.userName = user.name;
                setCookie(true, user.name, user._id, user.cart, user.wishlist, user.userName);
            })

            .addCase(loginAsync.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.message = action.payload.message;
                const user = action.payload.user;
                state.userLoggedIn = true;
                state.userName = user.name;
                setCookie(true, user.name, user._id, user.cart, user.wishlist, user.userName);
            })

            .addCase(removeCartAsync.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.message = "";
                state.cart = action.payload.cart;
            })

            .addCase(removeWishlistAsync.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.message = "";
                state.wishlist = action.payload.wishlist;
            })
            
            .addCase(addCartAsync.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.message = "";
                state.cart = action.payload.cart;
            })

            .addCase(addWishlistAsync.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.message = "";
                state.wishlist = action.payload.wishlist;
            })

            .addCase(placeOrderAsync.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.message = "";
                state.cart = [];
            })

            //handling pending requests
            .addCase(
                signupAsync.pending,
                (state) => {
                    state.isLoading = false;
                    state.isError = true;
                    state.message = "processing..."
                }
        )
            
            .addCase(
                loginAsync.pending,
                (state) => {
                    state.isLoading = false;
                    state.isError = true;
                    state.message = "processing..."
                }
        )
        .addCase(
            removeCartAsync.pending,
            (state) => {
                state.isLoading = false;
                state.isError = true;
                state.message = "processing..."
            }
        )
        .addCase(
            removeWishlistAsync.pending,
            (state) => {
                state.isLoading = false;
                state.isError = true;
                state.message = "processing..."
            }
        )
        .addCase(
            addCartAsync.pending,
            (state) => {
                state.isLoading = false;
                state.isError = true;
                state.message = "processing..."
            }
        )
        .addCase(
            addWishlistAsync.pending,
            (state) => {
                state.isLoading = false;
                state.isError = true;
                state.message = "processing..."
            }
        )
        .addCase(
            placeOrderAsync.pending,
            (state) => {
                state.isLoading = false;
                state.isError = true;
                state.message = "processing..."
            }
        )

            //handling rejected requests
            .addCase(
                signupAsync.rejected,
                (state, action) => {
                    state.isLoading = false;
                    state.isError = true;
                    state.message = action.payload.message
                }
        )
            
            .addCase(
                loginAsync.rejected,
                (state, action) => {
                    state.isLoading = false;
                    state.isError = true;
                    state.message = action.payload.message
                }
        )
        .addCase(
            removeCartAsync.rejected,
            (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload.message
            }
        )
        .addCase(
            removeWishlistAsync.rejected,
            (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload.message
            }
        )
        .addCase(
            addCartAsync.rejected,
            (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload.message
            }
        )
        .addCase(
            addWishlistAsync.rejected,
            (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload.message
            }
        )
        .addCase(
            placeOrderAsync.rejected,
            (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload.message
            }
        )
    },
})

export default userReducer.reducer;

export const {
    logOutUser,
} = userReducer.actions