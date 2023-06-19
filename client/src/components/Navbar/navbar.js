import React, { Fragment, useState } from 'react'
import $ from 'jquery'
import { Logo1, Search, Wishlist, User, Bag, Menu } from '../../constants/images'
import NavLink from '../Links/NavLinks'
import useInnerWidth from '../../hooks/useInnerWidth'

export default function Navbar(props) {

    const links = ["Men", "Women", "Kids", "Sports", "Casual"]
    const userIcons = [Wishlist, Bag, User]

    const [searchItem, setSearchItem] = useState("");
    const width = useInnerWidth();

    function search() {
        alert("Working")
    }

    function openIconBar() {
        
    }


    return (
        <Fragment>
            <header className='fixed top-0 bg-base w-[100vw] flex items-center justify-between py-2 px-2'>
            
            <section className=' flex items-center justify-around'>
                
            <div className="">
                        <a href='/'>
                        <img className="w-[25vw] sm:w-[18vw] md:w-[13vw] lg:w-[8vw]" src={Logo1} alt="16Ten" />
                        </a>
            </div>

                {width >= 450
                    ?
                    <Categories links={links} />
                    :
                    ""
                }
                
            </section>

            {width >= 950
                ?
                <LargeIconBar
                    searchItem={searchItem}
                    userIcons={userIcons}
                    setSearchItem={setSearchItem}
                    search={search}
                />
                :
                <div>
                    <img onClick={()=>{$("#IconBar").toggleClass('hidden');}} className='w-[15px]' src={Menu} alt="" />
                </div>
            }
            
        </header>
        <SmallIconBar
            searchItem={searchItem}
            userIcons={userIcons}
            setSearchItem={setSearchItem}
            search={search}
            />

        </Fragment>
    )
}

function LargeIconBar(props) {
    return (
        <section className='flex items-center justify-around'>
            <div className="flex items-center">
                <input
                    type='text'
                    placeholder='Search...'
                    className='outline-none p-1 border-none h-[30px] rounded-l-lg'
                    value={props.searchItem}
                    onChange={(e) => props.setSearchItem(e.target.value)} 
                />
                <button onClick={props.search} className='bg-[white] p-1 h-[30px] rounded-r-lg'>
                    <img src={Search} className='w-[2vw] lg:w-[1.3vw]' alt="Search" />
                </button>
            </div>

            <div>
                <NavLink text="Signup" url="/signup" />
                <NavLink text="Login" url="/login" />
            </div>

            <div className='flex items-center justify-around'>
                    {props.userIcons.map((item) => {
                        return <img className='mx-2 cursor-pointer' src={item} alt="" />
                    })}
            </div>
                </section>
    )
}

function SmallIconBar(props) {
    return (
        <section id="IconBar" className='fixed right-2 z-50 rounded-md text-center bg-primary p-4 mt-14 w-[300px] hidden'>
            <div className="flex items-center my-2">
                <input
                    type='text'
                    placeholder='Search...'
                    className='outline-none p-1 border-none h-[30px] rounded-l-lg w-[100%]'
                    value={props.searchItem}
                    onChange={(e) => props.setSearchItem(e.target.value)} 
                />
                <button onClick={props.search} className='bg-[white] p-1 h-[30px] rounded-r-lg'>
                    <img src={Search} className='w-[2vw] lg:w-[1.3vw]' alt="Search" />
                </button>
            </div>

            <div>
                <div className='my-4'>
                <NavLink text="Signup" url="/signup" />
                </div>
                <div className='my-4'>
                <NavLink text="Login" url="/login" />
                </div>
            </div>

            <div className='flex items-center justify-around border-t-2 border-base pt-4'>
                    {props.userIcons.map((item) => {
                        return <img className='mx-2 cursor-pointer w-[20px]' src={item} alt="" />
                    })}
            </div>
         </section>
    )
}

function Categories(props) {
    return (
        <div className="">
                {props.links.map((item)=> {return <NavLink text={item} url="/" />})}
        </div>
    )
}

function SmallCategories() {
    
}