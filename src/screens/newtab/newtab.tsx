/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-refresh/only-export-components */
import "@/main.css";
import Clock from "./components/clock";
import Background from "./components/background";
import QuickLinks from "./components/quick-links";
import { useState, useEffect, createContext } from "react";
import { QuickLinkType } from "@/types";

export const linkContext = createContext<{
  links: QuickLinkType[];
  setLinks: (newState: QuickLinkType[]) => void;
} | null>(null);

function SimpleButton({
  label,
  onClick,
}: {
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      className="hover:bg-white/20 p-2 rounded cursor-pointer"
      onClick={onClick}
    >
      {label}
    </button>
  );
}

function NewTab() {
  const [isQuickLinksOpened, setIsQuickLinksOpened] = useState<boolean>(false);
  const [links, setLinks] = useState<QuickLinkType[]>([]);

  useEffect(() => {
    const localss = localStorage.getItem("QuickLinks");
    if (!localss) {
      localStorage.setItem("QuickLinks", JSON.stringify(links));
    }
    const storage = localStorage.getItem("QuickLinks")
      ? localStorage.getItem("QuickLinks")
      : "";
    setLinks(JSON.parse(storage!));
  }, []);

  return (
    <div className="w-screen h-screen">
      <linkContext.Provider value={{ links, setLinks }}>
        <Background />
        <div
          className="h-full text-white flex flex-col justify-between
				items-center"
        >
          <div></div>
          <Clock />
          {isQuickLinksOpened && <QuickLinks />}
          <div className="w-full h-12 px-2 flex justify-between items-center">
            <div className="space-x-4">
              <SimpleButton label="Settings" onClick={() => {}} />
              <SimpleButton
                label="Quick Links"
                onClick={() => setIsQuickLinksOpened((s) => !s)}
              />
            </div>
            <div className="space-x-4">
              <SimpleButton label="Sessions" onClick={() => {}} />
              <SimpleButton label="Todo" onClick={() => {}} />
            </div>
          </div>
        </div>
      </linkContext.Provider>
    </div>
  );
}

export default NewTab;
