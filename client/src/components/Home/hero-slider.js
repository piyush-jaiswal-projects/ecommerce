import React from 'react'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

const images = [
    "http://res.cloudinary.com/deo80u7qs/image/upload/v1688166240/innumwhyuwydtcsia3q0.jpg",
    "http://res.cloudinary.com/deo80u7qs/image/upload/v1688166300/opn1jmrbcq6uxfgz00en.jpg",
    "http://res.cloudinary.com/deo80u7qs/image/upload/v1688166344/f1ixwxv2oxrngfwgak7u.jpg",
    "http://res.cloudinary.com/deo80u7qs/image/upload/v1688166370/vhjrsrujah2vszemxqs0.jpg",
    "http://res.cloudinary.com/deo80u7qs/image/upload/v1688166399/bchaskxexutj9aogx7er.jpg",
    "http://res.cloudinary.com/deo80u7qs/image/upload/v1688166419/tnmmj0onluaxazx3pfq4.jpg"];

export default function Heroslider() {
 
    return (
        <div className='w-[100vw] h-[80vh] md:h-[100%] overflow-hidden mt-[8vw] md:mt-[5vw] mx-auto border border-t-0 border-b-0 border-primary'>
            <Carousel
                transitionTime={1000}
                autoPlay={true}
                centerMode={true}
                showStatus={false}
                showIndicators={true}
                centerSlidePercentage={100}
                showArrows={false}
                interval={3000}
                stopOnHover={false}
                showThumbs={false}
                infiniteLoop={true}>
                {images.map((item) => {
                    return (
                        <img className='object-cover md:object-fill w-[100vw] h-[80vh] md:h-[100%]' src={item} alt='' />
                    )
                })}
                </Carousel>
            
         </div>
    )
}