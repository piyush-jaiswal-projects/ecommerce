import React, { Fragment } from 'react'
import { c1, c2, c3, c4, c5, c6, c7 } from '../../constants/images'

export default function Banner() {
    return (
        <Fragment>
            <div className='w-[100vw] my-[50px] bg-base'>
            <h1 className="text-[1.5rem] md:text-[3rem] text-secondary  font-extrabold font-['Dancing_Script'] text-center">FRESH ARRIVALS EVERY WEEKEND</h1>
        </div>
            <img className=' -z-50' src={c3} alt="" />
            <div className='grid grid-cols-2'>
                <img className=' -z-50' src={c6} alt="" />
                <img className=' -z-50' src={c5} alt="" />
            </div>
            <img className=' -z-50' src={c1} alt="" />
        </Fragment>
    )
}