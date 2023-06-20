import { configureStore } from '@reduxjs/toolkit'
import userReducer from './reducers/userReducer'
import productReducer from './reducers/productReducer'

export default configureStore({
    reducer: {
        user: userReducer,
        product: productReducer
    },
})