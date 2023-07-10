import React, { Fragment } from 'react'

export default function Footer() {
    return (
        <Fragment>
            <div className='bg-base p-5'>
                <div className='w-[90%] mx-auto mb-4 border-b border-b-secondary'>
                    <h1 className='text-secondary text-[2rem] font-bold'>1610 Collections</h1>
                </div>
                <div className='overflow-wrap grid gap-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 py-4 w-[80%] mx-auto'>
                    <div>
                        <h1 className='text-secondary text-[1.2rem] font-bold'>Address</h1>
                        <p className='text-justify'>
                            XYZ Industrial Area, Phase 2,
                            <br />
                            1610 Road,
                            <br />
                            New Delhi, India</p>
                    </div>

                    <div>
                        <h1 className='text-secondary text-[1.2rem] font-bold'>Payments</h1>
                        - 100% Secure Payment
                        <br />
                        - All cards are accepted
                    </div>

                    <div>
                        <h1 className='text-secondary text-[1.2rem] font-bold'>Return & Refund</h1>
                        - 15 days Return Policy
                        <br />
                        - 100% Refund 
                    </div>

                    <div>
                        <h1 className='text-secondary text-[1.2rem] font-bold'>Customer Support</h1>
                        support@1610collections.com
                        <br />
                        +91-123xxx123x
                    </div>
                </div>
                <div className='border-t border-t-secondary py-4 w-[90%] mx-auto mb-4'>
                    <p>Welcome to 1610 Collections, your ultimate destination for fashionable and high-quality clothing. As a premier ecommerce platform, we specialize in providing a wide range of clothing options for men, women, kids, and sports enthusiasts. We understand the importance of style and comfort in everyday life, and that's why we curate our collections with utmost care, ensuring the latest trends and top-notch craftsmanship.</p>
                    <br />
                    <p>At 1610 Collections, we believe that fashion should be accessible to everyone, regardless of age or occasion. Whether you're looking for trendy outfits for a night out, casual wear for everyday comfort, or sports attire for your active lifestyle, we have you covered. Our diverse selection features a variety of styles, sizes, and designs to suit every individual's unique taste and preference.</p>
                    <br />
                    <p>Join the 1610 Collections community today and explore a world of fashion possibilities. Discover trendy and high-quality clothing for every member of the family, from stylish men's and women's wear to adorable kids' fashion. Embrace your unique style with confidence and shop with us for an exceptional shopping experience.</p>
                </div>
            </div>
            <div className='w-[100%] h-[50px] flex justify-center items-center bg-secondary text-center'>
                <h1>Designed and Developed by <a className='underline' href="https://www.linkedin.com/in/piyushjaiswal1610/">Piyush Jaiswal</a></h1>
            </div>
        </Fragment>
    )
}