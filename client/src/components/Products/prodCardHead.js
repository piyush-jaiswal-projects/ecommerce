import { Star, RedHeart } from '../../constants/images'
import { useSelector, useDispatch } from 'react-redux'
import { addWishlistAsync } from '../../reducers/userReducer';

export default function CardTop(props) {
    const isUser = useSelector((state) => state.user.userLoggedIn);
    const uid = useSelector((state) => state.user.userId);
    const dispatch = useDispatch();

    // function CalculateRating() {
    //     const reviews = props.props.product.reviews;
    //     var rating = 0;
    //     for (let index = 0; index < reviews.length; index++) {
    //         rating = rating + reviews[index].rating;
    //     }
    //     return rating / reviews.length;
    // }

    function OpenProductPage() {
        window.open("/product/" + props.props.product.id, '_blank')
    }

    function AddToWishlist() {
        if (isUser) {
            dispatch(addWishlistAsync({
                userId: uid,
                product: {
                    product: props.props.product,
                    selectedSize: "",
                    quantity: 1
                }
            }));
            alert("Added to Wishlist");
        }
    }

    return (
        <>
            <div
                className='cursor-pointer h-[300px] w-[300px] rounded-t-lg absolute -z-10 p-1'
                onClick={OpenProductPage}>
                <img
                    className='h-[100%] w-[100%] object-cover rounded-t-lg'
                    src={props.props.product.images[0]}
                    alt="" 
                />
            </div>

            <div className='h-[300px] flex flex-col justify-between'>

                <div className='flex justify-end m-2'>
                    <div
                        onClick={AddToWishlist}
                        className='shadow flex justify-center rounded-full p-2 lg:p-1 bg-[white] h-[12vw] w-[12vw] sm:h-[6vw] sm:w-[6vw] md:h-[4.5vw] md:w-[4.5vw] lg:h-[3vw] lg:w-[3vw]'>
                        <img
                            className='cursor-pointer w-[6vw] sm:w-[3.5vw] md:w-[2.5vw] lg:w-[1.5vw]'
                            src={RedHeart}
                            alt="❤️" 
                        />
                    </div>
                </div>

                {/* <div className='flex items-center bg-[white] rounded-sm shadow w-[30%] m-1 px-1 py-1 justify-center'>

                    <span className='flex items-center border-r-2 border-r-base'>
                        {CalculateRating()}
                        <img
                            className='w-[5vw] sm:w-[2.5vw] md:w-[2vw] lg:w-[1.2vw] m-1'
                            src={Star}
                            alt="⭐️" 
                        />
                    </span>

                    <span className='px-1'>
                        {props.props.product.noOfPurchases}k
                    </span>

                </div> */}

            </div>
        </>
    )
}