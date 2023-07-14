import React, { Fragment, useState } from 'react'
import $ from 'jquery'
import { Logo1, Wishlist, Bag, Menu } from '../../constants/images'
import useInnerWidth from '../../hooks/useInnerWidth'
import LargeIconBar from './LargeIconBar'
import SmallIconBar from './SmallIconBar'
import { useSelector } from 'react-redux'


export default function Navbar(props) {

    const path = window.location.pathname;
    const cart = useSelector((state) => state.user.cart);
    const wishlist = useSelector((state) => state.user.wishlist);

    const userIcons = [
        { image: Wishlist, length: wishlist.length, link: "/wishlist" },
        { image: Bag, length: cart.length, link: "/cart" }
    ]

    const [searchItem, setSearchItem] = useState("");
    const width = useInnerWidth();

    function search() {
        alert("Working")
    }

    function openIcons() {
        $("#IconBar").toggleClass('hidden');
        if ($("CategoriesBar").hasClass("hidden") === false) {
            $("#CategoriesBar").addClass('hidden');
        }
    }

    return (
        <Fragment>
            {path === "/signup" || path === "/login" ? "" :
                <header className='fixed navbar top-0 bg-base w-[100vw] flex items-center justify-between py-2 px-2'>

                    <section className='flex items-center justify-center'>
                        <div className="">
                            <a href='/'>
                                <img
                                    className="w-[25vw] sm:w-[18vw] md:w-[13vw] lg:w-[8vw]"
                                    src={Logo1}
                                    alt="16Ten"
                                    loading='lazy'
                                />
                            </a>
                        </div>
                    </section>

                    {width >= 950 ?
                        <LargeIconBar
                            searchItem={searchItem}
                            userIcons={userIcons}
                            setSearchItem={setSearchItem}
                            search={search}
                        />
                        :
                        <div className='flex justify-between items-center'>
                            <label className='cursor-pointer' onClick={() => window.location.replace('/products')}>Products</label>
                            <img onClick={openIcons} className='cursor-pointer w-[15px] mx-4' src={Menu} alt="" />
                        </div>
                    }
                </header>}


            <SmallIconBar
                searchItem={searchItem}
                userIcons={userIcons}
                setSearchItem={setSearchItem}
                search={search}
            />

        </Fragment>
    )
}

