import React, {useState} from 'react'
import { useParams } from 'react-router'
import Reviews from './reviews';
import $ from 'jquery'
import { GetProductFromId } from '../../reducers/productReducer';
import { Star } from '../../constants/images';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart, addToWishlist } from '../../reducers/userReducer';

export default function ProductPage(props) {
    const params = useParams();
    const dispatch = useDispatch();
    const product = GetProductFromId(params.productId);
    const [value, setValue] = useState(1);
    const [size, setSize] = useState("");
    const [btnText, setBtnText] = useState("Add to Cart")
    const isUser = useSelector((state) => state.user.userLoggedIn);
    console.log(product);

    function CalculateRating() {
        const reviews = product.reviews;
        var rating = 0;
        for (let index = 0; index < reviews.length; index++) {
            rating = rating + reviews[index].rating;
        }
        return rating/reviews.length;
    }

    function toggleImageSize(imgId) {
        $("#"+imgId).toggleClass("hidden");
    }

    function changeQty(symbol) {
        if (symbol === "-" && value>1) {
            setValue(() => value-1)
        }
        else if (symbol === "+" && value<10) {
            setValue(()=>value+1)
        }
    }

    function AddToCart(cta) {
        if (isUser) {
            if (btnText !== "Go to Cart") {
                if (size !== "") {
                    //dispatch add to cart
                    dispatch(addToCart({ product: product, size: size, quantity: value  }))
                    if (cta === "buynow") {
                        window.location.replace("/cart");
                    }
                    else {
                        alert('Added To Cart');
                        setBtnText("Go to Cart")
                    }
                }
                else {
                    alert("Please select size")
                }
            }
            else {
                window.location.replace("/cart");
            }
        }
        else {
            window.location.replace("/signup");
        }
    }

    function AddToWishlist() {
        if (isUser) {
            //dispatch add to cart
            dispatch(addToWishlist({ product: product }));
            alert('Added to Wishlist');
        }
        else {
            // window.location.replace("/signup");
            alert('Please Login or Signup')
        }
    }



    return (
        <div className='mt-[8vw] md:mt-[5vw] p-4 overflow-x-hidden'>
            
            <div className='flex flex-wrap justify-around'>
                
                <div className='overflow-hidden grid grid-cols-2 grid-rows-2 w-[90vw] h-[100vw] sm:w-[40rem] sm:h-[40rem]'>
                    {product.images.map((img, index) => {
                        return (
                            <>
                            <img src={img} className='cursor-pointer' alt="Product" onClick={() => toggleImageSize(String(index))} />
                            <EnlargeImage key={String(index)} src={img} id={String(index)} />
                        </>)
                    })}
                </div>

                <div className='w-[90vw] sm:w-[40rem]'>

                    <div className='w-[90vw] sm:w-[35rem]'>
                        <h1 className='text-[2.5rem] leading-tight my-4'>{product.name}</h1>
                        <p className='text-[1rem] text-[grey]'>{product.desc}</p>
                        <br />
                        <div className='flex items-center bg-[white] rounded-sm my-1 py-1 justify-left'>
                            <span className='flex items-center border-r-2 px-2 border-r-base'>
                                {CalculateRating()}
                                <img className='w-[5vw] sm:w-[2.5vw] md:w-[2vw] lg:w-[1.2vw] m-1' src={Star} alt="" /> Rating
                            </span>
                            <span className='px-2'>
                                {product.noOfPurchases}k Purchases
                            </span>
                        </div>
                    </div>

                    <br />
                    <hr className=' text-primary' />
                    <br />

                    <div className='w-[90vw] sm:w-[35rem]'>
                        <h1 className='text-[2.1rem] mb-2'>Price: Rs {product.price}</h1>

                        <div className='sm:flex items-center justify-between'>
                        <div className='w-[100%] text-center sm:text-left sm:w-[40%] mx-2'>
                        <h2>Available Sizes(select one): </h2>
                        <div id="sizebox" className='flex justify-start items-center mb-4'>
                            {product.size.map((size) => {
                                return <SizeBox key={size} text={size} setSize={setSize} />
                            })}
                        </div>
                            </div>
                            
                            <div className='w-[90%] text-center sm:text-left sm:w-[40%] mx-2'>
                            <h2>Select Quantity: </h2>
                            <div className='flex justify-around items-center w-[100%] sm:w-[40%] mb-4 m-2'>
                            <div className='flex justify-center items-center'>
                                        <button className='mx-2 border border-secondary rounded-sm h-[30px] w-[30px] sm:h-[30px] sm:w-[30px] flex items-center justify-center' onClick={() => changeQty("-")}>-</button>
                                        <label>{value}</label>
                                        <button className='mx-2 border border-secondary rounded-sm h-[30px] w-[30px] sm:h-[30px] sm:w-[30px] flex items-center justify-center' onClick={() => changeQty("+")}>+</button>
                            </div>
                        </div> 
                            </div>
                        </div>
                        <div className='flex justify-center items-center'>
                            <button onClick={()=>{AddToCart("buynow")}} className='bg-secondary text-[white] sm:text-[1.5rem] font-bold px-2 py-1 w-[50%] mx-4  rounded-md'>
                                Buy Now
                            </button>
                            <button onClick={AddToCart} className='bg-secondary text-[white] sm:text-[1.5rem] font-bold px-2 py-1 w-[50%] mx-4  rounded-md'>
                                {btnText}
                            </button>
                        </div>
                        <br />
                        <label onClick={AddToWishlist} className='cursor-pointer'>Add to Wishlist</label>
                    </div>

                </div>
            </div>

            <Reviews />
        </div>
    )
}

function SizeBox(props) {
    function selectSize(e) {
        props.setSize(e.target.innerHTML);
        const parent = document.getElementById("sizebox")
        const children = parent.children;
        for (var i = 0; i < children.length; i++) {
            children[i].classList.remove("bg-secondary");
          }
        $("#" + props.text).toggleClass("bg-secondary")
    }

    return (
        <div id={props.text} onClick={selectSize} className='rounded-md border border-secondary h-[30px] w-[30px] text-center cursor-pointer m-2'>
            {props.text}
        </div>
    )
}

function EnlargeImage(props) {
    return (
        <div id={props.id} onClick={()=>{$("#"+props.id).toggleClass("hidden");}} className='hidden cursor-pointer fixed top-[5vw]'>
            <div id="fixed" className='shadow-lg flex justify-center w-[100vw] h-[40rem] z-50 bg-base opacity-100'>
            <div className='overflow-scroll'>
            <img src={props.src} alt="" />
        </div> 
        </div>
        </div>
    )
}