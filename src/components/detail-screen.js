import "./detail-screen.css";

import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import ShareScreen from "./share-screen";

export default function DetailScreen() {
    const { id } = useParams();
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

        const choice = e.target.firstChild.innerText;
        const vote = parseInt(e.target.dataset.vote) + 1;

        console.log(choice);

        const requestOptions = {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ choices: [{ choice: choice, votes: vote }]})
        };

        fetch(`https://private-bbbe9-blissrecruitmentapi.apiary-mock.com/questions/${id}`, requestOptions)
            .then(response => response.json())
            .then(data => console.log(data));
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
                    <div className="question__choice question__choiceDiv-voted" key={el.choice} data-vote={el.votes}>
                        <div className="question__choice-voted">{el.choice}</div>
                        <div className="question__vote-voted">{el.votes} votes</div>
                    </div>
                ))}
            </div>
            <div className="question__action">
                <a href="/questions">
                    <span className="material-symbols-outlined">
                        arrow_back
                    </span>
                    <span className="question__back">back</span>
                </a>
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