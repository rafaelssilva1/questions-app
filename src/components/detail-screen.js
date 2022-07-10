import "./detail-screen.css";

import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function DetailScreen() {
    const { id } = useParams();
    const [question, setQuestion] = useState({});
    const [choices, setChoices] = useState([]);

    useEffect(() => {
        fetch(`https://private-bbbe9-blissrecruitmentapi.apiary-mock.com/questions/${id}`)
            .then(response => response.json())
            .then(data => {
                setQuestion(data);
                setChoices(data.choices);
            })
    },[id]);

    const putQuestion = () => {
        window.location=`/questions/${id}`;
    }

    return (
        <div className="container">
            <div className="question__action">
                <a href="/questions">Go back</a>
                <a href="/">Share</a>
            </div>
            <div className="question__title">
                <h1>{question.question}</h1>
            </div>
            <div className="question__choices">
                {choices.map(el => (
                    <div className="question__choice" key={el.choice} onClick={putQuestion}>
                        <p>{el.choice}</p>
                        <small>Current Votes: {el.votes}</small>
                    </div>
                ))}
            </div>
        </div>
    );
}