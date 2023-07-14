import { useSelector } from "react-redux";
import NavLink from '../Links/NavLinks'

export default function SmallIconBar(props) {
    const isUser = useSelector((state) => state.user.userLoggedIn);
    const userName = useSelector((state) => state.user.userName);

    return (
        <section id="IconBar" className='min-[950px]:hidden fixed top-1 right-2 z-50 rounded-md text-center bg-primary p-4 mt-14 w-[300px] hidden'>

            <div>
                {isUser === "true" ?
                    <div className='my-4'>
                        <NavLink text={userName} url="/userportal" />
                    </div>
                    :
                    <>
                        <div className='my-4'>
                            <NavLink text="Signin" url="/login" />
                        </div>
                    </>
                }
            </div>

            {isUser === "true" ?
                <div className='flex items-center justify-around border-t-2 border-base pt-4'>
                    {props.userIcons.map((item) => {
                        return (
                            <a
                                key={item}
                                href={item.link}>
                                <img key={item} className='mx-2 cursor-pointer w-[20px]' src={item.image} alt="" />
                                {item.length === -1 ? "" : "(" + item.length + ")"}

                            </a>
                        )
                    })}
                </div> : ""}
        </section>
    )
}