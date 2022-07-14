import "./connectivity-screen.css";

export default function ConnectivityScreen() {
    const loadingRetry = () => {
        window.location.reload(false);
    };

    return (
        <div className="connectivity">
            <div className="connectivity__face">
                <span class="material-symbols-outlined">
                    sentiment_neutral
                </span>
            </div>
            <h1 className="default__title">network down, check your connection</h1>
            <button className="default__button" onClick={loadingRetry}>
                <span class="material-symbols-outlined">replay</span>
                try again
            </button>
        </div>
    );
} 