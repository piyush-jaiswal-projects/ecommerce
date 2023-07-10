import React from 'react'
import Heroslider from './hero-slider'
import Banner from './banner'
import Categories from './categories'
import ErrorBoundary from '../../error-boundary/handler'

export default function Home() {
    return (
        <ErrorBoundary>
            <Heroslider />
            <Categories />
            <Banner />
        </ErrorBoundary>
     )
}