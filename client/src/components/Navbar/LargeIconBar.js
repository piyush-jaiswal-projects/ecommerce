import { useSelector } from "react-redux";
// import { Search } from '../../constants/images'
import NavLink from '../Links/NavLinks'

export default function LargeIconBar(props) {
    const isUser = useSelector((state) => state.user.userLoggedIn);
    const userName = useSelector((state) => state.user.userName);

    return (
        <section className='flex items-center justify-around mr-[20px]'>
            {/* <div className="flex items-center">
                <input
                    type='text'
                    placeholder='Search...'
                    className='outline-none p-1 border-none h-[30px] rounded-l-lg'
                    value={props.searchItem}
                    onChange={(e) => props.setSearchItem(e.target.value)} 
                />
                <button onClick={props.search} className='bg-[white] p-1 h-[30px] rounded-r-lg'>
                    <img src={Search} className='w-[2vw] lg:w-[1.3vw]' alt="Search" />
                </button>
            </div> */}

            
            {isUser === "true" ?
                    <div className='my-4'>
                    <NavLink text={userName} url="/userportal" />
                    </div>
                    :
                    <>
                    <div className='my-4'>
                    <NavLink text="Signup" url="/signup" />
                    </div>
                    <div className='my-4'>
                    <NavLink text="Login" url="/login" />
                    </div>
                    </>
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

