import React, { useContext, useEffect, useRef, useState } from 'react'
import MainContext from '../MainContext'
import ForecastH from './ForecastH'
import { motion } from "framer-motion"

const ForecastSlider = () => {
    const [width,setWidth]=useState(0);
    const { hourlyForecast, color } = useContext(MainContext);
    const carousel=useRef();
    useEffect(()=>{
        setWidth(carousel.current.scrollWidth-carousel.current.offsetWidth);
    },[])
    return (
        <motion.div ref={carousel} className='carousel' whileTap={"grabbing"}>
            <motion.div drag="x" dragConstraints={{right:0, left:-width}} className='inner-carousel'>
                {hourlyForecast.map((f,index) => (
                    
                        <motion.div key={index}>
                            <ForecastH  f={f} />
                        </motion.div>
                    )
                )}

            </motion.div>
        </motion.div>
    )
}

export default ForecastSlider