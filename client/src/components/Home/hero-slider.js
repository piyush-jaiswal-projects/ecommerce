import React from 'react'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { c1, c2, c3, c4, c5, c6, c7 } from '../../constants/images'

// const images = [c1, c2, c3, c4, c5, c6, c7];

export default function Heroslider() {
    return (
        <div className='w-[100vw] overflow-hidden h-[600px] md:h-[90vh] mt-[8vw] md:mt-[5vw] mx-auto border border-t-0 border-b-0 border-primary'>
            {/* CAROUSEL */}
            <Carousel
                transitionTime={1000}
                autoPlay={true}
                centerMode={true}
                showStatus={true}
                showIndicators={true}
                centerSlidePercentage={100}
                showArrows={true}
                interval={3000}
                stopOnHover={false}
                infiniteLoop={true}>
                <img className='object-cover md:object-fill h-[100%] md:h-[auto] w-[100%]' src={c2} alt='' />
                <img className='object-cover md:object-fill h-[100%] md:h-[auto] w-[100%]' src={c1} alt='' />
                <img className='object-cover md:object-fill h-[100%] md:h-[auto] w-[100%]' src={c4} alt='' />
                <img className='object-cover md:object-fill h-[100%] md:h-[auto] w-[100%]' src={c5} alt='' />
                <img className='object-cover md:object-fill h-[100%] md:h-[auto] w-[100%]' src={c6} alt='' />
                <img className='object-cover md:object-fill h-[100%] md:h-[auto] w-[100%]' src={c7} alt='' />
                <img className='object-cover md:object-fill h-[100%] md:h-[auto] w-[100%]' src={c3} alt='' />
                </Carousel>
         </div>
    )
}