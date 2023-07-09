import React, { useState } from 'react'
import { useParams } from 'react-router'
import Reviews from './reviews';
import $ from 'jquery'
import { Star } from '../../constants/images';
import { useSelector, useDispatch } from 'react-redux';
import { addCartAsync, addWishlistAsync } from '../../reducers/userReducer';
import axios from 'axios'
import Popup from '../Popup/popup';

export default function ProductPage(props) {
    const params = useParams();

    const [value, setValue] = useState(1);
    const [size, setSize] = useState("");
    const [btnText, setBtnText] = useState("Add to Cart")
    const [wishBtnText, setWishBtnText] = useState("Add to Wishlist")

    const isUser = useSelector((state) => state.user.userLoggedIn);
    const uid = useSelector((state) => state.user.userId);
    const dispatch = useDispatch();

    const data = {
        images: [],
        size: [],
        desc: "",
        productId: '',
        category: '',
        price: 0,
        stock: 0,
        noOfPurchases: 0,
        reviews: []
    }
    const [product, setProduct] = useState(data);

    axios.post(
        process.env.REACT_APP_SERVER_URL + "/api/product/getProductFromId",
        { id: params.productId })
        .then((res) => {
            const [data] = res.data.products;
            setProduct(() => data);
        });



    function CalculateRating() {
        const reviews = product.reviews;
        var rating = 0;
        for (let index = 0; index < reviews.length; index++) {
            rating = rating + reviews[index].rating;
        }
        return rating / reviews.length;
    }

    function CalDelDate() {
        var today = new Date();
        var dayAfterTomorrow = new Date();
        dayAfterTomorrow.setDate(today.getDate() + 7);
        return dayAfterTomorrow.toLocaleDateString('en-US', {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
          });
    }

    function changeQty(symbol) {
        if (symbol === "-" && value > 1) {
            setValue(() => value - 1)
        }
        else if (symbol === "+" && value < 10) {
            setValue(() => value + 1)
        }
    }

    async function AddToCart(cta) {
        if (isUser === "true") {
            if (btnText === "Go to Cart") {
                window.location.replace("/cart");
                return;
            }

            if (size !== "") {
                const delDate = CalDelDate();
                console.log(delDate);
                setBtnText("processing ...")
                await dispatch(addCartAsync({
                    userId: uid,
                    product: {
                        product: product,
                        selectedSize: size,
                        quantity: value,
                        orderStatus: "processing",
                        expectedDelivery: delDate
                    }
                }))
                setBtnText("Go to Cart")
                $("#alert-cart").toggleClass("hidden");
                setTimeout(() => {
                    $("#alert-cart").toggleClass("hidden");
                }, 3000);
                return;
            }
            $("#alert-size").toggleClass("hidden");
            setTimeout(() => {
                $("#alert-size").toggleClass("hidden");
            }, 3000);
            return;

        }
        else {
            window.location.replace("/signup");
        }
    }

    async function AddToWishlist() {
        if (isUser) {
            setWishBtnText(()=> "processing ...")
            await dispatch(addWishlistAsync({
                userId: uid,
                product: { product: product, selectedSize: size, quantity: value }
            }));

            setWishBtnText(()=>"Add to Wishlist")
            $("#alert-wish").toggleClass("hidden");
            setTimeout(() => {
                $("#alert-wish").toggleClass("hidden");
            }, 3000);
        }
    }



    return (
        <div className='mt-[8vw] md:mt-[5vw] p-4 overflow-x-hidden'>
            <Popup id="alert-cart" text="Added to Cart" />
            <Popup id="alert-size" text="Please Select Size" />
            <Popup id="alert-wish" text="Added to Wishlist" />

            <div className='flex flex-wrap justify-around'>

                <div className='overflow-hidden w-[90vw] h-[80vh] md:h-[100vw] sm:w-[40rem] sm:h-[40rem]'>
                    <div className='overflow-hidden object-fill h-[auto] w-[100%]'>
                        <img src={product.images[0]} className='object-cover w-[100%] h-[100%] cursor-pointer' alt="Product" />
                    </div>
                </div>

                <div className='w-[90vw] sm:w-[40rem]'>

                    <div className='w-[90vw] sm:w-[35rem]'>
                        <h1 className='text-[2.5rem] leading-tight my-4'>{product.name}</h1>
                        <p className='text-[1rem] text-[grey]'>{product.desc}</p>
                        <p className='text-[1rem] text-[grey]'>{product.brand}</p>

                        <br />

                        <div className='flex items-center bg-[white] rounded-sm my-1 py-1 justify-left'>
                            <span className='flex items-center border-r-2 px-2 border-r-base'>
                                {CalculateRating()}
                                <img className='w-[5vw] sm:w-[2.5vw] md:w-[2vw] lg:w-[1.2vw] m-1'
                                    src={Star} alt="" /> Rating
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
                                <h2 className='text-left'>Available Sizes(select one): </h2>
                                <div id="sizebox" className='flex justify-start items-center mb-4'>
                                    {product.size.map((size) => {
                                        return <SizeBox key={size} text={size} setSize={setSize} />
                                    })}
                                </div>
                            </div>

                            <div className='w-[90%] text-center sm:text-left sm:w-[40%] mx-2'>
                                <h2 className='text-left'>Select Quantity: </h2>
                                <div className='flex justify-start items-center w-[100%] sm:w-[40%] mb-4 m-2'>
                                    <div className='flex justify-center items-center'>
                                        <button
                                            className='mx-2 border border-secondary rounded-sm h-[30px] w-[30px] sm:h-[30px] sm:w-[30px] flex items-center justify-center'
                                            onClick={() => changeQty("-")}
                                        >
                                            -
                                        </button>
                                        <label>{value}</label>
                                        <button
                                            className='mx-2 border border-secondary rounded-sm h-[30px] w-[30px] sm:h-[30px] sm:w-[30px] flex items-center justify-center'
                                            onClick={() => changeQty("+")}
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='flex justify-start items-center'>
                            <button onClick={AddToCart} className='bg-secondary text-[white] sm:text-[1.5rem] font-bold p-2 md:p-2 w-[100%] sm:w-[50%] mx-4  rounded-md'>
                                {btnText}
                            </button>
                        </div>

                        <br />

                        <label onClick={AddToWishlist} className='cursor-pointer'>{wishBtnText}</label>
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
        <div id={props.text} onClick={selectSize} className='rounded-md border border-secondary h-[30px] w-[30px] flex items-center justify-center cursor-pointer m-2'>
            {props.text}
        </div>
    )
}