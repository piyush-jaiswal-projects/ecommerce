import { useSelector } from "react-redux";
import { Search } from '../../constants/images'
import NavLink from '../Links/NavLinks'

export default function SmallIconBar(props) {
    const isUser = useSelector((state) => state.user.userLoggedIn);
    const userName = useSelector((state) => state.user.userName);

    return (
        <section id="IconBar" className='min-[950px]:hidden fixed top-1 right-2 z-50 rounded-md text-center bg-primary p-4 mt-14 w-[300px] hidden'>
            <div className="flex items-center my-2">
                <input
                    type='text'
                    placeholder='Search...'
                    className='outline-none p-1 border-none h-[30px] rounded-l-lg w-[100%]'
                    value={props.searchItem}
                    onChange={(e) => props.setSearchItem(e.target.value)} 
                />
                <button onClick={props.search} className='bg-[white] p-1 h-[30px] rounded-r-lg'>
                    <img src={Search} className='w-[5vw] sm:w-[3.5vw] md:w-[2.5vw] lg:w-[1.3vw]' alt="Search" />
                </button>
            </div>

            <div>
                {isUser ?
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
            </div>

            {isUser ? <div className='flex items-center justify-around border-t-2 border-base pt-4'>
                    {props.userIcons.map((item) => {
                        return <img key={item} className='mx-2 cursor-pointer w-[20px]' src={item} alt="" />
                    })}
            </div> : ""}
         </section>
    )
}