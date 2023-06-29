import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import setCookie from '../functions/setCookie'
import getAllCookies from '../functions/getAllCookies'
import getUserCart from '../api/getUserCart'
import getUserWishlist from '../api/getUserWishlist'
import axios from 'axios';

 var cart = getUserCart;
var wishlist = getUserWishlist;
    

const userData = getAllCookies();

const initialState = {
    userLoggedIn: userData.userLoggedIn,
    userId: userData.userId,
    userName: userData.userName,
    addresses: ["Select Your Delivery Address", "New Delhi, India", "Chandigarh, India"],
    placedOrder: [],
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
                state.message = action.payload.message || "Some error occurred";

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
                    state.message = action.payload.message || "Some error occurred";
    
              });
      },
})

export default userReducer.reducer;


export const {
    logInUser,
    logOutUser,
    addToCart,
    removeFromCart,
    addToWishlist,
    removeFromWishlist,
    setDeliveryCharge,
    placeOrder,
    emptyCart,
} = userReducer.actions