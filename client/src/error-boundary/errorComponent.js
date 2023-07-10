import React from 'react'

export default function ErrorComponent() {
    return (
        <div className='w-[100vw] pt-[10vw]  h-[90vh]'>
            <h1 className='text-[1.2rem] text-center text-secondary'> Some Error Occurred :(</h1>
            <h1 className='text-[3rem] font-bold text-center text-secondary leading-tight'>Sorry For Your Inconvenience</h1>
            <p className='text-center text-[grey]'>Report this error at <a href="mailto:developerpiyush1610@gmail.com" className='underline'>developerpiyush1610@gmail.com</a></p>
            <img className='w-[200px] mx-auto my-10' src="http://res.cloudinary.com/deo80u7qs/image/upload/v1688987985/tgomqgyyteomkltb9mib.png" alt="" />
        </div>
    )
}
