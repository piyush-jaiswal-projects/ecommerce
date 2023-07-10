import React, {useEffect, useState} from 'react'
import { useSelector } from 'react-redux'
import ProductCard from './productCard'
import $ from 'jquery'

export default function Grid() {
    const products = useSelector((state) => state.product.currentProducts)
    const prodMsg = useSelector((state) => state.product.prodMsg)

    const [start, setStart] = useState(0);
    const [end, setEnd] = useState(9);

    useEffect(() => {
        console.log(start);
        console.log(end);
    }, [start, end])

    function goPrevious() {
        if (start === 0) {
            $("#prev").prop("disabled", true);
            $("#prev").addClass("text-[grey]");
            return;
        }

        $("#next").removeClass("text-[grey]");
        $("#next").prop("disabled", false);

        setStart((prevState) => start-9<0 ? 0: prevState - 9);
        setEnd((prevState) => prevState-9);
    }

    function goNext() {
        if (end === products.length) {
            $("#next").prop("disabled", true);
            $("#next").addClass("text-[grey]");
            return;
        }

        $("#prev").removeClass("text-[grey]");
        $("#prev").prop("disabled", false);

        setStart((prevState) => prevState + 9);
        setEnd((prevState) => end+9>products.length ? products.length : prevState + 9);
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
            {products.slice(start, end).map((product) =>
                <ProductCard key={product.id} product={product} />
            )}
            </div>
            <div className='w-[90%] sticky bg-base p-3 my-2 mx-auto flex justify-center items-center'>
                <button className='mx-4 flex items-center w-[50px] justify-center hover:shadow-xl bg-base outline outline-secondary p-1 rounded-md ' id="prev" onClick={goPrevious} >prev</button>
                <button className='mx-4 flex items-center w-[50px] justify-center hover:shadow-xl bg-base outline outline-secondary p-1 rounded-md ' id="next" onClick={goNext}>next</button>
            </div>
        </>
    )
}