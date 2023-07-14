import React from 'react'
import { heroImages as images } from '../../constants/data';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';

export default function Heroslider() {

    return (
        <div className='w-[100vw] h-[auto] md:h-[100%] overflow-hidden mt-[8vw] md:mt-[5vw] mx-auto border border-t-0 border-b-0 border-primary'>
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
                        <div className='w-[100vw] h-[auto] md:h-[82vh]'>
                            <img
                                className='skeleton object-cover lg:object-fill'
                                src={item}
                                alt=''
                                loading='lazy'
                            />
                        </div>
                    )
                })}

            </Carousel>
        </div>
    )
}