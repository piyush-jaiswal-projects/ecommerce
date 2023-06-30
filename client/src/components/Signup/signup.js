import React, {useState} from 'react'
import { Logo1, Show, Hide } from '../../constants/images'
import { useDispatch, useSelector } from 'react-redux'
import { signupAsync} from '../../reducers/userReducer'
import getCookie from '../../functions/getCookie'

export default function Signup() {
    if (getCookie("userLoggedIn") === "true") window.location.replace("/")
    
    const dispatch = useDispatch();
    const message = useSelector((state) => state.user.message);

    const [formData, setFormData] = useState({
        name: "",
        username: "",
        password: ""
    })

    const [otpData, setOTPData] = useState();

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

    function signup() {
            dispatch(signupAsync({ userData: formData }))
        
    }

    function ValidateOTP() {
        window.location.replace("/");
    }


    return (
        <div className='mt-[8vw] md:mt-[5vw] p-4 mb-[150px]'>
            <div className="w-[25rem] mx-auto flex justify-center">
                <a href='/'>
                    <img className="w-[25vw] sm:w-[18vw] md:w-[13vw] lg:w-[8vw]" src={Logo1} alt="16Ten" />
                </a>
            </div>
            <div id='signup' className='flex items-center justify-center'>

                <div className='sm:left-0 w-[20rem] sm:w-[25rem] h-[28rem] mt-10 p-5 rounded-lg border border-secondary'>
                    
                    <div className='my-1'>
                        <h1 className='text-secondary font-bold text-[1.5rem]'>Signup</h1>
                    </div>
                    <label>{message}</label>

                    <div className='my-2'>
                        <label>Name</label>
                        <br />
                        <input
                            className='bg-base border w-[100%] rounded-md p-2 outline-secondary'
                            type='text'
                            name='name'
                            value={formData.name}
                            onChange={handleChange} />
                    </div>

                    <div className='my-2'>
                        <label>Phone Number(with country code)</label>
                        <br />
                        <input
                            className='bg-base border w-[100%] rounded-md p-2 outline-secondary'
                            type='text'
                            name='username'
                            value={formData.username}
                            onChange={handleChange} />
                    </div>

                    <div className='my-2'>
                            <label>Password</label>
                    <div>
                        <span className='flex items-center'>
                        <input
                            className='bg-base border-y border-l w-[20rem] h-[2.5rem] rounded-l-md p-2 outline-secondary'
                            type={pass.type}
                            name='password'
                            value={formData.password}
                            onChange={handleChange} />
                                <button onClick={changePasswordState} className='bg-base border-y border-r w-[2.3rem] h-[2.5rem] rounded-r-md p-2 '>
                                    <img src={pass.img} alt='(.)' />
                                </button>
                        </span>
                    </div>
                    </div>

                <div className=' mb-2 mt-6'>
                        <button
                            onClick={signup}
                            className='w-[100%] font-bold border border-secondary hover:bg-base hover:text-secondary h-[2.5rem] p-2 bg-secondary rounded-lg'
                        >Signup</button>
                </div>

                <div className='flex justify-center'>
                    <label>Already registered? <a href="/login" className='underline'>Login</a></label>
                </div>


            </div>
            </div>
            
            {/* OTP Validator */}
            <div id="otp" className='hidden'>
            <div className='flex items-center justify-center'>
            <div className='sm:left-0 w-[20rem] sm:w-[25rem] h-[25rem] mt-10 p-5 rounded-lg border border-secondary'>
                    
                    <div className='my-1'>
                        <h1 className='text-secondary font-bold text-[1.5rem]'>Verify your email / phone number</h1>
                    </div>

                    <label>Please enter OTP sent on {formData.username}</label>

                    <div className='my-2'>
                        <label>Enter OTP</label>
                        <br />
                        <input
                            className='bg-base border w-[100%] rounded-md p-2 outline-secondary'
                            type='text'
                            name='otp'
                            value={otpData}
                            onChange={(e)=>{setOTPData(e.target.value)}} />
                    </div>

                <div className=' mb-2 mt-6'>
                        <button
                            onClick={ValidateOTP}
                            className='w-[100%] font-bold border border-secondary hover:bg-base hover:text-secondary h-[2.5rem] p-2 bg-secondary rounded-lg'
                        >Verify</button>
                </div>

                <div className='flex justify-center'>
                    <label>Go back? <a href="/signup" className='underline'>Signup</a></label>
                </div>


            </div>
                </div>
                </div>
        </div>
    )
}