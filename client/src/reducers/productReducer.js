import { createSlice } from "@reduxjs/toolkit";
import GetProducts from "../api/getProducts";

const product = GetProducts;

const initialState = {
    products: product,
    currentCategory: "General",
    currentProducts: product,
    categoryItemsCount: product.length,
    error: null
}

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
})

export const {changeCategory, fetchProducts} = productReducer.actions;

export default productReducer.reducer;

//selector functions
export function GetProductFromId(id) {
    return product.find((product)=> product._id === id)
}