import React from 'react'
import { useSearchParams } from 'react-router-dom'

export default function PaymentSuccess(props) {
    const refNum = useSearchParams()[0];
    
    return (
        <div className='text-center mt-[8vw] md:mt-[8vw] p-4 bg-white mb-[150px]'>
            <label className='text-left'>{props.status === "success" ? "Congratulations" : "Some Error Occurred" }</label>
            <h1 className='text-[3rem] text-secondary'>{props.status === "success" ? "Order Placed Successfully" : "Order Not Placed" }</h1>
            <p>Reference Number: {refNum}</p>
            {props.status === "success" ? "" : <h1>Note: Any amount debited, will be refunded back in 4-5 business days</h1> }
            <br />
            <button className='underline' onClick={() => { window.location.replace("/") }}>Go to home</button>
            <br />
            <button className='underline' onClick={()=>{window.location.replace("/userportal")}}>Go to UserPortal</button>
        </div>
    )
}