import "./share-screen.css";
 
export default function ShareScreen({closeShare}) {

    const closeShareBtn = () => {
        closeShare(false);
    };

    const shareQuestion = (e) => {
        e.preventDefault();

        const urlString = window.location.href;
        const emailString = document.getElementById("share__email").value;

        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: emailString, url: urlString})
        };

        fetch(`https://private-bbbe9-blissrecruitmentapi.apiary-mock.com/share?destination_email=${emailString}&content_url=${urlString}`, requestOptions)
            .then(response => response.json())
            .then(data => data);

        
    };

    return (
        <div className="share">
            <h2 className="default__title">Share this question!</h2>
            <form className="share__form" onSubmit={shareQuestion}>
                <input type="email" name="share__email" id="share__email" placeholder="Destination email..."></input>
                <input type="submit" value="Share!" id="share__submit"></input>
            </form>
            <div>
                <span className="question__close material-symbols-outlined" onClick={closeShareBtn}>close</span>
            </div>
        </div>
    )
}