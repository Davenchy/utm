import { OpenCloseSystem } from "@/features/OpenCloseSystem";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons"

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

// The Hadith API returns a JSON object with the following structure:
interface HadithAPIResult {
    hadiths: { text: string }[];
    metadata: {
        name: string;
        section: { [key: number]: string };
    };
}

// The HadithEntity is the data structure that is used to store the Hadith text.
interface HadithEntity {
    hadith: string;
    details: string;
}

/**
 * Fetches a Hadith from the Hadith API.
 * @param url The URL to fetch the Hadith from.
 * @returns Promise<HadithEntity>
 */
async function fetchHadithAPI(url: string): Promise<HadithEntity> {
    const response = await fetch(url);
    const data: HadithAPIResult = await response.json();

    const hadith: string = data.hadiths[0].text;
    const sectionNumber = Object.keys(data.metadata.section)[0];
    const details: string = `${data.metadata.name} #${sectionNumber}: \
        ${data.metadata.section[parseInt(sectionNumber)]}`;

    return { hadith, details };
}

// The useHadith hook fetches a random Hadith from the Hadith API.
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

// The HadithSection component displays the Hadith text and its details.
export function HadithSection() {
    const { isLoading, hadithArabic, hadithEnglish, hadithDetails } = useHadith();

    return !isLoading ? (
        <>
            <div className="flex flex-col place-items-center space-y-2 grow
                overflow-hidden overflow-y-auto px-2">
                <p className="text-right text-lg font-[AmiriQuran-Regular]">
                    {hadithArabic}
                </p>
                <p className="text-md">{hadithEnglish}</p>
            </div>
            <p className="text-center">
                <FontAwesomeIcon icon={faInfoCircle} className="mx-2" />
                {hadithDetails}
            </p>
        </>
    ) : null;
}

/**
 * Renders a section displaying a random Hadith in Arabic and English, along with its details.
 * @returns JSX.Element
 */
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
