import { useEffect, useState } from "react";

function Hadeeth() {
    const [hadeethara, setHadeethara] = useState([]);
    const [hadeetheng, setHadeetheng] = useState([]);
    const [hadeethDetails, setHadeethDetails] = useState("");

    useEffect(() => {
        const hadeethNum: number = Math.floor(Math.random() * (7563) + 1);

        let url: string = "https://cdn.jsdelivr.net/gh/fawazahmed0/hadith-api@1/editions/ara-bukhari/"
            + hadeethNum + ".min.json";

        fetch(url)
            .then(res => res.json())
            .then(data => {
                if (data)
                {
                    setHadeethara(data['hadiths'][0]['text']);
                    setHadeethDetails("Sahih al Bukhari, " + "Book #" + Object.keys(data["metadata"]["section"])[0]
                        + " " + Object.values(data["metadata"]["section"])[0] + ", Hadeeth #" + hadeethNum);
                }
            })
            .catch(err => console.log(err))

        url = "https://cdn.jsdelivr.net/gh/fawazahmed0/hadith-api@1/editions/eng-bukhari/"
            + hadeethNum + ".min.json";

        fetch(url)
            .then(res => res.json())
            .then(data => {
                if (data)
                {
                    setHadeetheng(data['hadiths'][0]['text']);
                }
            })
            .catch(err => console.log(err))

    }, [])

    return (
        <div id="hadeethContent">
            <div id="hadeethContent__text">
                <p id="ara">{hadeethara}</p>
                <p id="eng"> {hadeetheng}</p>
            </div>
            <div id="hadeethContent__hadeethDetails">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="#fff"
                    style={{ float: "left", marginRight: "5px" }}

                >
                    <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 18.5c-4.135 0-7.5-3.365-7.5-7.5S7.865 5.5 12 5.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5zm0-13c-.552 0-1 .448-1 1s.448 1 1 1 1-.448 1-1-.448-1-1-1zm1 9h-2v-6h2v6z" />
                </svg>
                {hadeethDetails} </div>
        </div>
    )
}

export default Hadeeth;