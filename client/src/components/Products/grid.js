import React from 'react'
import { useSelector } from 'react-redux'
import ProductCard from './productCard'

export default function Grid() {
    const products = useSelector((state) => state.product.currentProducts)
    const prodMsg = useSelector((state) => state.product.prodMsg)
    return (
        <>
            <label>{prodMsg}</label>
        <div
            className='w-[100%] border-l-2 border-base grid gap-y-2 grid-cols-1 min-[600px]:grid-cols-2 min-[1130px]:grid-cols-3'>
            {products.map((product) =>
                <ProductCard key={product.id} product={product} />
            )}
        </div>
        </>
    )
}