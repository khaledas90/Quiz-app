import React, { useState, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet';
import { GiLifeBar } from "react-icons/gi";
import { FaLightbulb } from "react-icons/fa6";
import { CiClock1 } from "react-icons/ci";
import questionsData from '../questions.json';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import correct from '../assets/sound/correct.mp3';
import wrong from '../assets/sound/wrong.mp3';
import clickBtn from '../assets/sound/click.mp3';
import Swal from 'sweetalert2';
import { Link, useNavigate } from 'react-router-dom';

const isEmpty = (value) => {
    return value === undefined ||
        value === null ||
        (typeof value === 'object' && Object.keys(value).length === 0) ||
        (typeof value === 'string' && value.trim().length === 0);
};

export default function Play() {
    const navigate = useNavigate();
    const correctSoundRef = useRef(null);
    const wrongSoundRef = useRef(null);
    const clickBtnRef = useRef(null);
    const intervalRef = useRef(null);
    const [questions, setQuestions] = useState(questionsData);
    const [currentQuestion, setCurrentQuestion] = useState({});
    const [nextQuestion, setNextQuestion] = useState({});
    const [previousQuestion, setPreviousQuestion] = useState({});
    const [answer, setAnswer] = useState('');
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [correctAnswers, setCorrectAnswers] = useState(0);
    const [wrongAnswers, setWrongAnswers] = useState(0);
    const [hints, setHints] = useState(5);
    const [fiftyFifty, setFiftyFifty] = useState(2);
    const [usedFiftyFifty, setUsedFiftyFifty] = useState(false);
    const [time, setTime] = useState({ minutes: 2, seconds: 0 });
    const [nextButtonDisabled, setNextButtonDisabled] = useState(false);
    const [previousButtonDisabled, setPreviousButtonDisabled] = useState(true);
    const [Finished, setFinished] = useState(false);
    useEffect(() => {
        if (!isEmpty(questions) && questions.length > 0) {
            const current = questions[currentQuestionIndex];
            const next = questions[currentQuestionIndex + 1] || {};
            const previous = questions[currentQuestionIndex - 1] || {};

            setCurrentQuestion(current);
            setNextQuestion(next);
            setPreviousQuestion(previous);
            setAnswer(current?.answer || '');
            document.querySelectorAll('.option').forEach(element => {
                element.style.visibility = "visible";
            });
            handleTimer();
            handleDisableButton();
        }
        return () => {
            clearInterval(intervalRef.current); 
        };
    }, [questions, currentQuestionIndex]);

    const handlePrevious = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
        }
        playAudio(clickBtnRef);
    };

    const handleNext = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
            toast.success(`Quiz Completed`, {
                position: "top-center",
                autoClose: 1000,
            });
            EndQuiz();
        }
        playAudio(clickBtnRef);
    };

    const handleDisableButton = () => {
        setPreviousButtonDisabled(currentQuestionIndex === 0);
        setNextButtonDisabled(currentQuestionIndex === questions.length - 1);
    };

    const handleClick = (option) => {
        if (option === answer) {
            toast.success(`Correct Answer`, {
                position: "top-center",
                autoClose: 1000,
            });
            setScore(score + 1);
            setCorrectAnswers(correctAnswers + 1);
            playAudio(correctSoundRef);
        } else {
            toast.error(`Wrong Answer`, {
                position: "top-center",
                autoClose: 1000,
            });
            setWrongAnswers(wrongAnswers + 1);
            playAudio(wrongSoundRef);
        }
        
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
            toast.success('Quiz Completed', {
                position: "top-center",
                autoClose: 1000,
            });
    navigate('/Summary');
            EndQuiz(); 
        }
    };
    
    
    const handleQuit = () => {
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: "btn btn-success",
                cancelButton: "btn btn-danger"
            },
            buttonsStyling: false
        });
        swalWithBootstrapButtons.fire({
            title: "Are you sure?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes",
            cancelButtonText: "No",
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                swalWithBootstrapButtons.fire({
                    title: "Exited",
                    text: "You have successfully exited the exam.",
                    icon: "success"
                });
                navigate('/');
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                swalWithBootstrapButtons.fire({
                    title: "Cancelled",
                    text: "You can continue :)",
                    icon: "error"
                });
            }
        });
    };

    const handleHints = () => {
        if (hints > 0) {
            let options = Array.from(document.querySelectorAll('.option'));
            let indexOfAnswer;

            options.forEach((element, index) => {
                if (element.innerHTML === answer) {
                    indexOfAnswer = index;
                }
            });

            let hiddenCount = 0;

            while (hiddenCount < 1) {
                const randNumber = Math.floor(Math.random() * options.length);

                if (randNumber !== indexOfAnswer && options[randNumber].style.visibility !== "hidden") {
                    options[randNumber].style.visibility = "hidden";
                    hiddenCount++;
                }
            }

            setHints(hints - 1);
        } else {
            toast.warn("No hints left", {
                position: "top-center",
                autoClose: 1000,
            });
        }
    };

    const handleFiftyFifty = () => {
        if (fiftyFifty > 0 ) {
            const options = Array.from(document.querySelectorAll('.option'));
            let indexOfAnswer;

            options.forEach((option, index) => {
                if (option.innerHTML === answer) {
                    indexOfAnswer = index;
                }
            });

            let hiddenCount = 0;

            while (hiddenCount < 2) {
                const randNumber = Math.floor(Math.random() * options.length);
                if (randNumber !== indexOfAnswer && options[randNumber].style.visibility !== "hidden") {
                    options[randNumber].style.visibility = "hidden";
                    hiddenCount++;
                }
            }

            setFiftyFifty(fiftyFifty - 1);
            setUsedFiftyFifty(true);
        } else {
            toast.warn("No Fifty Fifty left", {
                position: "top-center",
                autoClose: 1000,
            });
        }
    };

    const handleTimer = () => {
        const countDownTime = Date.now() + (time.minutes * 60 + time.seconds) * 1000; 
        intervalRef.current = setInterval(() => {
            const now = new Date().getTime();
            const distance = countDownTime - now;

            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            if (distance < 0) {
                clearInterval(intervalRef.current);
                setTime({ minutes: 0, seconds: 0 });
                Swal.fire("Time Up! Your exam has ended.");
                navigate('/');
                EndQuiz();
            } else {
                setTime({ minutes, seconds });
            }
        }, 1000);
    };

    const playAudio = (audioRef) => {
        if (audioRef.current) {
            audioRef.current.play().catch(error => {
                console.error("Error playing audio:", error);
            });
        }
    };

    const EndQuiz = () => {
        const playResult = {
            score: score,
            totalQuestions: questions.length,
            numberOfAttemptedQuestions: questions.length - wrongAnswers,
            numberOfUnAttemptedQuestions: wrongAnswers,
            correctAnswers: correctAnswers,
            wrongAnswers: wrongAnswers,
            hints: 5 - hints,
            fiftyFifty: 2 - fiftyFifty,
            time: time.minutes + ":" + time.seconds
        }
        localStorage.setItem("playResult", JSON.stringify(playResult));
        setFinished(true);
        console.log(playResult);
    };
const handleFinish = () => {
    navigate('/Summary');
}
    return (
        <>
            <Helmet><title>Play</title></Helmet>
            <>
                <audio id='clickBtn' ref={clickBtnRef} src={clickBtn}></audio>
                <audio id='correct' ref={correctSoundRef} src={correct}></audio>
                <audio id='wrong' ref={wrongSoundRef} src={wrong}></audio>
            </>
            <div className="play">
                <div className="container">
                    <div className="questions p-3">
                        <div className="lifeline-container d-flex align-items-center justify-content-between mb-2">
                            <div className='d-flex align-items-center' onClick={handleFiftyFifty}>
                                <GiLifeBar />
                                <p className='ms-2 text-bold'>{fiftyFifty}</p>
                            </div>
                            <div className='d-flex align-items-center' onClick={handleHints}>
                                <FaLightbulb />
                                <p>{hints}</p>
                            </div>
                        </div>
                        <div className="overall-container d-flex align-items-center justify-content-between">
                            <p>{currentQuestionIndex + 1}/{questions.length}</p>
                            <p className='d-flex align-items-center'>{time.minutes}:{time.seconds < 10 ? `0${time.seconds}` : time.seconds} <CiClock1 /></p>
                        </div>
                        <h3 className='text-center text-bold'>
                            {currentQuestion?.question || "Loading question..."}
                        </h3>
                        <div className="row mt-5 mb-5">
                            {currentQuestion.options && currentQuestion.options.map((option, index) => (
                                <div key={index} className="col-lg-6 option-container">
                                    <div 
                                        className="option" 
                                        onClick={() => handleClick(option)}
                                    >
                                        {option}
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="button-container mt-5 d-flex justify-content-between">
                           
                            <div className="d-flex align-items-center">
                                <button onClick={handlePrevious}   className={`me-3 previous ${previousButtonDisabled ? 'disabled' : ''} `}>Previous</button>
                                <button onClick={handleNext}  className={`me-3 next ${nextButtonDisabled ? 'disabled' : ''} `}>Next</button>
                               {Finished && <button to="/" onClick={handleFinish} className={`me-3 next  `}>Finish</button>} 
                            </div>
                            <button className="quit" onClick={handleQuit}>Quit</button>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </>
    );
}
