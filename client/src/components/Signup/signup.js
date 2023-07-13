import React, {useState} from 'react'
import { Logo1, Show, Hide } from '../../constants/images'
import { useSelector, useDispatch } from 'react-redux'
import getCookie from '../../functions/getCookie'
import { signupAsync } from '../../reducers/userReducer'

export default function Signup() {
    if (getCookie("userLoggedIn") === "true") window.location.replace("/products")
    const message = useSelector((state) => state.user.message);

    const [formData, setFormData] = useState({
        name: "",
        username: "",
        password: "",
        countryCode: "+91"
    })

    // const [otp, setOtp] = useState(0);

    const [pass, setPass] = useState({
        type: "password",
        img: Show
    })

    const dispatch = useDispatch();

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

    function isStringNumeric(inputString) {
        return /^\d+$/.test(inputString);
      }

    async function signup() {
        if (formData.name === "" || formData.password === "" || formData.username === "" || formData.countryCode === "") {
            alert("Please fill complete details")
            return;
        }

        var cleanedNumber = formData.username.replace(/\D/g, '');
        if (cleanedNumber.length !== 10 || !isStringNumeric(formData.username)) {
            alert("Please enter valid phone number")
            return;
        }

        const data = {
            name: formData.name,
            username: formData.countryCode+formData.username,
            password: formData.password
        }

        dispatch(signupAsync({ userData: data }));
        

        // $("#signup").toggleClass("hidden");
        // $("#otp").toggleClass("hidden");

        // //send otp //set otp
        // const uri = process.env.REACT_APP_SERVER_URL + "/api/auth/otp"
        // await axios.post(uri, {
        //     name: formData.name,
        //     username: formData.countryCode+formData.username,
        //     password: formData.password
        // }).then((res) => {
        //     if (res.data.success) {
        //         setOtp(res.data.otp);
        //     }
        // });
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
                        <div className='flex justify-center items-center'>
                        <input
                            className='bg-base border border-r-0 w-[20%] rounded-l-md p-2 outline-secondary'
                            type='text'
                            name='countryCode'
                            value={formData.countryCode}
                                onChange={handleChange} />
                            <input
                            className='bg-base border w-[80%] rounded-r-md p-2 outline-secondary'
                                type='tel'
                                maxLength={10}
                            name='username'
                            value={formData.username }
                            onChange={handleChange} />
                        </div>
                    </div>

                    <div className='my-2'>
                        
                        <label>Password</label>
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
            

            <div id="otp" className='hidden'>
                {/* <OtpValidator otp={otp} formData={formData} username={formData.countryCode+formData.username} /> */}
            </div>
        </div>
    )
}