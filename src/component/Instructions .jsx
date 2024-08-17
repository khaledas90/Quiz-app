import React from 'react'
import { Helmet } from 'react-helmet'
import { GiLifeBar } from "react-icons/gi";
import { FaLightbulb } from "react-icons/fa6";
import imgOne from '../assets/imgOne.PNG'
import imgTwo from '../assets/imgTwo.PNG'
import imgThree from '../assets/imgTree.PNG'
import imgFour from '../assets/imgFour.PNG'
import { Link } from 'react-router-dom';

export default function Instructions () {
  return (
    <>
    <Helmet><title>Instructions</title></Helmet>
    <div className="Instructions">
        <div className="container">
          <div className="head">
            <h1>Instructions</h1>
            <h4>How to Play the Quiz</h4>
          </div>
          <div className="content">
            <ul>
                <li>the game has a duration of 15 minutes</li>
                <li>every Game has 4 options
                    <img src={imgOne} alt=""  />
                </li>
                <li>select the correct option
                <img src={imgTwo} alt=""  />
                </li>
                <li>Each game has 2 lifeline normal

                    <ul>
                    <li>2 50-50 chance</li>
                    <li>5 hints</li>
                    </ul>
                </li>
                <li>Selection a 50-50 lifeline by click on icon <GiLifeBar/> will remove 2 wrong answer
                    <img src={imgThree} alt="" />
                </li>
                <li>Using a hint by click on icon <FaLightbulb/>  will remove 1 wrong answer and leave 2 wrong answer and 1 correct answer 
                    <img src={imgFour} alt="" /></li>
                    <li>feel free to play the game and to quit the game any time </li>
                    <li>the timer will start when you start the game </li>
                    <li>lets do it if you think you can</li>
            </ul>
          </div>
           
        </div>
        <div className='btninstraction '>
        <Link to="/" type="button" className="button-86" role="button">Go Back</Link>
        <Link to="/login" type="button" className="button-86" role="button">Get Started</Link>

        </div>
    </div>
     </>
  )
}
