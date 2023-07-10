import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';
import { useSelector } from 'react-redux'

import { setCookie, getAllCookies } from '../functions'
import {getUserCart, getUserAddress, getUserWishlist, getUserOrders} from '../api'
    

const userData = getAllCookies();
const cart = getUserCart;
const placedOrders = getUserOrders;
const wishlist = getUserWishlist;
const addresses = getUserAddress;

const initialState = {
    userLoggedIn: userData.userLoggedIn,
    userId: userData.userId,
    userName: userData.userName,
    addresses: [...addresses],
    placedOrder: placedOrders,
    cart: cart,
    currAddressCharge: 0,
    wishlist: wishlist,
    isError: false,
    message: "",
    isLoading: false
}

export const signupAsync = createAsyncThunk('users/signup', async (payload, {rejectWithValue}) => {
    const uri = process.env.REACT_APP_SERVER_URL + "/api/auth/signup"
    const data = {
        name: payload.userData.name,
        username: payload.userData.username,
        password: payload.userData.password
    }
    try {
    const response = await axios.post(uri, data);
    return response.data;
    }
    catch (error) {
        console.log(error);
        return rejectWithValue(error.response.data);
    }
}
)

export const loginAsync = createAsyncThunk('users/login', async (payload, { rejectWithValue }) => {
    const uri = process.env.REACT_APP_SERVER_URL + "/api/auth/login"
    const data = {
        username: payload.userData.username,
        password: payload.userData.password
    }
    try {
        const response = await axios.post(uri, data);
        return response.data;
    }
    catch (error) {
        console.log(error);
        return rejectWithValue(error.response.data);
    }
})

export const removeCartAsync = createAsyncThunk('/users/removeFromCart', async(payload, { rejectWithValue }) => {
    const uri = process.env.REACT_APP_SERVER_URL + "/api/user/removeFromCart"
    const data = {
        userId: payload.userId,
        productId: payload.productId
    }
    try {
        const response = await axios.post(uri, data);
        return response.data;
    }
    catch (error) {
        console.log(error);
        return rejectWithValue(error.response.data);
    }
})

export const removeWishlistAsync = createAsyncThunk('/users/removeFromWishlist', async(payload, { rejectWithValue }) => {
    const uri = process.env.REACT_APP_SERVER_URL + "/api/user/removeFromWishlist"
    const data = {
        userId: payload.userId,
        productId: payload.productId
    }
    console.log('inside async');
    try {
        const response = await axios.post(uri, data);
        return response.data;
    }
    catch (error) {
        console.log(error);
        return rejectWithValue(error.response.data);
    }
})

export const addCartAsync = createAsyncThunk('/users/addToCart', async (payload, { rejectWithValue }) => {
    const uri = process.env.REACT_APP_SERVER_URL + "/api/user/addToCart"
    const data = {
        userId: payload.userId,
        product: payload.product
    }
    try {
        const response = await axios.post(uri, data);
        return response.data;
    }
    catch (error) {
        console.log(error);
        return rejectWithValue(error.response.data);
    }
})

export const addWishlistAsync = createAsyncThunk('/users/addToWishlist', async (payload, { rejectWithValue }) => {
    const uri = process.env.REACT_APP_SERVER_URL + "/api/user/addToWishlist"
    const data = {
        userId: payload.userId,
        product: payload.product
    }
    try {
        const response = await axios.post(uri, data);
        return response.data;
    }
    catch (error) {
        console.log(error);
        return rejectWithValue(error.response.data);
    }
})

export const placeOrderAsync = createAsyncThunk('/users/placeOrder', async (payload, { rejectWithValue }) => {
    const uri = process.env.REACT_APP_SERVER_URL + "/api/user/placeOrders"
    const uid = useSelector((state) => state.user.userId);
    const cart = useSelector((state) => state.user.cart);
    const data = {
        userId: uid,
        cart: cart,
        refNum: payload.refNum
    }
    try {
        const response = await axios.post(uri, data);
        return response.data;
    }
    catch (error) {
        console.log(error);
        window.location.replace("http://localhost:3000/error");
        return rejectWithValue(error.response.data);
    }
})


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
        },
        updateCart(state, action) {
            return {
                ...state,
                cart: action.payload.newCart
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
    },
    extraReducers: (builder) => {
        builder
            .addCase(signupAsync.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
                state.message = "processing..."

            })
            .addCase(signupAsync.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.message = action.payload.message;
                const user = action.payload.user;
                state.userLoggedIn = true;
                state.userName = user.name;
                setCookie(true, user.name, user._id, user.cart, user.wishlist);
            })
            .addCase(signupAsync.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload.message;

            })
            .addCase(loginAsync.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
                state.message = "processing..."
    
            })
            .addCase(loginAsync.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.message = action.payload.message;
                const user = action.payload.user;
                state.userLoggedIn = true;
                state.userName = user.name;
                setCookie(true, user.name, user._id, user.cart, user.wishlist);
            })
            .addCase(loginAsync.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload.message;
    
            })
            .addCase(removeCartAsync.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
                state.message = "processing..."
        
            })
            .addCase(removeCartAsync.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.message = "";
                state.cart = action.payload.cart;
            })
            .addCase(removeCartAsync.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload.message;
        
            })
            .addCase(removeWishlistAsync.pending, (state) => {
                console.log('inside pending async');
                state.isLoading = true;
                state.isError = false;
                state.message = "processing..."
            
            })
            .addCase(removeWishlistAsync.fulfilled, (state, action) => {
                console.log('inside fulfilled async');
                state.isLoading = false;
                state.isError = false;
                state.message = "";
                state.wishlist = action.payload.wishlist;
            })
            .addCase(removeWishlistAsync.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload.message;
            
            })
            .addCase(addCartAsync.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
                state.message = "processing..."
            
            })
            .addCase(addCartAsync.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.message = "";
                state.cart = action.payload.cart;
            })
            .addCase(addCartAsync.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload.message;
            
            })
            .addCase(addWishlistAsync.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
                state.message = "processing..."
                
            })
            .addCase(addWishlistAsync.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.message = "";
                state.wishlist = action.payload.wishlist;
            })
            .addCase(addWishlistAsync.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload.message;
                
            })
            .addCase(placeOrderAsync.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
                state.message = "processing..."
                    
            })
            .addCase(placeOrderAsync.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.message = "";
                state.cart = [];
            })
            .addCase(placeOrderAsync.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload.message;
                    
            });
      },
})

export default userReducer.reducer;


export const {
    logOutUser,
    updateCart,
    setDeliveryCharge,
    placeOrder,
    emptyCart,
} = userReducer.actions