import React from 'react'
import { useSearchParams } from 'react-router-dom'
import { placeOrderAsync } from '../../reducers/userReducer';
import { useDispatch } from 'react-redux';

export default function PaymentSuccess(props) {
    const dispatch = useDispatch();
    const refNum = useSearchParams()[0];

    if (props.status === "success") {
        dispatch(placeOrderAsync({}));  
    }
    
    return (
        <div className='text-center mt-[8vw] md:mt-[8vw] p-4 bg-white'>
            <label className='text-left'>{props.status === "success" ? "Congratulations" : "Some Error Occurred" }</label>
            <h1 className='text-[3rem] text-secondary'>{props.status === "success" ? "Order Placed Successfully" : "Order Not Placed" }</h1>
            <p>Reference Number: {refNum}</p>
            <br />
            <button className='underline' onClick={()=>{window.location.replace("/")}}>Go back to home</button>
        </div>
    )
}