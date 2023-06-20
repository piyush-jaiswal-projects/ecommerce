import React, { Fragment, useState } from 'react'
import $ from 'jquery'
import { useDispatch } from 'react-redux'

//actions
import { logInUser, logOutUser } from '../../reducers/userReducer'

//images
import { Logo1, Wishlist, User, Bag, Menu } from '../../constants/images'

//custom hook
import useInnerWidth from '../../hooks/useInnerWidth'

//components
import LargeIconBar from './LargeIconBar'
import SmallIconBar from './SmallIconBar'
import Categories from './Categories'
import SmallCategories from './SmallCategories'

export default function Navbar(props) {

    const links = ["Men", "Women", "Kids", "Sports", "Casual"]
    const userIcons = [Wishlist, Bag, User]

    const [searchItem, setSearchItem] = useState("");
    const width = useInnerWidth();

    const dispatch = useDispatch();

    function search() {
        alert("Working")
    }

    function openCategories() {
        $("#CategoriesBar").toggleClass('hidden');
        if ($("IconBar").hasClass("hidden") === false) {
            $("#IconBar").addClass('hidden');
        }
    }

    function openIcons() {
        $("#IconBar").toggleClass('hidden');
        if ($("CategoriesBar").hasClass("hidden") === false) {
            $("#CategoriesBar").addClass('hidden');
        }
    }

    function signInUser() {
        dispatch(logInUser({name: "Piyush"}))
    }

    function signOutUser() {
        dispatch(logOutUser())
    }

    return (
        <Fragment>
            <header className='fixed top-0 bg-base w-[100vw] flex items-center justify-between py-2 px-2'>
            <section className='flex items-center justify-around'>
            <div className="">
                <a href='/'>
                    <img className="w-[25vw] sm:w-[18vw] md:w-[13vw] lg:w-[8vw]" src={Logo1} alt="16Ten" />
                </a>
            </div>
                {width >= 700 ? <Categories links={links} /> : ""} 
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
                    {width >= 700 ? "" : <label className='cursor-pointer' onClick={openCategories}>Categories</label>} 
                    <img onClick={openIcons} className='cursor-pointer w-[15px] mx-4' src={Menu} alt="" />
                </div>
            }
            </header>
            
            
            <SmallIconBar
            searchItem={searchItem}
            userIcons={userIcons}
            setSearchItem={setSearchItem}
            search={search}
                />
            
            <SmallCategories links={links} />

            {/* <div className='mt-[100px]'>
                <button onClick={signInUser}>Test Log In</button>
                <br />
            <button onClick={signOutUser}>Test Log Out</button>
            </div> */}

        </Fragment>
    )
}

