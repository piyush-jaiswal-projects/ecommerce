import React, { Fragment } from 'react'
import Heroslider from './hero-slider'
import Banner from './banner'
import Categories from './categories'

export default function Home() {
    return (
        <>
            <Heroslider />
            <Categories />
            <Banner />
        </>
     )
}