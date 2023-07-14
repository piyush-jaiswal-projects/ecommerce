import React from 'react'

export default function Popup(props) {
    return (
        <div
            id={props.id}
            className='hidden fixed top-[5rem] animate-scale right-[2rem] border-2 border-secondary text-center p-4 rounded-md z-50 w-[15rem] bg-base shadow-xl'>
            {props.text}
        </div>
    )
}