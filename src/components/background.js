import React from 'react';
import line1 from '../assets/img/line1.png'
import line2 from '../assets/img/line2.png'
import line3 from '../assets/img/line3.png'
import line4 from '../assets/img/line4.png'
import logowaysbuck from '../assets/img/logowaysbuck.png'
import Rectangle from '../assets/img/Rectangle.png'
import {Card} from 'react-bootstrap'
import "../styles/style.css"


function Landing() {
    return(
        <>
        <div className="container">
                <div className="img1">
                    <img src={line1} />
                </div>
                <div className="img2">
                    <img src={line2}/>
                </div>
                <div className="img3">
                    <img src={line3}/>
                </div>
                <div className="img4">
                    <img src={line4}/>
                </div>
            </div>
        </>
    )
}
export default Landing