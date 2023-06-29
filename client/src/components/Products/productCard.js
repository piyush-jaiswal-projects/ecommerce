import React from 'react'
import { Star, RedHeart, Tshirt } from '../../constants/images'
import { useSelector, useDispatch } from 'react-redux'
import { addToWishlist } from '../../reducers/userReducer';

export default function ProductCard(props) {

    function OpenProductPage() {
        window.open("/product/"+ props.product._id, '_blank')
    }

    return (
        <div key={props.id} className='justify-self-center m-2 h-[450px] w-[300px] border border-primary rounded-lg'>
            <div className='h-[300px]'>
                <CardTop props={props} />
            </div>


            <div className='border-t-2 border-t-base p-2 cursor-pointer text-center' onClick={OpenProductPage}>
                <h3 className='font-bold hover:text-secondary'>{props.product.name}</h3>
                <p className='text-[grey]'>{props.product.desc.substring(0,100)}</p>
                <p>Rs. {props.product.price}</p>
            </div>
            {/* <button onClick={AddToCart} className='bg-secondary text-[white] font-bold px-2 py-1 w-[90%] mx-4  rounded-md'>Add to cart</button> */}
            
        </div>
    )
}



function CardTop(props) {
    const isUser = useSelector((state) => state.user.userLoggedIn);
    const dispatch = useDispatch();

    function CalculateRating() {
        const reviews = props.props.product.reviews;
        var rating = 0;
        for (let index = 0; index < reviews.length; index++) {
            rating = rating + reviews[index].rating;
        }
        return rating/reviews.length;
    }

    function OpenProductPage() {
        window.open("/product/"+ props.props.product.id, '_blank')
    }

    function AddToWishlist() {
        if (isUser) {
            //dispatch add to cart
            dispatch(addToWishlist({ product: props.props.product }));
            alert('Added to Wishlist');
        }
        else {
            // window.location.replace("/signup");
            alert('Please Login or Signup')
        }
    }

    return (
        <>
            <div className='cursor-pointer h-[300px] w-[300px] rounded-t-lg absolute -z-10 p-1' onClick={OpenProductPage}>
                    {/* Carousel Images */}
                    <img className='h-[100%] w-[100%] object-cover rounded-t-lg' src={Tshirt} alt="" />
                </div>
                <div className='h-[300px] flex flex-col justify-between'>
                    
                    <div className='flex justify-end m-2'>
                    <div onClick={AddToWishlist} className='shadow flex justify-center rounded-full p-2 lg:p-1 bg-[white] h-[12vw] w-[12vw] sm:h-[6vw] sm:w-[6vw] md:h-[4.5vw] md:w-[4.5vw] lg:h-[3vw] lg:w-[3vw]'>
                        <img className='cursor-pointer w-[6vw] sm:w-[3.5vw] md:w-[2.5vw] lg:w-[1.5vw]' src={RedHeart} alt="" />
                    </div>
                    </div>

                    <div className='flex items-center bg-[white] rounded-sm shadow w-[30%] m-1 px-1 py-1 justify-center'>
                        
                    {/* Product Rating & purchased */}
                    <span className='flex items-center border-r-2 border-r-base'>
                            {CalculateRating()}
                            <img className='w-[5vw] sm:w-[2.5vw] md:w-[2vw] lg:w-[1.2vw] m-1' src={Star} alt="" />
                    </span>
                    
                    <span className='px-1'>
                            {props.props.product.noOfPurchases}k
                    </span>
                    
                    </div>

                </div>
        </>
    )
}