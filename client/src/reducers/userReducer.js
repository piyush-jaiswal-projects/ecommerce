import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    userLoggedIn: false,
    userId: "",
    userName: "",
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
        }
    }
})

export default userReducer.reducer;

export const {logInUser, logOutUser} = userReducer.actions