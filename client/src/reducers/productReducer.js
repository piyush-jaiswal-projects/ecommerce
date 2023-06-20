import { createSlice } from "@reduxjs/toolkit";
import { products } from "../data";

const initialState = {
    products: products,
    currentCategory: "General",
    currentProducts: products,
    categoryItemsCount: products.length,
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
    }},
})

export const {changeCategory} = productReducer.actions;

export default productReducer.reducer;