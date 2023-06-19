import React from 'react'

export default function NavLink(props) {
    return (
        <a key={props.key} className='mx-4 text-center font-bold hover:text-secondary' href={props.url}>{props.text}</a>
    )
}