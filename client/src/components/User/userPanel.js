import React from 'react'
import $ from 'jquery'

import { useDispatch, useSelector } from 'react-redux'
import { logOutUser } from '../../reducers/userReducer'
import AddressCard from './address';
import PanelButton from './panelButton';

export default function UserPanel() {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user)

    return (
        <>
            <AddressCard />
            <div className='bg-base mb-5 border overflow-x-scroll flex flex-wrap items-center border-secondary my-2 p-2 w-[80%] lg:w-[100%] h-[auto] rounded-lg'>
                <p className='text-[0.7rem] text-center w-[100%]'>
                    USER DETAILS
                </p>

                <hr className='text-secondary w-[90%] mx-auto' />
                <h1
                    className='w-[100%] text-left text-[0.8rem] my-1'>
                    Name:
                    <label className='font-bold text-[1.2rem] text-secondary'>
                        {user.userName}
                    </label>
                </h1>

                <p className='w-[100%] text-left text-[0.8rem] my-1'>
                    UserID:
                    <label className='font-bold text-secondary'>
                        {user.userId}
                    </label>
                </p>

                <p className='w-[100%] text-left text-[0.8rem] my-1'>
                    Contact:
                    <label className='font-bold text-secondary'>
                        {user.contact}
                    </label>
                </p>
            </div>

            <PanelButton
                text="Log Out"
                function={() => {
                    dispatch(logOutUser());
                    window.location.replace("/");
                }} />

            <PanelButton
                text="Add New Address"
                function={() => { $("#newAddress").toggleClass("hidden") }} />

            <PanelButton
                text="Continue Shopping"
                function={() => { window.location.replace("/products") }} />

            <PanelButton
                text="Cart"
                function={() => { window.location.replace("/cart") }} />

            <PanelButton
                text="Wishlist"
                function={() => { window.location.replace("/wishlist") }} />
        </>
    )
}

