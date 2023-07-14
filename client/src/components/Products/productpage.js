import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import Reviews from './reviews';
import $ from 'jquery'
import { Star } from '../../constants/images';
import { useSelector, useDispatch } from 'react-redux';
import { addCartAsync, addWishlistAsync } from '../../reducers/userAsyncThunks';
import axios from 'axios'
import Popup from '../Popup/popup';
import ErrorBoundary from '../../error-boundary/handler';

export default function ProductPage(props) {
    const params = useParams();

    const [value, setValue] = useState(1);
    const [size, setSize] = useState("");
    const [btnText, setBtnText] = useState("Add to Cart")
    const [wishBtnText, setWishBtnText] = useState("Add to Wishlist")

    const isUser = useSelector((state) => state.user.userLoggedIn);
    const uid = useSelector((state) => state.user.userId);;
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


    useEffect(() => {
        axios.post(
            process.env.REACT_APP_SERVER_URL + "/api/product/getProductFromId",
            { id: params.productId })
            .then((res) => {
                const [data] = res.data.products;
                setProduct(() => data);
                const template = document.getElementById("prod-template")
                template.querySelector('h1').innerHTML = ''
                template.querySelector('p').innerHTML = ''
                template.querySelector('label').innerHTML = ''
                document.getElementById('price').innerHTML = ''

                template.querySelector('h1').textContent = data.name
                template.querySelector('p').textContent = data.desc
                template.querySelector('label').textContent = "Brand: " + data.brand
                document.getElementById('price').textContent = data.price
            });
    }, [params.productId])



    function CalculateRating() {
        const reviews = product.reviews;
        if (reviews.length === 0) return "";
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
        (symbol === "-" && value > 1) ? setValue(() => value - 1) : value < 10 ? setValue(() => value + 1) : setValue(value);
    }

    async function AddToCart(cta) {
        if (isUser === "true") {
            if (btnText === "Go to Cart") {
                window.location.replace("/cart");
                return;
            }

            if (size !== "") {
                const delDate = await CalDelDate();
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
            window.location.replace("/login");
        }
    }

    async function AddToWishlist() {
        if (isUser === "true") {
            if (size !== "") {
                const delDate = await CalDelDate();
                setWishBtnText(() => "processing ...")
                await dispatch(addWishlistAsync({
                    userId: uid,
                    product: {
                        product: product,
                        selectedSize: size,
                        quantity: value,
                        orderStatus: "processing",
                        expectedDelivery: delDate
                    }
                }));

                setWishBtnText(() => "Add to Wishlist")
                $("#alert-wish").toggleClass("hidden");
                setTimeout(() => {
                    $("#alert-wish").toggleClass("hidden");
                }, 3000);
            }
            $("#alert-size").toggleClass("hidden");
            setTimeout(() => {
                $("#alert-size").toggleClass("hidden");
            }, 3000);
            return;
        }
        else {
            window.location.replace("/login");
        }
    }

    function togglePreview() {
        $("#preview").toggleClass("hidden");
    }


    return (
        <ErrorBoundary>
            <div className='mt-[8vw] md:mt-[5vw] p-4 overflow-x-hidden'>
                <Popup id="alert-cart" text="Added to Cart" />
                <Popup id="alert-size" text="Please Select Size" />
                <Popup id="alert-wish" text="Added to Wishlist" />

                <div className='flex flex-wrap justify-around'>

                    <div id="preview" onClick={togglePreview} className=' hidden fixed z-[200] overflow-scroll w-[99vw] mx-auto shadow-3xl h-[100vh] sm:h-[85vh] p-5 my-0 bg-base border border-secondary rounded-lg'>
                        <label className='font-bold bg-[black] text-secondary fixed mx-auto'>Click image to close preview | Scroll to view complete image</label>
                        <img src={product.images[0]} loading='lazy' className='skeleton mx-auto w-[100%] h-[95%] sm:h-[auto] cursor-pointer' alt="Product" />
                    </div>

                    <div className='w-[90vw] md:w-[50vw] flex items-center justify-center flex-wrap overflow-hidden h-[80vh]'>
                        <div className='overflow-hidden object-fill h-[100%] w-[100%]'>
                            <img src={product.images[0]} onClick={togglePreview} loading='lazy' className='skeleton object-cover w-[100%] h-[95%] cursor-pointer' alt="Product" />
                            <label className='mx-auto font-bold text-secondary'>CLICK ON IMAGE TO ZOOM</label>
                        </div>
                    </div>

                    <div className='w-[90vw] md:w-[40vw] mx-5'>

                        <div id='prod-template'>
                            <h1 className='text-[2.5rem] leading-tight my-4'>
                                <div className='skeleton w-[60%] mb-[0.25rem] rounded-md h-[4rem]'></div>
                            </h1>
                            <p className='text-[1rem] text-[grey]'>
                                <div className='skeleton w-[100%] mb-[0.25rem] rounded-md h-[0.7rem]'></div>
                                <div className='skeleton w-[100%] mb-[0.25rem] rounded-md h-[0.7rem]'></div>
                                <div className='skeleton w-[100%] mb-[0.25rem] rounded-md h-[0.7rem]'></div>
                                <div className='skeleton w-[100%] mb-[0.25rem] rounded-md h-[0.7rem]'></div>
                                <div className='skeleton w-[100%] mb-[0.25rem] rounded-md h-[0.7rem]'></div>
                                <div className='skeleton w-[80%] mb-[0.25rem] rounded-md h-[0.7rem]'></div>
                            </p>
                            <br />
                            <label className='text-[1.2rem] my-4 font-bold text-[grey]'>
                                <div className='skeleton w-[20%] mb-[0.25rem] rounded-md h-[0.7rem]'></div>
                            </label>
                            <div className='flex items-center border-r-base'>
                                Rating: {CalculateRating()} <img
                                    className='w-[5vw] sm:w-[2.5vw] md:w-[2vw] lg:w-[1.2vw] m-1'
                                    src={Star}
                                    alt=""
                                />
                            </div>
                        </div>



                        <br />
                        <hr className=' text-primary' />
                        <br />

                        <div className='w-[90vw] sm:w-[35rem]'>
                            <h1 className='text-[2.1rem] mb-2 inline-flex items-center justify-center'>
                                Price Rs: <label id="price"><div className='skeleton w-[80%] mb-[0.25rem] rounded-md h-[0.7rem]'></div></label>
                            </h1>

                            <div className='sm:fle items-center justify-between'>
                                <div className='w-[100%] text-center sm:text-left sm:w-[40%] mx-2'>
                                    <h2 className='text-left'>Available Sizes: </h2>
                                    <div id="sizebox" className='border border-primary rounded-md h-[50px] flex justify-start items-center mb-2'>
                                        {product.size.map((size) => {
                                            return <SizeBox key={size} text={size} setSize={setSize} />
                                        })}
                                    </div>
                                </div>

                                <div className='w-[90%] text-center sm:text-left sm:w-[40%] mx-2'>
                                    <h2 className='text-left'>Select Quantity: </h2>
                                    <div className='flex justify-start items-center w-[100%] sm:w-[40%] mb-2'>
                                        <div className='border border-primary h-[50px] rounded-md p-2 flex justify-between items-center'>
                                            <button
                                                className='mx-2 border border-primary rounded-full hover:bg-secondary hover:text-[white] h-[35px] w-[35px] flex items-center justify-center'
                                                onClick={() => changeQty("-")}
                                            >
                                                -
                                            </button>
                                            <label className='mx-1'>{value}</label>
                                            <button
                                                className='mx-2 border border-primary rounded-full hover:bg-secondary hover:text-[white] h-[35px] w-[35px] flex items-center justify-center'
                                                onClick={() => changeQty("+")}
                                            >
                                                +
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className='flex justify-start flex-wrap items-center'>
                                <button onClick={AddToCart} className='bg-secondary m-2 text-[white] sm:text-[1.5rem] font-bold p-2 md:p-2 w-[200px] rounded-md'>
                                    {btnText}
                                </button>
                                <button onClick={AddToWishlist} className='m-2 cursor-pointer bg-secondary text-[white] sm:text-[1.5rem] w-[200px] font-bold p-2 md:p-2 rounded-md'>{wishBtnText}</button>
                            </div>
                        </div>

                    </div>
                </div>

                <Reviews />
            </div>
        </ErrorBoundary>
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
        <div id={props.text} onClick={selectSize} className='rounded-full hover:bg-secondary hover:text-[white] border border-primary h-[35px] w-[45px] flex items-center justify-center cursor-pointer m-2'>
            {props.text}
        </div>
    )
}