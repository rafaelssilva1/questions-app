import "./share-screen.css";
import { useEffect } from "react";
 
export default function ShareScreen({closeShare}) {
    const url = window.location.href;
    let destinationEmail = "";

    const closeShareBtn = () => {
        closeShare(false);
    };

    const shareQuestion = (e) => {
        //e.preventDefault();
        
    };

    return (
        <div className="share">
            <h2 className="share__title">Share this question!</h2>
            <form className="share__form" onSubmit={shareQuestion} action={`/share?destination_email=${destinationEmail}&content_url=${url}`}>
                <input type="email" name="destination_email" id="share__email" placeholder="Destination email..."></input>
                <input type="hidden" name="content_url" id="share__url" value={url}></input>
                <input type="submit" value="Share!"></input>
            </form>
            <div>
                <span className="question__close material-symbols-outlined" onClick={closeShareBtn}>close</span>
            </div>
        </div>
    )
}