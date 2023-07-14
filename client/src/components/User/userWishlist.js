import React from 'react'
import WishCard from './wishcard';
import ErrorBoundary from '../../error-boundary/handler';
import { getCookie } from '../../functions';
import PanelButton from './panelButton';
import { useSelector } from 'react-redux';

export default function UserWishlist() {
    if (getCookie("userLoggedIn") === "false" || getCookie("userLoggedIn") === "")
        window.location.replace("/")

    const wishlist = useSelector((state) => state.user.wishlist);
    const msg = useSelector((state) => state.user.message);

    return (
        <ErrorBoundary>
            <div className='mt-[8vw] md:mt-[1vw] p-4 bg-white overflow-x-hidden'>
                <br />

                <div className='flex justify-center flex-wrap'>
                    <div className='w-[100%] lg:w-[60%] bg-base px-5 py-5 min-h-[500px] rounded-lg'>
                        <h1
                            className='text-secondary text-[1.5rem] lg:text-[2rem] text-center lg:text-left font-bold'>
                            Your wishlist ({wishlist.length})
                        </h1>
                        {msg}

                        {wishlist.map((item, index) => {
                            return (
                                <WishCard item={item} />
                            )
                        })}

                    </div>

                    <div className='w-[100%] lg:w-[30%] my-10 lg:my-0 lg:mx-5 p-5 h-[50vh] lg:h-[40vh] rounded-lg'>

                        <PanelButton
                            text="Continue Shopping"
                            function={() => { window.location.replace("/products") }} />

                        <PanelButton
                            text="Cart"
                            function={() => { window.location.replace("/cart") }} />

                        <PanelButton
                            text="Dashboard"
                            function={() => { window.location.replace("/userportal") }} />

                    </div>
                </div>

            </div>
        </ErrorBoundary>
    )
}


