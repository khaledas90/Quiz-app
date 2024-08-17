import React, { useState, useEffect, useRef } from 'react';
import Confetti from 'react-confetti';
import Seleprate from '../assets/sound/crowd-applauding.mp3'; 
import { useNavigate } from 'react-router-dom';

export default function Summary() {
    const SeleprateSoundRef = useRef(null);
    const navigate = useNavigate();

    const [resultPresent, setResultPresent] = useState(0);
    const [showSummary, setShowSummary] = useState({
        correctAnswers: 0,
        wrongAnswers: 0,
        score: 0,
        totalQuestions: 0,
        time: 0,
        hints: 0,
        fiftyFifty: 0,
    });

    useEffect(() => {
        const savedResult = JSON.parse(localStorage.getItem('playResult')) || {};
        setShowSummary(savedResult);
        if (savedResult.score && savedResult.totalQuestions) {
            setResultPresent((savedResult.score / savedResult.totalQuestions) * 100);
        }
    }, []);

    useEffect(() => {
        if (resultPresent >= 85) {
            SeleprateSoundRef.current.play();
        }
    }, [resultPresent]);

    const [windowSize, setWindowSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
    });

    useEffect(() => {
        const handleResize = () => {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);
  const handleContinue = () => {
    navigate('/');
    localStorage.removeItem('playResult');
  }
    return (
        <div className="Summary">
            <Confetti
                width={windowSize.width}
                height={windowSize.height}
                drawShape={ctx => {
                    ctx.beginPath();
                    for (let i = 0; i < 22; i++) {
                        const angle = 0.35 * i;
                        const x = (0.2 + (1.5 * angle)) * Math.cos(angle);
                        const y = (0.2 + (1.5 * angle)) * Math.sin(angle);
                        ctx.lineTo(x, y);
                    }
                    ctx.stroke();
                    ctx.closePath();
                }}
            />
            <div className="container container_Summary">
               
                <audio ref={SeleprateSoundRef} src={Seleprate} />
                <div className="container-left">
                    <div className="title title-left">Your Result</div>
                    <div className="circle">
                        <div className="circle-score">{resultPresent.toFixed(0)}%</div>
                        <div className="circle-out-of">of 100</div>
                    </div>
                    <div className="container-left-bottom">
                        <div className="container-left-bottom-compliment">
                            {resultPresent >= 85 ? 'Excellent!' :
                             resultPresent >= 50 ? 'Good Job!' :
                             'Keep Trying!'}
                        </div>
                        <div className="container-left-bottom-description">
                            <p>
                                {resultPresent >= 85 ? 
                                    'You scored higher than 85% of the people who have taken these tests.' :
                                 resultPresent >= 50 ? 
                                    'You scored higher than 50% of the people who have taken these tests.' :
                                    'You scored lower than 50% of the people who have taken these tests.'}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="container-right-box"></div>
                <div className="container-right">
                    <div className="title title-right">Summary</div>
                    <div className="stat-box">
                        <div className="stat stat-verbal">
                            <div className="stat-part-left green">Correct</div>
                            <div className="stat-part-right">
                                <span className="blue">{showSummary.correctAnswers}</span> / 15
                            </div>
                        </div>
                        <div className="stat stat-reaction">
                            <div className="stat-part-left red">Wrong</div>
                            <div className="stat-part-right">
                                <span className="blue">{showSummary.wrongAnswers}</span> / 15
                            </div>
                        </div>
                        <div className="stat stat-memory">
                            <div className="stat-part-left yellow">Score</div>
                            <div className="stat-part-right">
                                <span className="blue">{showSummary.score}</span>
                            </div>
                        </div>
                        <div className="stat stat-visual">
                            <div className="stat-part-left purple">Time</div>
                            <div className="stat-part-right">
                                <span className="blue">{showSummary.time}</span>
                            </div>
                        </div>
                        <div className="stat stat-visual">
                            <div className="stat-part-left purple">Hint</div>
                            <div className="stat-part-right">
                                <span className="blue">{showSummary.hints}</span>
                            </div>
                        </div>
                        <div className="stat stat-visual">
                            <div className="stat-part-left purple">FiftyFifty</div>
                            <div className="stat-part-right">
                                <span className="blue">{showSummary.fiftyFifty}</span>
                            </div>
                        </div>
                    </div>
                    <button className="btn" onClick={handleContinue}>Continue</button>
                </div>
            </div>
        </div>
    );
}
