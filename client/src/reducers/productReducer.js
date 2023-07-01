import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'


const initialState = {
    products: [],
    currentCategory: "General",
    currentProducts: [],
    categoryItemsCount: 0,
    error: null,
    isError: false,
    isLoading: false,
    message: "",
    productDetails: {
        images: [],
        size: [],
        desc: "",
        productId: '',
        category: '',
        price: 0,
        stock: 0,
        noOfPurchases: 0,
        reviews: []
    }
}

export const getProductsAsync = createAsyncThunk('/users/getProducts', async (payload, { rejectWithValue }) => {
    const uri = process.env.REACT_APP_SERVER_URL + "/api/product/getProducts"
    try {
        const response = await axios.get(uri);
        return {
            arr: response.data
        };
    }
    catch (error) {
        console.log(error);
        return rejectWithValue(error.response.data);
    }
})

const productReducer = createSlice({
    name: "product",
    initialState,
    reducers: {
        changeCategory(state, action) {
            const productList = state.products.filter(
                (item) => item.category === action.payload.categoryName);
            const newCount = productList.length;
        return {
            ...state,
            currentProducts: productList,
            currentCategory: action.payload.categoryName,
            categoryItemsCount: newCount
        }
        },
        fetchProducts(state, action) {
            const productList = action.payload.products;
            return {
                ...state,
                products: productList,
                currentCategory: productList,
                categoryItemsCount: productList.length
            }
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(getProductsAsync.pending, (state) => {
            state.isLoading = true;
            state.isError = false;
            state.message = "processing..."

        })
        .addCase(getProductsAsync.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            const productArr = action.payload.arr.products;
            const productList = productArr.filter((item) => item.category === state.currentCategory);
            const newCount = productList.length;
            state.products = productArr;
            state.currentProducts = productList;
            // state.currentCategory = action.payload.category;
            state.categoryItemsCount = newCount;
            state.message = ""
        })
        .addCase(getProductsAsync.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            console.log(action.payload);
            state.message = "Some error occurred";

        })
    }
})

export const {changeCategory, fetchProducts} = productReducer.actions;

export default productReducer.reducer;