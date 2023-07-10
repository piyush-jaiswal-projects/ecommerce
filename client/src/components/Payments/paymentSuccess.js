import React, {useState} from 'react'
import { useSearchParams } from 'react-router-dom'
import ErrorBoundary from '../../error-boundary/handler';

export default function PaymentSuccess(props) {
    const refNum = useSearchParams()[0];
    const [counter, setCounter] = useState(10)

    const timer = setInterval(() => {
        setCounter(() => counter - 1);
    }, 1000);

    setTimeout(() => {
        clearInterval(timer);
        window.location.replace('/userportal')
    }, 9000)


    return (
        <ErrorBoundary>
            <div className='text-center h-[400px] mt-[8vw] md:mt-[8vw] p-4 bg-white mb-[150px]'>
                <label className='text-left'>{props.status === "success" ? "Congratulations!" : "Some Error Occurred"}</label>
                <h1 className='text-[3rem] text-secondary'>{props.status === "success" ? "Order Placed Successfully" : "Order Not Placed"}</h1>
                <p>Reference Number: {refNum}</p>
                {props.status === "success" ? "" : <h1>Note: Any amount debited, will be refunded back in 4-5 business days</h1>}
                <br />
                <button className='underline' onClick={() => { window.location.replace("/") }}>Go to home</button>
                <br />
                <button className='underline' onClick={() => { window.location.replace("/userportal") }}>Go to UserPortal</button>
                <br />
                <p>Redirecting to user portal in {counter}s</p>
            </div>
        </ErrorBoundary>
    )
}