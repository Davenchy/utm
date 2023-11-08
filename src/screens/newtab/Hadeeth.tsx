import { useEffect, useState } from "react";

function Hadeeth() {
    const [hadeeth, setHadeeth] = useState([]);

    useEffect(() => {
        const hadeethNum: number = Math.floor(Math.random() * (1034) + 1);
        const url: string = "https://cdn.jsdelivr.net/gh/fawazahmed0/hadith-api@1/editions/eng-abudawud/"
                            + hadeethNum + ".min.json";

        console.log(hadeethNum);
        fetch(url)
            .then(res => res.json())
            .then(data => {
                console.log(typeof data);
                console.log(data);
                setHadeeth(data['hadiths'][0]['text']);
            })
            .catch(err => console.log(err))
    }, [])

    return (
        <p className="hadeeth-content">{hadeeth}</p>
    )
}

export default Hadeeth;