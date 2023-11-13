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
                    console.log(data)
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
            <div id="hadeethContent__hadeethDetails"> {hadeethDetails} </div>
        </div>
    )
}

export default Hadeeth;