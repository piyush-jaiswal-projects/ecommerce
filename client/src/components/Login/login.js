import React, {useState} from 'react'
import { Logo1, Show, Hide } from '../../constants/images'
import { useDispatch } from 'react-redux'
import { logInUser } from '../../reducers/userReducer'

export default function Login() {

    const dispatch = useDispatch();

    const [formData, setFormData] = useState({
        username: "",
        password: "",
        isRemember: false
    })

    const [pass, setPass] = useState({
        type: "password",
        img: Show
    })

    function handleChange(e) {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    function changePasswordState() {
        if (pass.type === "password") {
            setPass({
                type: "text",
                img: Hide
            })
        }
        else {
            setPass({
                type: "password",
                img: Show
            })
        }
    }

    function forgetPassword() {
        
    }

    function rememberMe(e) {
        if (e.target.checked) {
            setFormData({
                ...formData,
                isRemember: true
            })
        }
        else {
            setFormData({
                ...formData,
                isRemember: false
            })
        }
    }

    function Login() {
        //add thunk middleware - which on success redirects to home and on failure set status failed on
        dispatch(logInUser({ name: "Piyush" }))
        window.location.replace("/");
    }


    return (
        <div className='mt-[8vw] md:mt-[5vw] p-4'>
            <div className="w-[25rem] mx-auto flex justify-center">
                <a href='/'>
                    <img className="w-[25vw] sm:w-[18vw] md:w-[13vw] lg:w-[8vw]" src={Logo1} alt="16Ten" />
                </a>
            </div>
        
            <div className='flex items-center justify-center'>

                <div className='sm:left-0 w-[20rem] sm:w-[25rem] h-[25rem] mt-10 p-5 rounded-lg border border-secondary'>
                    
                    <div className='my-1'>
                        <h1 className='text-secondary font-bold text-[1.5rem]'>Login</h1>
                    </div>

                <div className='my-2'>
                        <label>Email / Mobile Number</label>
                        <br />
                        <input
                            className='bg-base border w-[100%] rounded-md p-2 outline-secondary'
                            type='text'
                            name='username'
                            value={formData.username}
                            onChange={handleChange} />
                </div>

                <div className='my-4'>
                        <span className='flex justify-between'>
                            <label>Password</label>
                            <label onClick={forgetPassword}>Forgot Password?</label>
                </span>
                    <div>
                        <span className='flex items-center'>
                        <input
                            className='bg-base border-y border-l w-[20rem] h-[2.5rem] rounded-l-md p-2 outline-secondary'
                            type={pass.type}
                            name='password'
                            value={formData.password    }
                            onChange={handleChange} />
                                <button onClick={changePasswordState} className='bg-base border-y border-r w-[2.3rem] h-[2.5rem] rounded-r-md p-2 '>
                                    <img src={pass.img} alt='(.)' />
                                </button>
                        </span>
                    </div>
                    </div>
                    
                    <div className='flex items-center'>
                        <input className='mr-2' onChange={rememberMe} type="checkbox" />
                        <label>Remember Me</label>
                    </div>

                <div className='my-4'>
                        <button
                            onClick={Login}
                            className='w-[100%] font-bold border border-secondary hover:bg-base hover:text-secondary h-[2.5rem] p-2 bg-secondary rounded-lg'
                        >Login</button>
                </div>

                <div className='flex justify-center'>
                    <label>Not registered? <a href="/signup" className='underline'>Signup</a></label>
                </div>


            </div>
        </div>
        </div>
    )
}