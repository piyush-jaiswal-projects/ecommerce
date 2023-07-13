import React, {useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { loginAsync } from '../../reducers/userReducer'
import { Logo1, Show, Hide } from '../../constants/images'
import getCookie from '../../functions/getCookie'

export default function Login() {
    if (getCookie("userLoggedIn") === "true") { window.location.replace("/products"); }

    const dispatch = useDispatch();
    const message = useSelector((state) => state.user.message);

    const [formData, setFormData] = useState({
        username: "",
        password: "",
        isRemember: false
    })

    const [pass, setPass] = useState({
        type: "password",
        img: Show
    })

    function handleInputChange(e) {
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
        //forget password
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
        if (formData.username === "" || formData.password === "") {
            alert("Please fill complete details")
            return;
        }
        dispatch(loginAsync({ userData: {username: formData.username, password: formData.password} }))
    }


    return (
        <div className='mt-[8vw] md:mt-[5vw] p-4 mb-[150px]'>
            
            <div className="w-[25rem] mx-auto flex justify-center">
                <a href='/'>
                    <img
                        className="w-[25vw] sm:w-[18vw] md:w-[13vw] lg:w-[8vw]"
                        src={Logo1}
                        alt="16Ten" 
                    />
                </a>
            </div>
        
            <div className='flex items-center justify-center'>

                <div className='sm:left-0 w-[20rem] sm:w-[25rem] h-[25rem] mt-10 p-5 rounded-lg border border-secondary'>
                    
                    <div className='my-1'>
                        <h1 className='text-secondary font-bold text-[1.5rem]'>Login</h1>
                    </div>
                    <label>{message}</label>

                    <div className='my-2'>
                        <label>Username</label>
                        <br />
                        <input
                            className='bg-base border w-[100%] rounded-md p-2 outline-secondary'
                            type='text'
                            name='username'
                            value={formData.username}
                            onChange={handleInputChange} />
                    </div>

                
                    <div className='my-4'>
                        <span className='flex justify-between'>
                            <label>Password</label>
                            <label onClick={forgetPassword}>Forget Password?</label>
                
                        </span>

                        <div>
                            <span className='flex items-center'>
                                <input
                                    className='bg-base border-y border-l w-[20rem] h-[2.5rem] rounded-l-md p-2 outline-secondary'
                                    type={pass.type}
                                    name='password'
                                    value={formData.password}
                                    onChange={handleInputChange} 
                                    
                                />
                                
                                <button
                                    onClick={changePasswordState}
                                    className='bg-base border-y border-r w-[2.3rem] h-[2.5rem] rounded-r-md p-2 '>
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