import React from 'react'
import {useSelector} from 'react-redux'

export default function CategoryInfo() {
    const category = useSelector((state) => state.product.currentCategory);
    const totalItems = useSelector((state) => state.product.categoryItemsCount);
    const message = useSelector((state)=>state.product.message)

    return (
        <div className='mt-[8vw] md:mt-[5vw] p-4'>
            <h2>Clothing / {category} <label> {message} </label></h2>
            <label>Total Items: {totalItems}</label>
        </div>
    )
}