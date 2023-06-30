import React from 'react'
import $ from 'jquery'

import { c1, c2, c3, c4, c5, c6, c7 } from '../../constants/images'

export default function Trending() {
    return (
        <div className='my-10 w-[90%] mx-auto'>
            <h1 className='text-center text-secondary text-[1.2rem] sm:text-[1.5rem] font-semibold'>TRENDING CATEGORIES</h1>
            <div className='w-[100%] my-4 gap-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5'>
                <Card name="name1" img={c4} />
                <Card name="Sneakers" img={c1} />
                <Card name="Sneakers" img={c2} />
                <Card name="Sneakers" img={c3} />
                <Card name="Sneakers" img={c5} />
                <Card name="Sneakers" img={c7} />
                <Card name="Sneakers" img={c1} />
                <Card name="Sneakers" img={c4} />
                <Card name="Sneakers" img={c5} />
                <Card name="Sneakers" img={c6} />
            </div>
        </div>
    )
}

function Card(props) {


    const id = props.name + "-card";
    const nameId = props.name;

    //hover animation
    window.onload = function() {
        var element = document.getElementById(id);
    if (element.parentNode.matches(":hover")) {
    //Mouse is inside element
        alert("inside")
    } else {
    //Mouse is outside element
     }
    };
    

    return (
        <div id={id} className='overflow-hidden w-[100%] h-[300px] rounded-sm'>
            <div id={nameId} className='hidden absolute z-50 bg-[red]'>
            <h1 className='text-[white]'>{props.name}</h1>
            </div>
                <img className='object-cover blur-1 h-[100%] w-[100%]' src={props.img} alt="" />
        </div>
            
    )
}