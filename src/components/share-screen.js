import "./share-screen.css";
import { useState } from "react";
 
export default function ShareScreen({closeShare, styles}) {
    const [shared, setShared] = useState(false);

    const closeShareBtn = () => {
        closeShare(false);
    };

    const shareQuestion = (e) => {
        e.preventDefault();

        const urlString = window.location.href;
        const emailString = document.getElementById("share__email").value;

        if(emailString) {
            const requestOptions = {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: emailString, url: urlString})
            };
    
            fetch(`https://private-bbbe9-blissrecruitmentapi.apiary-mock.com/share?destination_email=${emailString}&content_url=${urlString}`, requestOptions)
                .then(response => response.json())
                .then(data => data);
                
            document.querySelector(".share__form").reset();
            setShared(true);

            setTimeout(() => {
                closeShare(false);
                setShared(false);
            }, 1500);
        }
    };

    return (
        <div className="share" id={styles ? "inverted" : ""}>
            <h2 className="default__title">{styles ? "Share this search!" : "Share this question!"}</h2>
            <form className="share__form" onSubmit={shareQuestion}>
                <input type="email" name="share__email" id="share__email" placeholder="Destination email..."></input>
                <input type="submit" value="Share!" id={styles ? "invertedBtn" : "share__submit"}></input>
            </form>
            {shared &&
                <div>
                    <p className="share__success">Shared successfully!</p>
                </div>
            }
            <div>
                <span className="question__close material-symbols-outlined" onClick={closeShareBtn}>close</span>
            </div>
        </div>
    )
}