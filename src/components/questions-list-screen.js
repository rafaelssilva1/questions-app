import { useState , useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";


import "./questions-list-screen.css";
import Placeholder from "./placeholder";

let offset = 0;

export default function QuestionsListScreen() {
    let [searchParams] = useSearchParams()
    const term = searchParams.get("filter");

    const [questions, setQuestions] = useState([]);


    useEffect(() => {
        const filterForm = document.querySelector("#filter");

        fetch(`https://private-bbbe9-blissrecruitmentapi.apiary-mock.com/questions?limit=10&offset=0?filter=${filterForm}`)
            .then(response => response.json())
            .then(data => setQuestions(data))

        if(!(term)) {
            filterForm.focus();
        }
        if(term) {
            filterForm.value = term;
        }
    },[term]);

    const loadMore = (e) => { //update currentPage var, make new API call and push to current array
        const filterForm = document.querySelector("#filter");

        offset = offset + 10

        fetch(`https://private-bbbe9-blissrecruitmentapi.apiary-mock.com/questions?limit=10&offset=${offset}?filter=${filterForm}`)
            .then(response => response.json())
            .then(data => {
                setQuestions(questions.concat(data));
            })
    };

    return (
        <div className="container">
            <div className="questions__title">
                <h1>Questions List</h1>
            </div>
            <div>
                <form method="GET">
                    <input type="text" name="filter" id="filter" placeholder="Find a question here"></input>
                </form>
            </div>
            <ul className="questions__list">
                {questions.map(el => (
                    <Link element={<Placeholder />} to={`/questions/${el.id}`} key={el.id}>
                        <li className="questions__item">
                        <div className="questions__img">
                            <img src={el.thumb_url} alt={el.question}></img>
                        </div>
                        <article className="questions__content">
                            <h2>
                                <span className="questions__text">{el.question}</span>
                            </h2>
                        </article>
                        </li>
                    </Link>
                ))}
            </ul>
            <button onClick={loadMore}>Load More</button>
        </div>
    )

}