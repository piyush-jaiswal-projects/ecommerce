import React from 'react'
import $ from 'jquery'

import { useDispatch, useSelector } from 'react-redux'
import { logOutUser } from '../../reducers/userReducer'
import AddressCard from './address';

export default function UserPanel() {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user)
    console.log(user);
    return (
        <>
            <AddressCard />
            <div className='bg-base mb-5 border overflow-x-scroll flex flex-wrap items-center border-secondary my-2 p-2 w-[80%] lg:w-[100%] h-[auto] rounded-lg'>
                <p className='text-[0.7rem] text-center w-[100%]'>USER DETAILS</p>
                <hr className='text-secondary w-[90%] mx-auto' />
                <h1 className='w-[100%] text-[0.8rem] my-1'>Name: <label className='font-bold text-[1.2rem] text-secondary'>{user.userName}</label></h1>
                <p className='w-[100%] text-[0.8rem] my-1'>UserID: <label className='font-bold text-secondary'>{user.userId}</label></p>
                <p className='w-[100%] text-[0.8rem] my-1'>Contact: <label className='font-bold text-secondary'>{user.contact}</label></p>
            </div>

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