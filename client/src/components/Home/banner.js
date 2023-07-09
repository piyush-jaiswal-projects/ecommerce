import React from 'react'
import Trending from './trending';

export default function Banner() {
    return (
            <div className='w-[100vw] my-[50px] py-[20px] bg-base'>
                <h1
                    className="text-[1.5rem] md:text-[3rem] text-secondary  font-extrabold font-['Dancing_Script'] text-center">
                    FRESH ARRIVALS
                </h1>
            <Trending />
            </div>
    )
}