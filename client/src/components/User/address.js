import React, { useState } from 'react'
import $ from 'jquery'
import axios from 'axios';
import { useSelector } from 'react-redux';

export default function AddressCard() {
    const uid = useSelector((state) => state.user.userId);

    const [form, setForm] = useState({
        location: "",
        pincode: 0
    })

    function handleChange(e) {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    async function handleSubmit() {
        const uri = process.env.REACT_APP_SERVER_URL + "/api/user/addAddress";
        const { data } = await axios.post(uri,
            { userId: uid, address: form.location, pincode: form.pincode });
        if (data.success === true) {
            window.location.reload();
            return;
        }

        alert("Failed! Try again later");
        $("#newAddress").toggleClass("hidden");

    }

    return (
        <div id="newAddress" className='hidden animate-scale fixed text-center border border-secondary right-[10%] md:right-[25%] p-5 top-[15%] md:top-[25%] bg-base rounded-lg shadow-lg z-50 mx-auto w-[80%] md:w-[50%] h-[60%] md:h-[50%]'>
            <h1 className='text-[2rem] font-bold '>Add Address</h1>

            <div className='w-[100%] md:w-[80%] mx-auto'>

                <label className='text-[1.2rem] m-0 p-0 text-left'>
                    Enter Complete Address
                </label>

                <br />

                <input
                    type='text'
                    className='w-[100%] p-4 outline-none'
                    name='location'
                    value={form.location}
                    onChange={handleChange}
                />

                <br />

                <label className='text-[1.2rem]'>
                    Enter Pincode
                </label>

                <br />

                <input
                    className='w-[100%] p-4 outline-none'
                    type='number'
                    name='pincode'
                    value={form.pincode}
                    onChange={handleChange}
                />

                <br />

                <button
                    className='w-[100%] my-4 p-2 bg-secondary hover:text-primary rounded-lg text-[1.8rem]'
                    onClick={handleSubmit}>
                    Submit
                </button>

                <label className='cursor-pointer underline' onClick={() => {
                    $("#newAddress").toggleClass("hidden")
                }}>
                    Close
                </label>
            </div>

        </div>
    )
}