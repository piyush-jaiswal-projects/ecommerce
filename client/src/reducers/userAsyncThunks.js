import axios from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { useSelector } from 'react-redux'

export const signupAsync = createAsyncThunk('users/signup',
    async (payload, { rejectWithValue }) => {
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

export const loginAsync = createAsyncThunk('users/login',
    async (payload, { rejectWithValue }) => {
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

export const removeCartAsync = createAsyncThunk('/users/removeFromCart',
    async (payload, { rejectWithValue }) => {
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

export const removeWishlistAsync = createAsyncThunk('/users/removeFromWishlist',
    async (payload, { rejectWithValue }) => {
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

export const addCartAsync = createAsyncThunk('/users/addToCart',
    async (payload, { rejectWithValue }) => {
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

export const addWishlistAsync = createAsyncThunk('/users/addToWishlist',
    async (payload, { rejectWithValue }) => {
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

export const placeOrderAsync = createAsyncThunk('/users/placeOrder',
    async (payload, { rejectWithValue }) => {
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
        window.location.replace("/error");
        return rejectWithValue(error.response.data);
    }
})

