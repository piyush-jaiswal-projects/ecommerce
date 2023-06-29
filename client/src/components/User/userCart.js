import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { removeCartAsync, setDeliveryCharge } from '../../reducers/userReducer'
import $ from 'jquery'
import axios from 'axios';

export default function UserCart(props) {
    const cart = useSelector((state) => state.user.cart)
    const addresses = useSelector((state) => state.user.addresses)
    const username = useSelector((state) => state.user.userName)
    const userId = useSelector((state) => state.user.userId);
    const currDelCharge = useSelector((state)=>state.user.currAddressCharge)
    const msg = useSelector((state) => state.user.message);
    const dispatch = useDispatch();

    function calculatePrice() {
        var price = 0;
        for (let index = 0; index < cart.length; index++) {
            price = price + (cart[index].product.price * cart[index].quantity);
        }
        return price;
    }

    function handleClick(e){
        const currAdr = $('#address :selected').val()
        if (currAdr === "Chandigarh, India") {
            dispatch(setDeliveryCharge({charge: 40}))
        }
        else {
            dispatch(setDeliveryCharge({charge: 100}))
        }
    }

    async function PlaceOrder() {
        if ($('#address :selected').val() === "Select Your Delivery Address") {
            alert("Please Select Address")
            return;
        }
        const amt = calculatePrice() + currDelCharge;
        const { data } = await axios.post(process.env.REACT_APP_SERVER_URL + "/api/payment/checkout", {
            userId: userId,
            orderDetails: cart,
            paymentAmt: amt
        });
        const clb = process.env.REACT_APP_SERVER_URL + "/api/payment/verification";

        var options = {
            key: data.key,
            amount: (calculatePrice() + currDelCharge)*100,
            currency: "INR",
            name: "1610 Collections",
            description: "Change the way you style",
            image: "http://res.cloudinary.com/deo80u7qs/image/upload/v1688070447/nlvuen4uyp1wiri4owfx.png",
            order_id: data.order.id,
            callback_url: clb,
            prefill: {
                name: username,
            },
            notes: {
                address: "Razorpay Corporate Office"
            },
            theme: {
                color: "#FFe569"
            }
        };

        var rzp1 = new window.Razorpay(options);
        rzp1.open();
    }

    return (
        <div className={props.embed === true ? "p-4 bg-white" : "mt-[8vw] md:mt-[5vw] p-4 bg-white"}>
            <br />
            <div className='flex justify-center flex-wrap'>
                <div className='w-[100%] lg:w-[60%] bg-base lg:mx-5 px-5 h-[auto] rounded-lg'>
                    <h1 className='text-secondary text-[1.5rem] lg:text-[2rem] text-center lg:text-left font-bold'>Your Cart ({cart.length})</h1>
                    <label>{msg}</label>
                    {cart.map((item, index) => {
                        return (
                            <Card item={item} />
                        )
                    })}
                </div>
                <div className='w-[100%] lg:w-[30%] bg-base my-10 lg:my-0 lg:mx-5 p-5 h-[50vh] lg:h-[40vh] rounded-lg'>
                    <h1 className='text-[1.3rem] mb-2'>Total Price: Rs. {calculatePrice()}</h1>
                    <select id="address" onChange={()=>handleClick()} className='w-[100%] h-[30px]'>
                        {addresses.map((item) => <option>{item}</option>)}
                    </select>
                    <p className='text-[1.1rem] my-2'>Delivery Charges: Rs. {currDelCharge}</p>
                    <h1 className='text-[1.3rem] lg:text-[1.5rem] text-secondary font-bold'>Total Amount: Rs. {calculatePrice() + currDelCharge}</h1>
                    <hr />
                    <div className='flex justify-center my-4'>
                        <button
                            className='bg-secondary text-center text-[1.5rem] w-[100%] lg:w-[90%] p-2 my-2 rounded-lg'
                            onClick={PlaceOrder}
                        >
                            Place Order
                        </button>
                    </div>
                </div>
            </div>
            <div>

            </div>
        </div>
    )
}


// PRODUCT CARD
function Card(props) {
    const item = props.item;

    const dispatch = useDispatch();
    const uid = useSelector((state) => state.user.userId);
    function RemoveProduct(productId) {
        dispatch(removeCartAsync({userId: uid,productId: productId}))
    }

    return (
        <div key={item} className='flex flex-wrap justify-between bg-[white] m-2 my-5 lg:m-4 mx-auto p-2 lg:p-4 items-center w-[100%] lg:w-[90%] shadow-lg rounded-lg'>
                        <div className='w-[100%] sm:w-[20%]'>
                                    <a href={"/product/"+ item.product._id} target='_blank' rel="noreferrer">
                                    <img src={item.product.images[0]} alt=" " />
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
                                <button className='text-secondary text-[1.1rem]' onClick={()=>RemoveProduct(item._id)}>Remove from cart</button>
                            </div>
                        </div>
                    </div>
    )
}