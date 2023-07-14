import React from 'react'

import getCookie from '../../functions/getCookie'
import PrevOrders from './prevOrders'
import ErrorBoundary from '../../error-boundary/handler'

export default function UserPortal() {
    if (getCookie("userLoggedIn") === "false" || getCookie("userLoggedIn") === "")
        window.location.replace("/")


    return (
        <ErrorBoundary>
            <div className='mt-[12vw] md:mt-[8vw]'>
                <PrevOrders />
            </div>
        </ErrorBoundary>
    )
}