import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'


const initialState = {
    products: [],
    currentCategory: "",
    currentSubCategory: "",
    currentBrand: "",
    currentRating: 0,
    currentMaxPrice: 0,
    currentMinPrice: 0,
    currentProducts: [],
    categoryItemsCount: 0,
    error: null,
    isError: false,
    isLoading: false,
    message: "",
    prodMsg: "",
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
            var productList, newCount;

            if (action.payload.type === "common" || action.payload.categoryName === "f1") {
                productList = state.products;
                newCount = productList.length;
            }
            else {
                productList = state.products.filter(
                    (item) => item.category === action.payload.categoryName
                );
            }

            if (state.currentSubCategory !== "") productList = productList.filter((item) => item.subCategory === state.currentSubCategory)
            if (state.currentBrand !== "") productList = productList.filter((item) => item.brand === state.currentBrand)
            if (state.currentMinPrice !== 0) productList = productList.filter((item) => item.price >= state.currentMinPrice)
            if (state.currentMaxPrice !== 0) productList = productList.filter((item) => item.price <= state.currentMaxPrice)
            newCount = productList.length;

            return {
                ...state,
                currentProducts: productList,
                currentCategory: (action.payload.type === "common") ? "" : (action.payload.categoryName === "f1") ? "" : action.payload.categoryName,
                categoryItemsCount: newCount,
                prodMsg: newCount === 0 ? "Item Not Found" : ""
            }
        },
        changeSubCategory(state, action) {
            var productList;

            if (action.payload.type === "common" || action.payload.subCategoryName === "f2") {
                productList = state.products;
            }
            else {
                productList = state.products.filter(
                    (item) => item.subCategory === action.payload.subCategoryName
                );
            }

            if (state.currentCategory !== "") productList = productList.filter((item) => item.category === state.currentCategory)
            if (state.currentBrand !== "") productList = productList.filter((item) => item.brand === state.currentBrand)
            if (state.currentMinPrice !== 0) productList = productList.filter((item) => item.price >= state.currentMinPrice)
            if (state.currentMaxPrice !== 0) productList = productList.filter((item) => item.price <= state.currentMaxPrice)
            
            return {
                ...state,
                currentProducts: productList,
                currentSubCategory: (action.payload.type === "common") ? "" : (action.payload.subCategoryName === "f2") ? "" : action.payload.subCategoryName,
                categoryItemsCount: productList.length,
                prodMsg: productList.length === 0 ? "Item Not Found" : ""
            }
        },
        changeBrand(state, action) {
            var productList;
           
            if (action.payload.type === "common" || action.payload.brand === "f3") {
                productList = state.products;
            }
            else {
                productList = state.products.filter(
                    (item) => item.brand === action.payload.brand
                );
            }

            if (state.currentSubCategory !== "") productList = productList.filter((item) => item.subCategory === state.currentSubCategory)
            if (state.currentCategory !== "") productList = productList.filter((item) => item.category === state.currentCategory)
            if (state.currentMinPrice !== 0) productList = productList.filter((item) => item.price >= state.currentMinPrice)
            if (state.currentMaxPrice !== 0) productList = productList.filter((item) => item.price <= state.currentMaxPrice)
            
            return {
                ...state,
                currentProducts: productList,
                currentBrand: (action.payload.type === "common") ? "" : (action.payload.brand === "f3") ? "" : action.payload.brand,
                categoryItemsCount: productList.length,
                prodMsg: productList.length === 0 ? "Item Not Found" : ""
            }
        },
        changePriceRange(state, action) {
            var productList;

            productList = state.products.filter(
                (item) => item.price >= action.payload.minPrice && item.price <= action.payload.maxPrice
            );

            if (state.currentSubCategory !== "") productList = productList.filter((item) => item.subCategory === state.currentSubCategory)
            if (state.currentBrand !== "") productList = productList.filter((item) => item.brand === state.currentBrand)
            if (state.currentCategory !== "") productList = productList.filter((item) => item.category === state.currentCategory)

            return {
                ...state,
                currentProducts: productList,
                currentMaxPrice: action.payload.maxPrice,
                currentMinPrice: action.payload.minPrice,
                categoryItemsCount: productList.length,
                prodMsg: productList.length === 0 ? "Item Not Found" : ""
            }
        },
        resetFilters(state, action) {
            return {
                ...state,
                currentProducts: state.products,
                categoryItemsCount: state.products.length,
                prodMsg: "",
                currentCategory: "",
                currentSubCategory: "",
                currentBrand: "",
                currentRating: 0,
                currentMaxPrice: 0,
                currentMinPrice: 0,
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
                const productList = action.payload.type === "common" ? productArr : productArr.filter((item) => item.category === state.currentCategory);
                const newCount = productList.length;
                state.products = productArr;
                state.currentProducts = productList;
                state.categoryItemsCount = newCount;
                state.message = ""
            })
            .addCase(getProductsAsync.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                console.log(action.payload);
                state.message = "";

            })
    }
})

export const {
    changeCategory,
    fetchProducts,
    changeSubCategory,
    changeBrand,
    changeRating,
    changePriceRange,
    resetFilters
} = productReducer.actions;

export default productReducer.reducer;