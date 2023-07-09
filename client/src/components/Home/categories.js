import React from 'react'

export default function Categories() {
    return (
        <div className='my-10 w-[100%] flex justify-center flex-wrap'>
            <h1 className='text-center w-[100%] text-secondary text-[1.2rem] sm:text-[1.5rem] font-semibold'>
                CATEGORIES
            </h1>

            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5'>
                <Card name="Men" url="/products/Men" />
                <Card name="Women" url="/products/Women" />
                <Card name="Kids" url="/products/Kids" />
                <Card name="Sports" url="/products/Sports" />
                <Card name="Casual" url="/products/Casual"  />
            </div>
        </div>
    )
}

function Card(props) {
    return (
        <a className='' href={props.url}>
            <div className='soft-bg h-[50px] text-secondary hover:text-base hover:bg-secondary w-[200px] flex justify-center items-center m-2 mx-5 border border-secondary rounded-md'>
                <h1 className='text-[1.3rem] font-semibold uppercase'>{props.name}</h1>
        </div>
        </a>
    )
}