import React from 'react'
import { useSelector } from 'react-redux'

export default function UserCart() {
    const cart = useSelector((state) => state.user.cart)
    console.log(cart[0]);

    function RemoveProduct(productId) {
        alert(productId)
    }

    return (
        <div className='mt-[8vw] md:mt-[5vw] p-4 bg-white'>
            <br />
            <div className='flex justify-center flex-wrap'>
                <div className='w-[100%] lg:w-[60%] bg-base lg:mx-5 px-5 min-h-[100vh] rounded-lg'>
                 <h1 className='text-secondary text-[1.5rem] lg:text-[2rem] text-center lg:text-left font-bold'>Your Cart ({cart.length})</h1>
                    {cart.map((item, index) => {
                        return (
                            <div className='flex flex-wrap justify-between bg-[white] m-2 my-5 lg:m-4 mx-auto p-2 lg:p-4 items-center w-[100%] lg:w-[90%] shadow-lg rounded-lg'>
                        <div className='w-[100%] sm:w-[20%]'>
                                    <a href={"/product/"+ item.product.id} target='_blank' rel="noreferrer">
                                    <img src="http://res.cloudinary.com/deo80u7qs/image/upload/v1687442791/jamneknds0sxyjcc7bgf.png" alt=" " />
                                    </a>
                        </div>
                        <div className='w-[100%] sm:w-[80%] my-2 px-1 sm:px-5'>
                            <div className='text-center sm:text-left'>
                                        <h1 className='font-bold text-[1.2rem] lg:text-[1.3rem] leading-tight'>{item.product.name}</h1>
                                        <p className='text-[1.2rem]'>Price: {item.product.price}</p>
                                        <p className='text-[1.2rem]'>Quantity: {item.quantity}</p>
                                        <p className='text-[1.2rem]'>Size: {item.selectedSize}</p>
                            </div>
                            <div className='text-center sm:text-left'>
                                <button className='text-secondary text-[1.1rem]' onClick={()=>RemoveProduct(item.product.id)}>Remove from cart</button>
                            </div>
                        </div>
                    </div>
                        )
                    })}
                </div>
                <div className='w-[100%] lg:w-[30%] bg-base my-10 lg:my-0 lg:mx-5 p-5 h-[50vh] lg:h-[40vh] rounded-lg'>
                    <h1 className='text-[1.3rem] mb-2'>Total Price: Rs. 50000</h1>
                    <select className='w-[100%] h-[30px]'>
                        <option>Select Your Delivery Address</option>
                        <option>New Delhi, India</option>
                        <option>CHandigarh, India</option>
                    </select>
                    <p className='text-[1.1rem] my-2'>Delivery Charges: Rs. 500</p>
                    <h1 className='text-[1.3rem] lg:text-[1.5rem] text-secondary font-bold'>Total Amount: Rs. 50500</h1>
                    <hr />
                    <div className='flex justify-center my-4'>
                    <button className='bg-secondary text-center text-[1.5rem] w-[100%] lg:w-[90%] p-2 my-2 rounded-lg'>Place Order</button>
                    </div>
                </div>
            </div>
            <div>

            </div>
        </div>
    )
}