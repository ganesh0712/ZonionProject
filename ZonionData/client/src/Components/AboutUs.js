import React from 'react'
import Navbar from './Navbar'
function AboutUs() {
    return (
        <div >
            <Navbar />
            <div className='container jumboreon'>
                <br></br>
                <br />
                <br />
                <h1 className='display-4'> All about ZONION </h1>
                <br /><br />
                <p className='lead'>ZONION  is an Indian restaurant aggregator <br />
                    and food delivery company founded by Pankaj Chaddah and Deepinder Goyal in 2021.<br />
                    ZONION provides information, menus and user-reviews of restaurants as well as <br />
                    food delivery options from partner restaurants in select cities.</p>
            </div>
        </div>
    )
}

export default AboutUs
