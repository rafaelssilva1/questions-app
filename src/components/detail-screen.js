import "./detail-screen.css";

import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import ShareScreen from "./share-screen";

export default function DetailScreen() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [question, setQuestion] = useState({});
    const [choices, setChoices] = useState([]);
    const [share, setShare] = useState(false);
    const [answer, setAnswer] = useState(false);

    useEffect(() => {
        fetch(`https://private-bbbe9-blissrecruitmentapi.apiary-mock.com/questions/${id}`)
            .then(response => response.json())
            .then(data => {
                setQuestion(data);
                setChoices(data.choices);
            })
    },[id]);
    
    const shareScreen = () => {
        setShare(true);
    };
    
    function putQuestion(e) {
        e.preventDefault();
        setAnswer(true);

        if(!e.target.parentElement.hasAttribute("id", "voted")) {
            e.target.setAttribute("id", "vote");
            e.target.parentElement.setAttribute("id", "voted");
        }
    };

    return (
        <div className="container question">
            <div className="question__header">
                <h1 className="question__title">{question.question}</h1>
                <p className="question_subtitle">{!answer ? "👇 vote!" : "🤞 results"}</p>
            </div>
            <div className="question__choices">
                {!answer ?
                    choices.map(el => (
                    <div className="question__choice" key={el.choice} onClick={putQuestion} data-vote={el.votes}>
                        <p>{el.choice}</p>
                    </div>
                )) :
                    choices.map(el => (
                    <div className="question__choice question__choiceDiv-voted" key={el.choice} onClick={putQuestion} data-vote={el.votes}>
                        <div className="question__choice-voted">{el.choice}</div>
                        <div className="question__vote-voted">{el.votes} votes</div>
                    </div>
                ))}
            </div>
            <div className="question__action">
                <div onClick={() => navigate(-1)}>
                    <span className="material-symbols-outlined">
                        arrow_back
                    </span>
                    <span className="question__back">back</span>
                </div>
                <div className="question__shareDiv" onClick={shareScreen}>
                    <span className="material-symbols-outlined">
                        share
                    </span>
                    <span className="question__share">share</span>
                </div>
            </div>
            {share && <ShareScreen closeShare={setShare} />}
        </div>
    );
}