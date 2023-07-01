import React, { Fragment } from 'react'
import Heroslider from './hero-slider'
import Trending from './trending'
import Banner from './banner'

export default function Home() {
    return (
        <>
            <Heroslider />
            <Trending />
            <Banner />
        </>
     )
}