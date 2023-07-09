import React from 'react'
import Grid from './grid'
import CategoryInfo from './categoryInfo'
import Filters from './filters'
import { useParams } from 'react-router'
import { useDispatch } from "react-redux"
import { changeCategory, getProductsAsync } from "../../reducers/productReducer";

export default function Product(props) {
    const { category } = useParams();
    const dispatch = useDispatch();

    async function getData() {
        await dispatch(getProductsAsync({categoryName: category, type: props.type}));
        await dispatch(changeCategory({ categoryName: category, type: props.type }));
    }
    getData();

    return (
        <div className='mt-[8vw] md:mt-[5vw] lg:flex justify-around'>
            <div className='w-[90vw] lg:w-[15vw] mx-auto mt-[8vw] md:mt-[8vw] lg:mt-[2rem]'>
                <CategoryInfo />
                <Filters />
            </div>
            <div className='w-[100vw] lg:w-[80vw] mt-[2rem]'>
            <Grid />
            </div>
        </div>
    )
}