import { useSelector, useDispatch } from 'react-redux'
import { removeCartAsync } from '../../reducers/userReducer'

export default function Card(props) {
    const item = props.item;

    const dispatch = useDispatch();
    const uid = useSelector((state) => state.user.userId);
    function RemoveProduct(productId) {
        dispatch(removeCartAsync({ userId: uid, productId: productId }))
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
                    <h1 className='font-bold text-[1.2rem] lg:text-[1.3rem] leading-tight'>{item.product.name}</h1>
                    <p className='text-[1.2rem]'>Price: {item.product.price}</p>
                    <p className='text-[1.2rem]'>Quantity: {item.quantity}</p>
                    <p className='text-[1.2rem]'>Size: {item.selectedSize}</p>
                    <p className='text-[1.2rem]'>Expected delivery: {item.expectedDelivery}</p>
                </div>
                <div className='text-center sm:text-left'>
                    <button className='text-secondary text-[1.1rem]' onClick={() => RemoveProduct(item._id)}>Remove from cart</button>
                </div>
            </div>
        </div>
    )
}