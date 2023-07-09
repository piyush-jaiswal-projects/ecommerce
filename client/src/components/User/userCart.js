import React, { useState } from 'react'
import { useSelector} from 'react-redux'
import $ from 'jquery'
import axios from 'axios';
import AddressCard from './address';
import Card from './cartProduct';

export default function UserCart(props) {

    //selector functions
    const cart = useSelector((state) => state.user.cart)
    var addresses = useSelector((state) => state.user.addresses);
    const username = useSelector((state) => state.user.userName)
    const userId = useSelector((state) => state.user.userId);
    const msg = useSelector((state) => state.user.message);

    const [currDelCharge, setDelCharge] = useState(0);
    const [delAddress, setDelAddress] = useState("");

    const clb = process.env.REACT_APP_SERVER_URL + `/api/payment/verification?id=${userId}`;

    function calculatePrice() {
        var price = 0;
        for (let index = 0; index < cart.length; index++) {
            price = price + (cart[index].product.price * cart[index].quantity);
        }
        return price;
    }

    function handleAddressChange(e) {
        const currAdr = $('#address :selected').val()
        const adr = addresses.find((item) => item.location === currAdr);
        setDelCharge(() => adr.delCharge);
        setDelAddress(() => adr.pincode);
    }

    async function PlaceOrder() {
        if (cart.length === 0) {
            alert("Empty Cart");
            return;
        }

        if ($('#address :selected').val() === "Select Delivery Address") {
            alert("Please Select Address")
            return;
        }

        const amt = calculatePrice() + currDelCharge;

        const { data } = await axios.post(process.env.REACT_APP_SERVER_URL + "/api/payment/checkout", {
            userId: userId,
            orderDetails: cart,
            paymentAmt: amt,
            address: delAddress
        });

        var options = {
            key: data.key,
            amount: (calculatePrice() + currDelCharge) * 100,
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
            <AddressCard />

            <div className='flex justify-center flex-wrap'>
                
                <div className='w-[100%] lg:w-[60%] bg-base lg:mx-5 px-5 h-[auto] rounded-lg'>
                    <h1
                        className='text-secondary text-[1.5rem] lg:text-[2rem] text-center lg:text-left font-bold'>
                        Your Cart ({cart.length})
                    </h1>
                    <label>{msg}</label>

                    {cart.map((item, index) => {
                        return (
                            <Card item={item} />
                        )
                    })}
                </div>

                <div className='w-[100%] lg:w-[30%] bg-base my-10 lg:my-0 lg:mx-5 p-5 h-[50vh] lg:h-[40vh] rounded-lg'>
                    <h1 className='text-[1.3rem] mb-2'>
                        Total Price: Rs. {calculatePrice()}
                    </h1>

                    <select id="address" onChange={() => handleAddressChange()} className='w-[100%] h-[30px]'>
                        {addresses.map((item) => <option>{item.location}</option>)}
                    </select>
                    <button onClick={() => {
                        $("#newAddress").toggleClass("hidden");}}>
                        Add New Address
                    </button>

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
        </div>
    )
}
