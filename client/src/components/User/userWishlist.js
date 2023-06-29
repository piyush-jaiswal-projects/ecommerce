import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { removeFromWishlist} from '../../reducers/userReducer'

export default function UserWishlist() {
    const wishlist = useSelector((state) => state.user.wishlist)

    function calculatePrice() {
        var price = 0;
        for (let index = 0; index < wishlist.length; index++) {
            price = price + (wishlist[index].product.price * wishlist[index].quantity);
        }
        return price;
    }

    return (
        <div className='mt-[8vw] md:mt-[1vw] p-4 bg-white'>
            <br />
            <div className=''>
                <div className='w-[100%] lg:w-[60%] bg-base ml-[50px] px-5 py-5 h-[auto] rounded-lg'>
                    <h1 className='text-secondary text-[1.5rem] lg:text-[2rem] text-center lg:text-left font-bold'>Your wishlist ({wishlist.length}) - Total Value : Rs. {calculatePrice()}</h1>
                    {wishlist.map((item, index) => {
                        return (
                            <WishCard item={item} />
                        )
                    })}
                </div>
            </div>
            <div>

            </div>
        </div>
    )
}


// PRODUCT CARD
function WishCard(props) {
    const item = props.item;
    const dispatch = useDispatch();
    console.log(item.product);
    function RemoveProduct(productId) {
        dispatch(removeFromWishlist({productId: productId}))
    }

    return (
        <div key={item} className='flex flex-wrap justify-between bg-[white] m-2 my-5 lg:m-4 mx-auto p-2 lg:p-4 items-center w-[100%] lg:w-[90%] shadow-lg rounded-lg'>
                        <div className='w-[100%] sm:w-[20%]'>
                                    <a href={"/product/"+ item.product.productId} target='_blank' rel="noreferrer">
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
                                <button className='text-secondary text-[1.1rem]' onClick={()=>RemoveProduct(item.product.productId)}>Add to cart</button>
                            </div>
                            <div className='text-center sm:text-left'>
                                <button className='text-secondary text-[1.1rem]' onClick={()=>RemoveProduct(item.product.productId)}>Remove from wishlist</button>
                            </div>
                        </div>
                    </div>
    )
}