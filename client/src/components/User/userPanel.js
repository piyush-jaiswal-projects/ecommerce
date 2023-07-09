import React from 'react'
import $ from 'jquery'

import { useDispatch } from 'react-redux'
import { logOutUser } from '../../reducers/userReducer'
import AddressCard from './address';

export default function UserPanel() {
    const dispatch = useDispatch();
    return (
        <>
            <AddressCard />
            <div className='bg-secondary my-2 w-[80%] lg:w-[100%] rounded-xl lg:rounded-e-none p-4'>
                <button onClick={() => {
                    dispatch(logOutUser());
                    window.location.replace("/");
                }} className='mx-4 font-bold hover:text-primary'>Log Out</button>
            </div>

            <div className='bg-secondary my-2 w-[80%] lg:w-[100%] rounded-xl lg:rounded-e-none p-4'>
                <button
                    onClick={() => { $("#newAddress").toggleClass("hidden"); }}
                    className='mx-4 font-bold hover:text-primary'>
                    Add New Address
                </button>
            </div>

            <div className='bg-secondary my-2 w-[80%] lg:w-[100%] rounded-xl lg:rounded-e-none p-4'>
                <button onClick={() => {
                    window.location.replace("/cart");
                }} className='mx-4 font-bold hover:text-primary'>Cart</button>
            </div>

            <div className='bg-secondary my-2 w-[80%] lg:w-[100%] rounded-xl lg:rounded-e-none p-4'>
                <button onClick={() => {
                    window.location.replace("/wishlist");
                }} className='mx-4 font-bold hover:text-primary'>Wishlist</button>
            </div>
        </>
    )
}