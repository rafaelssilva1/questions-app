import { useState , useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";

import "./questions-list-screen.css";
import DetailScreen from "./detail-screen";
import ShareScreen from "./share-screen";

let offset = 0;

export default function QuestionsListScreen() {
    let [searchParams] = useSearchParams();
    const term = searchParams.get("filter");
    const [share, setShare] = useState(false);
    const [questions, setQuestions] = useState([]);

    useEffect(() => {
        const filterForm = document.querySelector("#filter");

        fetch(`https://private-bbbe9-blissrecruitmentapi.apiary-mock.com/questions?limit=10&offset=0?filter=${filterForm}`)
            .then(response => response.json())
            .then(data => setQuestions(data))

        if(term === "") {
            filterForm.focus();
        }
        if(term) {
            filterForm.value = term;
        }
    },[term]);

    const loadMore = () => { //update currentPage var, make new API call and push to current array
        const filterForm = document.querySelector("#filter");

        offset = offset + 10

        fetch(`https://private-bbbe9-blissrecruitmentapi.apiary-mock.com/questions?limit=10&offset=${offset}?filter=${filterForm}`)
            .then(response => response.json())
            .then(data => {
                setQuestions(questions.concat(data));
            })
    };

    const shareScreen = () => {
        console.log(share);
        setShare(true);
    };

    return (
        <div className="questions">
            <div className="container">
                <div className="questions__header">
                    <h1 className="default__title questions__title">questions</h1>
                    <div className="question__shareDiv" onClick={shareScreen}>
                        <span className="material-symbols-outlined">
                            share
                        </span>
                        <span className="question__share">share</span>
                    </div>
                    <form className="questions__form" method="GET" action={`/questions?filter=`}>
                        <input className="questions__input" type="text" name="filter" id="filter" placeholder="Find a question here..."></input>
                    </form>
                </div>
                
                <ul className="questions__list">
                    {questions.map(el => (
                        <Link element={<DetailScreen />} to={`/questions/${el.id}`} key={el.id}>
                            <li className="questions__item">
                                <div className="questions__meta">
                                    <div className="questions__img">
                                        <img src={el.thumb_url} alt={el.question}></img>
                                    </div>
                                    <span className="questions__date">{`${new Date(el.published_at).getDay()}-${new Date(el.published_at).getMonth()}-${new Date(el.published_at).getFullYear()}`}</span>
                                </div>
                                <article className="questions__content">
                                    <p className="questions__text">{el.question}</p>
                                </article>
                            </li>
                        </Link>
                    ))}
                </ul>
                <div className="questions__loadmorediv">
                    <button className="questions__loadmore" onClick={loadMore}>load more</button>
                </div>
            </div>
            {share && <ShareScreen closeShare={setShare} styles={"shareStyleInverted"} />}
        </div>
    )

}