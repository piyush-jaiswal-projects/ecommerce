import React from 'react'

const images = [
    {
        name: "",
        img: "http://res.cloudinary.com/deo80u7qs/image/upload/v1688166399/bchaskxexutj9aogx7er.jpg",
        url: "/product/64aa8da1a4ceca15db51f10c"
    },
    {
        name: "",
        img: "http://res.cloudinary.com/deo80u7qs/image/upload/v1688166986/waaesobca0f4lst7jbaq.jpg",
        url: "/product/64aa8dd6a4ceca15db51f110"
    },
    {
        name: "",
        img: "http://res.cloudinary.com/deo80u7qs/image/upload/v1688167017/osapgr8ri4l0msn5aaev.jpg",
        url: "/product/64aa8e3da4ceca15db51f11c"
    },
    {
        name: "",
        img: "http://res.cloudinary.com/deo80u7qs/image/upload/v1688167072/vsl2di64gm1ohavozzxq.jpg",
        url: "/product/64aa8e7ea4ceca15db51f120"
    },
    {
        name: "",
        img: "http://res.cloudinary.com/deo80u7qs/image/upload/v1688167162/lbsod5ktrchrtps0z0bw.jpg",
        url: "/product/64aa8eb3a4ceca15db51f124"
    },
    {
        name: "",
        img: "http://res.cloudinary.com/deo80u7qs/image/upload/v1688167205/clpndik8398wpe3lvcyn.jpg",
        url: "/product/64aa8f09a4ceca15db51f128"
    },
    {
        name: "",
        img: "http://res.cloudinary.com/deo80u7qs/image/upload/v1688167253/i16wgywcl3pfk8ibkbxv.jpg",
        url: "/product/64aa8f57a4ceca15db51f12c"
    },
    {
        name: "",
        img: "http://res.cloudinary.com/deo80u7qs/image/upload/v1688167313/d6kwduyhd8pvvxx4syq8.jpg",
        url: "/product/64aa8fc2a4ceca15db51f130"
    },
    {
        name: "",
        img: "http://res.cloudinary.com/deo80u7qs/image/upload/v1688167371/ygjkk5d8203lfs9uhixk.jpg",
        url: "/product/64aa9000a4ceca15db51f134"
    },
    {
        name: "",
        img: "http://res.cloudinary.com/deo80u7qs/image/upload/v1688167465/r05oji4bvgk1blkibc7a.jpg",
        url: "/product/64aa902da4ceca15db51f138"
    }
]


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
                <img className='skeleton object-cover blur-1 h-[100%] w-[100%]' src={props.item.img} loading="lazy" alt="" />
        </div>
        </a>
    )
}