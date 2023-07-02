import React from 'react'
import CardTop from './prodCardHead'

export default function ProductCard(props) {

    function OpenProductPage() {
        window.open("/product/" + props.product._id, '_blank')
    }

    return (
        <div key={props.id} className='justify-self-center m-2 h-[480px] w-[300px] border border-primary rounded-lg'>
            <div className='h-[300px]'>
                <CardTop props={props} />
            </div>


            <div className='border-t-2 border-t-base p-2 cursor-pointer text-center' onClick={OpenProductPage}>
                <h3 className='font-bold hover:text-secondary'>{props.product.name}</h3>
                <p>Brand: {props.product.brand}</p>
                <p className='text-[grey]'>{props.product.desc.substring(0, 100)}</p>
                <p>Rs. {props.product.price}</p>
            </div>
            
        </div>
    )
}
