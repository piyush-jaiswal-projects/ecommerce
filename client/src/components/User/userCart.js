import React from 'react'
import { useSelector } from 'react-redux'

export default function UserCart() {
    const state = useSelector((state) => state.user)
    console.log(state);
    return (
        <div>
            USER CART
        </div>
    )
}