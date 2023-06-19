import React from 'react'

export default function NavLink(props) {
    return (
        <a className='mx-4 text-center font-bold hover:text-secondary' href={props.url}>{props.text}</a>
    )
}