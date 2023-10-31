/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useContext } from "react";
import { linkContext } from "../NewTab";

function AddLink() {
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [promptVisible, setPromptVisible] = useState(false);
  const links = useContext(linkContext);

  const handleAddButtonClick = (event: any) => {
    event.stopPropagation();
    setPromptVisible(!promptVisible);
  };

  const handleSaveClick = (event: any) => {
    event.stopPropagation();
    event.target.closest(".addPrompt").style.display = "none";
    const icoLink = new URL(url);
    icoLink.pathname = "/favicon.ico";
    const newl = links?.links;
    newl?.push({ title: `${name}`, url: `${url}`, icon: `${icoLink}` });
    links?.setLinks(newl!);
    setName("");
    setUrl("");
    localStorage.setItem("QuickLinks", JSON.stringify(links?.links));
  };

  const handleCancelClick = (event: any) => {
    event.stopPropagation();
    setName("");
    setUrl("");
    event.target.closest(".addPrompt").style.display = "none";
  };

  return (
    <div>
      <button
        className="hover:bg-black/10 w-16 h-16 flex content-center justify-center rounded relative"
        onClick={handleAddButtonClick}
      >
        <span className="text-5xl">+</span>
      </button>
      <div
        className="addPrompt absolute w-full h-full flex flex-wrap items-center content-center rounded bg-gray-700 top-0 right-0"
        style={{ display: promptVisible ? "flex" : "none" }}
      >
        <label className="block m-4 w-[5%]" htmlFor="">
          Name
        </label>
        <input
          className="block w-[80%] m-4 text-black"
          type="text"
          placeholder="Name"
          onChange={(e) => setName(e.target.value)}
        />
        <label className="block m-4 w-[5%]" htmlFor="">
          URL
        </label>
        <input
          className="block w-[80%] m-4 text-black"
          type="text"
          placeholder="URL"
          onChange={(e) => setUrl(e.target.value)}
        />
        <br />
        <button
          className="block m-4 p-5 self-center hover:bg-gray-900"
          onClick={handleSaveClick}
        >
          Save
        </button>
        <button
          className="block m-4 p-4 self-center hover:bg-gray-900"
          onClick={handleCancelClick}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

function QuickLink({
  title,
  icon,
  onClick,
}: {
  title: string;
  icon: string;
  onClick: () => void;
}) {
  const [optionsVisible, setOptionsVisible] = useState(false);

  const handleOptionsButtonClick = (event: any) => {
    event.stopPropagation();
    setOptionsVisible(!optionsVisible);
  };

  const handleOutsideClick = (event: any) => {
    if (event.target !== event.currentTarget) {
      setOptionsVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  const handleOptionsClick = (event: any) => {
    event.stopPropagation();
    event.preventDefault();
    event.target.closest(".options").style.display = "none";
  };

  const handleDeleteClick = (event: any) => {
    event.stopPropagation();
    event.preventDefault();
    event.target.closest(".group").remove();
  };

  return (
    <button
      onClick={onClick}
      className="group hover:bg-black/10 w-16 h-16 overflow-hidden p-2 m-2
			flex flex-col place-items-center justify-around rounded relative"
    >
      <button
        className="optionsButton hover:bg-black/50 p-1 absolute top-[-7px] right-[0px] hidden group-hover:block"
        onClick={handleOptionsButtonClick}
      >
        ...
      </button>
      <div
        className="options absolute bg-gray-700 flex flex-wrap justify-evenly h-auto w-3/4 top-[0] right-[0] hidden"
        onClick={handleOptionsClick}
        style={{ display: optionsVisible ? "block" : "none" }}
      >
        <button className="p-1 hover:bg-gray-900 w-full">edit</button>
        <button
          className="p-1 hover:bg-gray-900 w-full"
          onClick={handleDeleteClick}
        >
          delete
        </button>
      </div>
      <img src={icon} className="h-8 w-8 bg-cover" />
      <span className="text-sm text-center">{title}</span>
    </button>
  );
}

function QuickLinks() {
  const links = useContext(linkContext);

  return (
    <div
      className="bg-white/20 rounded-xl shadow shadow-white/50 w-1/2
			text-white overflow-hidden p-4 h-full max-h-60 flex flex-wrap
		 	items-center justify-start overflow-x-hidden overflow-y-auto relative"
    >
      {links?.links.map((val) => (
        <QuickLink
          title={`${val.title}`}
          icon={`${val.icon}`}
          onClick={() => window.open(val.url)}
        />
      ))}
      <AddLink />
    </div>
  );
}

export default QuickLinks;
