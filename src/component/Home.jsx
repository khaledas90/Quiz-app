import React, { Fragment } from 'react'
import { Helmet } from 'react-helmet'
import LottieHAndler from './LottieHHandler'
import { Link } from 'react-router-dom'
import animationData from "../assets/Animation - 1723304310943.json";
import { useSelector } from 'react-redux';
export default function Home() {
    const dataUser = useSelector((state) => state.user.userData);

    console.log(dataUser);

    return (
        <Fragment>
            <Helmet><title>Home</title></Helmet>
            <div className="Home">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 mt-5">
                            <div className="text mt-5">
                                <h1>Improve <br /> your Mind</h1>
                                <div className="text mt-5 mb-5">
                                    <p>Do you like a quiz and want to improve your mind? <br />
                                        Then you are at the right place. find the best quiz for you and
                                        paly , share and learn.
                                    </p>
                                </div>
                                <div className='ml-5'>
                                    <Link to={dataUser && dataUser.length > 0 ? "/Quiz" : "/login"} type="button" className="button-86" role="button">Get Started</Link>
                                </div>

                            </div>

                        </div>
                        <div className="col-lg-6 mt-5">
                            <LottieHAndler animationData={animationData} loop={true} />
                        </div>
                    </div>

                </div>
            </div>
        </Fragment>
    )
}












