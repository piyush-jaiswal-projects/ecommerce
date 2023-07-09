import React from 'react'
import { useSelector } from "react-redux";

import Card from './orderedProductCard';
import UserPanel from './userPanel';

export default function PrevOrders() {
    const orders = useSelector((state) => state.user.placedOrder.items);
    const msg = useSelector((state) => state.user.message);

    return (
        <div className='my-10'>
            <div className='flex justify-center flex-wrap'>

                <div className='w-[100%] lg:w-[70%] h-[auto] lg:h-[auto] bg-base lg:mx-5 px-5 rounded-lg'>
                    <h1
                        className='text-secondary text-[1.5rem] lg:text-[2rem] text-center lg:text-left font-bold'>
                        Your Orders
                    </h1>
                    <label>{msg}</label>

                    {orders.map((item, index) => {
                        return (
                            <Card item={item} />
                        )
                    })}
                </div>

                <div className='w-[100%] h-[auto] flex justify-center flex-wrap lg:block lg:w-[20%] my-10 lg:my-0 text-center lg:text-left mx-auto lg:mx-5 py-2 rounded-lg'>
                    <UserPanel />
                </div>
            </div>
        </div>
    )
}