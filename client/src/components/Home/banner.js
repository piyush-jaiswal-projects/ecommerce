import React, { Fragment } from 'react'

export default function Banner() {
    return (
        <Fragment>
            <div className='w-[100vw] my-[50px] bg-base'>
                <h1
                    className="text-[1.5rem] md:text-[3rem] text-secondary  font-extrabold font-['Dancing_Script'] text-center">
                    FRESH ARRIVALS EVERY WEEKEND
                </h1>
            </div>

            <img
                className=' -z-50'
                src="http://res.cloudinary.com/deo80u7qs/image/upload/v1688166300/opn1jmrbcq6uxfgz00en.jpg"
                alt="" 
            />
            
            <div className='grid grid-cols-2'>
                <img
                    className='-z-50'
                    src="http://res.cloudinary.com/deo80u7qs/image/upload/v1688167731/zgomxsqwus0eggfjmxkd.jpg"
                    alt="" 
                />

                <img
                    className='-z-50'
                    src="http://res.cloudinary.com/deo80u7qs/image/upload/v1688167583/g4nfheeabve40jyyewf2.jpg"
                    alt=""
                />
            </div>

            <img
                className='-z-50'
                src="http://res.cloudinary.com/deo80u7qs/image/upload/v1688167680/ntsffsh0yj9airzokvhp.jpg"
                alt="" 
            />
        </Fragment>
    )
}