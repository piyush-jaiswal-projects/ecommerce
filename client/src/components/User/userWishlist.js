import React from 'react'
import { useSelector } from 'react-redux'
import WishCard from './wishcard';
import ErrorBoundary from '../../error-boundary/handler';
import { getCookie } from '../../functions';

export default function UserWishlist() {
    if (getCookie("userLoggedIn") === "false" || getCookie("userLoggedIn") === "" ) window.location.replace("/")

    const wishlist = useSelector((state) => state.user.wishlist)
    const msg = useSelector((state) => state.user.message);

    function calculatePrice() {
        var price = 0;
        for (let index = 0; index < wishlist.length; index++) {
            price = price + (wishlist[index].product.price * wishlist[index].quantity);
        }
        return price;
    }

    return (
        <ErrorBoundary>
            <div className='mt-[8vw] md:mt-[1vw] p-4 bg-white overflow-x-hidden'>
                <br />

                <div className='flex justify-center flex-wrap'>
                <div className='w-[100%] lg:w-[60%] bg-base px-5 py-5 min-h-[500px] rounded-lg'>
                    <h1
                        className='text-secondary text-[1.5rem] lg:text-[2rem] text-center lg:text-left font-bold'>
                        Your wishlist ({wishlist.length}) - Total Value : Rs. {calculatePrice()}
                    </h1>
                    {msg}

                    {wishlist.map((item, index) => {
                        return (
                            <WishCard item={item} />
                        )
                    })}

                </div>

                <div className='w-[100%] lg:w-[30%] my-10 lg:my-0 lg:mx-5 p-5 h-[50vh] lg:h-[40vh] rounded-lg'>
                <div className='bg-secondary my-2 w-[80%] lg:w-[100%] rounded-xl lg:rounded-e-none p-4'>
                <button onClick={() => {
                    window.location.replace("/cart");
                }} className='mx-4 font-bold hover:text-primary'>Cart</button>
                    </div>
                    <div className='bg-secondary my-2 w-[80%] lg:w-[100%] rounded-xl lg:rounded-e-none p-4'>
                <button onClick={() => {
                    window.location.replace("/userportal");
                }} className='mx-4 font-bold hover:text-primary'>Dashboard</button>
                        </div>
                        <div className='bg-secondary my-2 w-[80%] lg:w-[100%] rounded-xl lg:rounded-e-none p-4'>
                <button onClick={() => {
                    window.location.replace("/products");
                }} className='mx-4 font-bold hover:text-primary'>Continue Shopping</button>
            </div>
                    
                </div>
                </div>

            </div>
        </ErrorBoundary>
    )
}


