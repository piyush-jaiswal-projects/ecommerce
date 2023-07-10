import React from 'react'
import { Logo1, NetErr } from '../../constants/images'

export default function NetworkError() {
    return (
        <div className='w-[100vw] pt-[10vw]  h-[90vh]'>
            <img className='w-[100px] mx-auto mb-2' src={Logo1} alt="" />
            <h1 className='text-[1.2rem] text-center text-secondary'> Network Error</h1>
            <h1 className='text-[3rem] font-bold text-center text-secondary leading-tight'>NO INTERNET</h1>
            <img className='w-[300px] mx-auto my-10' src={NetErr} alt="" />
        </div>
    )
}