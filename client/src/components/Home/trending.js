import React from 'react'
import { trendingImages as images } from '../../constants/data';


export default function Trending() {
    return (
        <div className='my-10 w-[90%] mx-auto'>

            <div
                className='w-[100%] my-4 gap-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5'>

                {images.map((item) => {
                    return (
                        <Card name="name1" item={item} />
                    )
                })}

            </div>
        </div>
    )
}

function Card(props) {
    const id = props.item.name + "-card";
    const nameId = props.item.name;

    return (
        <a href={props.item.url}>
            <div id={id} className='cursor-pointer overflow-hidden w-[100%] h-[300px] rounded-sm'>
                <div id={nameId} className='hidden absolute z-50'>
                    <h1 className='text-[white]'>{props.item.name}</h1>
                </div>
                <img
                    className='skeleton object-cover blur-1 h-[100%] w-[100%]'
                    src={props.item.img}
                    loading="lazy"
                    alt="" 
                />
            </div>
        </a>
    )
}