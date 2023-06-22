import React from 'react'
import Filters from './filters'
import Grid from './grid'
import CategoryInfo from './categoryInfo'
import { useParams } from 'react-router'
import { useDispatch } from "react-redux"
import { changeCategory } from "../../reducers/productReducer";

export default function Product() {
    const { category } = useParams();
    const dispatch = useDispatch();
    dispatch(changeCategory({categoryName: category}))

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