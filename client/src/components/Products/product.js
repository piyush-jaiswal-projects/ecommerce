import React from 'react'
import Filters from './filters'
import Grid from './grid'
import CategoryInfo from './categoryInfo'

export default function Product() {
    return (
        <>
            <CategoryInfo />
            <div className='w-[100vw] h-[100vw]'>
            <Filters />
            <Grid />
            </div>
        </>
    )
}