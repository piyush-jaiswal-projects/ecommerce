import React from 'react'

import getCookie from '../../functions/getCookie'
import PrevOrders from './prevOrders'

export default function UserPortal() {
    if (getCookie("userLoggedIn") === "false") window.location.replace("/")


    return (
        <div className='mt-[12vw] md:mt-[8vw]'>
            <PrevOrders />
        </div>
    )
}