import axios from 'axios'
import { useState } from "react";
import { useSelector } from 'react-redux';


export default function Card(props) {
    const item = props.item;
    const uid = useSelector((state) => state.user.userId);
    const [status, setStatus] = useState("");

    async function cancelOrder(id, type) {
        const uri = process.env.REACT_APP_SERVER_URL + "/api/user/cancelOrder"
        const data = {
            userId: uid,
            orderId: id
        }

        setStatus(() => "processing...");

        axios.post(uri, data)
            .then((res) => {
                if (res.data.success) {
                    setStatus(() => "");
                    window.location.reload();
                }
            })
            .catch((err) => {
                console.log(err);
                setStatus(() => "Cancellation Failed")
            });
    }

    return (
        <div key={item} className='flex flex-wrap justify-between bg-[white] m-2 my-5 lg:m-4 mx-auto p-2 lg:p-4 items-center w-[100%] lg:w-[90%] shadow-lg rounded-lg'>

            <div className='w-[100%] sm:w-[20%]'>
                <a href={"/product/" + item.product._id} target='_blank' rel="noreferrer">
                    <img src={item.product.images[0]} alt=" " />
                </a>
            </div>

            <div className='w-[100%] sm:w-[80%] my-2 px-1 sm:px-5'>

                <div className='text-center sm:text-left'>
                    <h1 className='font-bold text-[1.2rem] lg:text-[1.3rem] leading-tight'>
                        {item.product.name}
                    </h1>
                    <p className='text-[1.2rem]'>
                        Price: {item.product.price} | Quantity: {item.quantity} | Size: {item.selectedSize}
                    </p>
                </div>

                <div className='text-center sm:text-left'>
                    <p className="my-2 text-[1.2rem]">
                        Expected Delivery :
                        <label className="text-secondary">
                            {item.expectedDelivery}
                        </label>
                    </p>

                    <p className="my-2 text-[1.2rem]">
                        Order Status :
                        <label className="text-secondary">
                            {item.orderStatus}
                        </label>
                    </p>

                    {item.orderStatus !== "CANCELLED" ?
                        <button
                            className='text-[grey] text-[1.2rem]'
                            onClick={() => cancelOrder(item._id, "cancel")}>
                            Cancel Order
                        </button>
                        : ""}
                    {status}
                    {item.orderStatus === "DELIVERED" ?
                        <button
                            className='text-[grey] text-[1.2rem]'
                            onClick={() => cancelOrder(item._id, "return")}>
                            Return Item
                        </button> : ""}
                </div>
            </div>
        </div>
    )
}