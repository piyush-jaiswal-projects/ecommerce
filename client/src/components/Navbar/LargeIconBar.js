import { useSelector } from "react-redux";
import NavLink from '../Links/NavLinks'

export default function LargeIconBar(props) {
    const isUser = useSelector((state) => state.user.userLoggedIn);
    const userName = useSelector((state) => state.user.userName);

    return (
        <section className='flex items-center justify-around mr-[20px]'>

            <div className='my-4'>
                <NavLink text="Products" url="/products" />
            </div>
            {isUser === "true" ?
                <div className='my-4'>
                    <NavLink text={userName} url="/userportal" />
                </div>
                :
                <div className='my-4'>
                    <NavLink text="Signin" url="/login" />
                </div>
            }


            {isUser === "true" ?
                <div className='flex items-center justify-around'>
                    {props.userIcons.map((item) => {
                        return (
                            <a href={item.link}>
                                <label className="flex justify-center items-center mx-2">
                                    <img
                                        key={item.image}
                                        className=' hover:text-secondary cursor-pointer'
                                        src={item.image}
                                        alt="" />
                                    {item.length === -1 ? "" : "(" + item.length + ")"}
                                </label>
                            </a>
                        )
                    })}
                </div> : ""}
        </section>
    )
}

