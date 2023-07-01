import React from 'react'
import $ from 'jquery'

import { c1, c2, c3, c4, c5, c6, c7 } from '../../constants/images'

const trendingImages = [
    "http://res.cloudinary.com/deo80u7qs/image/upload/v1688166399/bchaskxexutj9aogx7er.jpg",
    "http://res.cloudinary.com/deo80u7qs/image/upload/v1688166986/waaesobca0f4lst7jbaq.jpg",
    "http://res.cloudinary.com/deo80u7qs/image/upload/v1688167017/osapgr8ri4l0msn5aaev.jpg",
    "http://res.cloudinary.com/deo80u7qs/image/upload/v1688167072/vsl2di64gm1ohavozzxq.jpg",
    "http://res.cloudinary.com/deo80u7qs/image/upload/v1688167162/lbsod5ktrchrtps0z0bw.jpg",
    "http://res.cloudinary.com/deo80u7qs/image/upload/v1688167205/clpndik8398wpe3lvcyn.jpg",
    "http://res.cloudinary.com/deo80u7qs/image/upload/v1688167253/i16wgywcl3pfk8ibkbxv.jpg",
    "http://res.cloudinary.com/deo80u7qs/image/upload/v1688167313/d6kwduyhd8pvvxx4syq8.jpg",
    "http://res.cloudinary.com/deo80u7qs/image/upload/v1688167371/ygjkk5d8203lfs9uhixk.jpg",
    "http://res.cloudinary.com/deo80u7qs/image/upload/v1688167465/r05oji4bvgk1blkibc7a.jpg"
]

export default function Trending() {
    return (
        <div className='my-10 w-[90%] mx-auto'>
            <h1 className='text-center text-secondary text-[1.2rem] sm:text-[1.5rem] font-semibold'>TRENDING CATEGORIES</h1>
            <div className='w-[100%] my-4 gap-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5'>
                {trendingImages.map((item) => {
                    return (
                        <Card name="name1" img={item} />
                    )
                })}
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