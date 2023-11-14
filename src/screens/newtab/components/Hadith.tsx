import { OpenCloseSystem } from "@/features/OpenCloseSystem";
import { useEffect, useState } from "react";

enum EHadithLanguage {
    ARABIC = "ara-bukhari",
    ENGLISH = "eng-bukhari"
}

const HADITH_BASE_URL =
    "https://cdn.jsdelivr.net/gh/fawazahmed0/hadith-api@1/editions";
const generateHadithURL = (language: EHadithLanguage, num: number) =>
    `${HADITH_BASE_URL}/${language}/${num}.min.json`;
const generateRandomHadithURL = () => {
    const hadithNum: number = Math.floor(Math.random() * 7563 + 1);
    const arabicURL = generateHadithURL(EHadithLanguage.ARABIC, hadithNum);
    const englishURL = generateHadithURL(EHadithLanguage.ENGLISH, hadithNum);
    return { arabicURL, englishURL };
};

interface HadithAPIResult {
    hadiths: { text: string }[];
    metadata: {
        name: string;
        section: { [key: number]: string };
    };
}

interface HadithEntity {
    hadith: string;
    details: string;
}

async function fetchHadithAPI(url: string): Promise<HadithEntity> {
    const response = await fetch(url);
    const data: HadithAPIResult = await response.json();

    const hadith: string = data.hadiths[0].text;
    const sectionNumber = Object.keys(data.metadata.section)[0];
    const details: string = `${data.metadata.name} #${sectionNumber}: \
        ${data.metadata.section[parseInt(sectionNumber)]}`;

    return { hadith, details };
}

function useHadith() {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [hadithArabic, setHadithArabic] = useState("");
    const [hadithEnglish, setHadithEnglish] = useState("");
    const [hadithDetails, setHadithDetails] = useState("");

    const fetch = () => {
        const { arabicURL, englishURL } = generateRandomHadithURL();

        setIsLoading(true);
        Promise.all([fetchHadithAPI(arabicURL), fetchHadithAPI(englishURL)])
            .then(([arabicVersion, englishVersion]) => {
                setHadithArabic(arabicVersion.hadith);
                setHadithEnglish(englishVersion.hadith);
                setHadithDetails(englishVersion.details);
            })
            .finally(() => setIsLoading(false));
    }

    useEffect(() => fetch(), []);

    return { isLoading, hadithArabic, hadithEnglish, hadithDetails, fetch };
}

export function HadithSection() {
    const { isLoading, hadithArabic, hadithEnglish, hadithDetails } = useHadith();

    return !isLoading ? (
        <>
            <div className="flex flex-col place-items-center space-y-2 grow
                overflow-hidden overflow-y-auto">
                <p className="text-right text-lg">{hadithArabic}</p>
                <p className="text-md">{hadithEnglish}</p>
            </div>
            <p className="text-center">{hadithDetails}</p>
        </>
    ) : null;
}

export default function Hadith() {
    return (
        <OpenCloseSystem
            systemId="hadith"
            className="bg-black/70 backdrop-blur max-h-[33%] w-10/12 p-2
            rounded-md space-y-2 flex flex-col place-items-center">
            <HadithSection />
        </OpenCloseSystem>
    );
}
