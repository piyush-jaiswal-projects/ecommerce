import React from 'react'
import CardTop from './prodCardHead'

export default function ProductCard(props) {

    function OpenProductPage() {
        window.open("/product/" + props.product._id, '_blank')
    }

    return (
        <div key={props.id} className='justify-self-center m-2 h-[420px] w-[300px] border border-primary rounded-lg'>
            <div className='h-[300px] cursor-pointer' onClick={OpenProductPage}>
                <CardTop props={props} function={OpenProductPage} />
            </div>


            <div className='border-t-2 border-t-base p-2 cursor-pointer text-center' onClick={OpenProductPage}>
                <h3 className='font-bold hover:text-secondary'>{props.product.name}</h3>
                <p className=''><label className='text-[grey]'>Brand:</label> {props.product.brand}</p>
                <p className=''><label className='text-[grey]'>SubCategory:</label> {props.product.subCategory}</p>
                <p>Rs. {props.product.price}</p>
            </div>
            
        </div>
    )
}
