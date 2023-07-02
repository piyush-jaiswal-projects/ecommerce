import React from 'react'
import UserCart from './userCart'
import UserWishlist from './userWishlist'

import { useDispatch } from 'react-redux'
import { logOutUser } from '../../reducers/userReducer'
import getCookie from '../../functions/getCookie'

export default function UserPortal() {
    if (getCookie("userLoggedIn") === "false") window.location.replace("/")

    const dispatch = useDispatch();

    return (
        <div className='mt-[12vw] md:mt-[8vw]'>
            <div className='bg-secondary p-4'>
                <button onClick={() => {
                    dispatch(logOutUser());
                    window.location.replace("/");
                }} className='mx-4 font-bold hover:text-primary'>Log Out</button>
            </div>
            
            <UserCart embed={true} />
            <UserWishlist />
        </div>
    )
}