import React from 'react'

export default function ErrorPage() {
    return (
        <div className='text-center mt-[8vw] md:mt-[8vw] p-4 bg-white mb-[150px]'>
            <label className='text-center text-secondary text-[3rem]'>Some Error Occurred</label>
            <h1>Note: If any amount debited, will be refunded back to source account in 4-5 business days</h1>
            <br />
            <button className='underline' onClick={() => { window.location.replace("/") }}>Go to home</button>
            <br />
            <button className='underline' onClick={()=>{window.location.replace("/userportal")}}>Go to UserPortal</button>
        </div>
    )
}