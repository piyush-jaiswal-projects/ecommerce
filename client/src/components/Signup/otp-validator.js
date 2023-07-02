import React, {useState} from 'react'

export default function OtpValidator(props) {
    const [otpData, setOTPData] = useState();

    function ValidateOTP() {
        window.location.replace("/");
    }

    return (
        <div className='flex items-center justify-center'>
            <div className='sm:left-0 w-[20rem] sm:w-[25rem] h-[25rem] mt-10 p-5 rounded-lg border border-secondary'>


                <div className='my-1'>
                    <h1 className='text-secondary font-bold text-[1.5rem]'>
                        Verify your phone number
                    </h1>
                </div>

                <label>Please enter OTP sent on {props.username}</label>


                <div className='my-2'>
                    <label>Enter OTP</label>
                    <br />
                    <input
                        className='bg-base border w-[100%] rounded-md p-2 outline-secondary'
                        type='text'
                        name='otp'
                        value={otpData}
                        onChange={(e) => { setOTPData(e.target.value) }} />
                </div>

                <div className=' mb-2 mt-6'>
                    <button
                        onClick={ValidateOTP}
                        className='w-[100%] font-bold border border-secondary hover:bg-base hover:text-secondary h-[2.5rem] p-2 bg-secondary rounded-lg'
                    >Verify
                    </button>
                </div>

                <div className='flex justify-center'>
                    <label>Go back? <a href="/signup" className='underline'>Signup</a></label>
                </div>


            </div>
        </div>
    )
}