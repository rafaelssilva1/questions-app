import "./loading-screen.css";
import { useState , useEffect } from "react";
import { useNavigate } from 'react-router-dom';

export default function LoadingScreen() {
    const [display, setDisplay] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        fetch("https://private-bbbe9-blissrecruitmentapi.apiary-mock.com/health")
        .then(response => response.json())
        .then(data => {
            if(data.status === "OK") {
                navigate("/questions");
            }
            if(data.status === "NOT OK") {
                setDisplay(true);
            }
        })
    },[navigate]);

    const loadingRetry = () => {
        window.location.reload(false);
    };

    return (
        <div className="loading">
            <div className="loading__circle" id={!display ? "" : "hide"}></div>
            <div className="loading__retry" id={!display ? "hide" : ""}>
                <h1 className="default__title loading__title">oops, something went wrong!</h1>
                <button className="default__button" onClick={loadingRetry}>
                    <span class="material-symbols-outlined">replay</span>
                    try again
                </button>
            </div>
        </div>
    )
}