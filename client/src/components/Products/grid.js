import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { changePage } from '../../reducers/productReducer'
import ProductCard from './productCard'
import $ from 'jquery'

export default function Grid() {
    const products = useSelector((state) => state.product.currentProducts)
    const prodMsg = useSelector((state) => state.product.prodMsg)
    const start = useSelector((state) => state.product.start)
    const end = useSelector((state) => state.product.end)
    
    const dispatch = useDispatch();

    function goPrevious() {
        if (start === 0) {
            $("#prev").addClass("text-[grey]");
            return;
        }
        $("#next").removeClass("text-[grey]");
        dispatch(changePage({start: start-9<0 ? 0: start - 9 , end: end % 9 !== 0 ? end - 5 : end - 9}))
        
    }

    function goNext() {
        if (end === products.length) {
            $("#next").addClass("text-[grey]");
            return;
        }
        $("#prev").removeClass("text-[grey]");
        dispatch(changePage({start: start+9 , end: end+9>products.length ? products.length : end + 9}))
        
    }

    return (
        <>
            <div className='w-[100%] flex justify-center'>
                <label className='text-[1.5rem] w-[100%] text-center text-secondary mx-auto my-4 px-4'>
                    {prodMsg}
                </label>
            </div>
        <div
            className='w-[100%] min-h-[500px] border-l-2 border-base grid gap-y-2 grid-cols-1 min-[600px]:grid-cols-2 min-[1130px]:grid-cols-3'>
                {products.length < 9
                    ?
                    products.map((product) =>
                <ProductCard key={product.id} product={product} />
            )
                    :
                    products.slice(start, end).map((product) =>
                <ProductCard key={product.id} product={product} />
            )}
            </div>
            {products.length < 9 ? "" :
            <div className='w-[90%] sticky bg-base p-3 my-2 mx-auto flex justify-center items-center'>
                <button className='mx-4 flex items-center w-[50px] justify-center hover:shadow-xl bg-base outline outline-secondary p-1 rounded-md ' id="prev" onClick={goPrevious} >prev</button>
                <button className='mx-4 flex items-center w-[50px] justify-center hover:shadow-xl bg-base outline outline-secondary p-1 rounded-md ' id="next" onClick={goNext}>next</button>
            </div>}
        </>
    )
}