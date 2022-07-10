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
            <h1>LOADING SCREEN</h1>
            <div className="loading__retry" id={!display ? "hide" : ""}>
                <button className="loading_button" onClick={loadingRetry}>Try again</button>
            </div>
        </div>
    )
}