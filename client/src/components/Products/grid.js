import React from 'react'
import { useSelector } from 'react-redux'
import ProductCard from './productCard'

export default function Grid() {
    const products = useSelector((state)=> state.product.currentProducts)
    return (
        <div className='w-[100vw] border-t-2 border-base grid gap-y-2 grid-cols-1 min-[600px]:grid-cols-2 min-[930px]:grid-cols-3 min-[1200px]:grid-cols-4 grid-rows-10'>
            {products.map((product)=> <ProductCard key={product.id} product={product} />)}
        </div>
    )
}