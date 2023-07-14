import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import $ from 'jquery'
import useInnerWidth from '../../hooks/useInnerWidth'

import {
    changeCategory,
    changeSubCategory,
    changeBrand,
    changePriceRange,
    resetFilters
} from '../../reducers/productReducer'


export default function Filters() {
    const dispatch = useDispatch();
    const [maxPrice, setMaxPrice] = useState();
    const [minPrice, setMinPrice] = useState();
    const width = useInnerWidth();

    function categoryChange() {
        const category = $("#category :selected").val();
        if (category !== "Category" || category !== "f1") {
            dispatch(changeCategory({ categoryName: category }))
        }
    }

    function subCategoryChange() {
        const subCat = $("#subCategory :selected").val();
        if (subCat !== "Sub - Category" || subCat !== "f2") {
            dispatch(changeSubCategory({ subCategoryName: subCat }))
        }
    }

    function brandChange() {
        const brand = $("#brand :selected").val();
        if (brand !== "Brand" || brand !== "f3") {
            dispatch(changeBrand({ brand: brand }))
        }
    }

    function priceChange() {
        if (Number(minPrice) > Number(maxPrice)) {
            alert("Min Amt can't be more then max amt")
            return;
        }
        dispatch(changePriceRange({ maxPrice: maxPrice, minPrice: minPrice }));
    }

    function clearFilters() {
        setMinPrice(0);
        setMaxPrice(0);
        $("#category").val("f1");
        $("#subCategory").val("f2");
        $("#brand").val("f3");
        dispatch(resetFilters({}));
    }

    function dropFilter() {
        if (width < 976) {
            $("#dropFilter").toggleClass("hidden");
        }
    }

    return (
        <div className='border-t-2 border-base w-[100%] pt-4'>
            <label className='my-4 font-bold text-secondary border border-secondary p-1 rounded-md shadow-lg' onClick={dropFilter}>{width < 976 ? "Tap to expand/collapse filters" : "Filters:"} </label>
            <br />

            <div id="dropFilter" className={width < 976 ? "hidden" : ""}>
                <div className='my-4 w-[100%]'>
                    <select id="category" onChange={categoryChange} className='outline-none w-[100%] p-2 border border-base rounded-lg'>
                        <option value="f1">Category</option>
                        <option>Men</option>
                        <option>Women</option>
                        <option>Kids</option>
                        <option>Sports</option>
                    </select>
                </div>

                <div className='my-4 w-[100%]'>
                    <select id="subCategory" onChange={subCategoryChange} className='outline-none w-[100%] p-2 border border-base rounded-lg'>
                        <option value="f2">Sub - Category</option>
                        <option>Shoes</option>
                        <option>Jacket</option>
                        <option>Skirt</option>
                        <option>Pants</option>
                        <option>Tshirt</option>
                        <option>Shirt</option>
                        <option>Shorts</option>
                        <option>Sneakers</option>
                        <option>Coat</option>
                        <option>Coat Pant</option>
                        <option>Suit</option>
                    </select>
                </div>

                <div className='my-4 w-[100%]'>
                    <select id="brand" onChange={brandChange} className='outline-none w-[100%] p-2 border border-base rounded-lg'>
                        <option value="f3">Brand</option>
                        <option>ABC</option>
                        <option>1610</option>
                        <option>0422</option>
                        <option>XYZ</option>
                        <option>LKC</option>
                        <option>LMC</option>
                    </select>
                </div>

                <div className='my-4 w-[100%] border border-base rounded-md p-2'>
                    <label>Price: </label>
                    <div className='flex my-2'>
                        <input type="Number" className='w-[50%] inline-block mx-2 border-b-2 border-base text-center outline-none'
                            value={minPrice}
                            onChange={(e) => { setMinPrice(e.target.value) }}
                            placeholder='Min Amt' />
                        <input type="Number" className='w-[50%] inline-block mx-2 border-b-2 border-base text-center outline-none'
                            value={maxPrice}
                            onChange={(e) => { setMaxPrice(e.target.value) }}
                            placeholder='Max Amt' />
                    </div>
                    <button onClick={priceChange} className='w-[100%] rounded-full'>Apply</button>
                </div>

                <div className='mt-4 w-[100%] border-t-4 border-base'>
                    <button onClick={clearFilters} className='underline cursor-pointer rounded-full mx-2 w-[100%]'>Clear Filters</button>
                </div>
            </div>
        </div>
    )
}