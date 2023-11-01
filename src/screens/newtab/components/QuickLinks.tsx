import { useState } from "react";
import { useNewTabSettingsScope } from "../settings-scopes";
import { useOverlayManagerContext } from "@/shared/overlay-system";
import { IQuickLink } from "@/types";
import { v4 as UUID_V4 } from "uuid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash, faPlus } from "@fortawesome/free-solid-svg-icons";

function QuickLinkForm({ link }: { link?: IQuickLink }) {
  const scope = useNewTabSettingsScope();
  const overlayManager = useOverlayManagerContext();
  const [title, setTitle] = useState(link?.title || "");
  const [url, setUrl] = useState(link?.url || "");
  const [icon, setIcon] = useState(link?.icon || "");

  const close = () => overlayManager.close();
  const getIconUrl = (): string => {
    if (icon.length > 7) return icon;
    try {
      const urlObj = new URL(url);
      urlObj.pathname = "/favicon.ico";
      return urlObj.href;
    } catch {
      return "/icons/link.png";
    }
  };

  const save = () => {
    const newQuickLink: IQuickLink = {
      id: UUID_V4(),
      title,
      url,
      icon: getIconUrl()
    };
    if (link)
      scope.quickLinks = scope.quickLinks.map(l =>
        l.id === link.id
          ? newQuickLink
          : l);
    else
      scope.quickLinks = [...scope.quickLinks, newQuickLink];
    close();
  };

  return (
    <div
      className="w-1/2 flex flex-col bg-black/60 backdrop-blur p-4 rounded
      text-white"
    >
      <h1 className="text-xl font-bold text-center m-4">
        {link ? 'Edit' : 'Add'} Quick Link
      </h1>
      <div className="self-center w-12 h-12 flex place-content-center">
        <img alt="icon not found" src={getIconUrl()} />
      </div>
      <label className="flex flex-col gap-y-2 mb-4">
        Title
        <input
          type="text"
          className="text-white rounded px-2 py-1 bg-black/40 backdrop-blur
          outline-none hover:bg-black/80 focus:bg-black/60 focus:shadow
          focus:shadow-black"
          value={title}
          onChange={e => setTitle(e.target.value)}
          autoFocus
        />
      </label>
      <label className="flex flex-col gap-y-2 mb-4">
        URL
        <input
          type="url"
          className="text-white rounded px-2 py-1 bg-black/40 backdrop-blur
          outline-none hover:bg-black/80 focus:bg-black/60 focus:shadow
          focus:shadow-black"
          value={url}
          onChange={e => setUrl(e.target.value)}
        />
      </label>
      <label className="flex flex-col gap-y-2 mb-4">
        Icon URL
        <input
          type="url"
          className="text-white rounded px-2 py-1 bg-black/40 backdrop-blur
          outline-none hover:bg-black/80 focus:bg-black/60 focus:shadow
          focus:shadow-white/20"
          placeholder="optional"
          value={icon}
          onChange={e => setIcon(e.target.value)}
        />
      </label>
      <div className="flex flex-row-reverse gap-x-2 mt-4">
        <button
          className="px-2 py-1 w-fit bg-green-500 text-white font-bold rounded
          hover:bg-green-600 focus:bg-green-700 outline-none"
          onClick={save}
        >
          {link ? 'Save' : 'Add'}
        </button>
        <button
          className="px-2 py-1 w-fit text-red-500 font-bold
          rounded outline-none hover:bg-red-600 hover:text-white
          focus:bg-red-700 focus:text-white"
          onClick={close}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

function AddLink() {
  const manager = useOverlayManagerContext();

  return (
    <div>
      <button
        className="bg-black/20 hover:bg-black/40 w-20 h-20 flex rounded-full
        place-items-center place-content-center m-2"
        onClick={() => manager.open(<QuickLinkForm />)}
      >
        <FontAwesomeIcon icon={faPlus} size="2x" />
      </button>
    </div>
  );
}

function QuickLink({ link }: { link: IQuickLink }) {
  const manager = useOverlayManagerContext();
  const scope = useNewTabSettingsScope();

  const open = () => window.open(link.url, "_blank");
  const remove = () => {
    scope.quickLinks = scope.quickLinks.filter(l => l.id !== link.id);
  };
  const edit = () => {
    manager.open(<QuickLinkForm link={link} />);
  };

  return (
    <div className="group w-20 h-20 overflow-hidden relative m-2">
      <button
        className="hidden hover:bg-black/50 text-white w-6 h-6 rounded-full
        cursor-pointer justify-center items-center bg-black/20 absolute
        group-hover:flex"
        onClick={edit}
      >
        <FontAwesomeIcon icon={faPenToSquare} size="xs" />
      </button>
      <button
        className="hidden hover:bg-black/50 text-white w-6 h-6 rounded-full
        cursor-pointer justify-center items-center bg-black/20 absolute
        bottom-0 right-0 group-hover:flex"
        onClick={remove}
      >
        <FontAwesomeIcon icon={faTrash} size="xs" />
      </button>
      <button
        className="w-full h-full flex flex-col place-items-center bg-black/20
        place-content-center cursor-pointer rounded-full hover:bg-black/40"
        onClick={open}
      >
        <img
          className="h-8 w-8"
          src={link.icon}
          onError={(e: any) => (e.target.src = "/icons/link.png")}
        />
        <span className="text-sm text-center">{link.title}</span>
      </button>
    </div>
  );
}

function QuickLinks() {
  const scope = useNewTabSettingsScope();

  return (
    <div
      className="flex flex-wrap max-w-1/2 max-h-60 overflow-hidden
      overflow-y-auto"
    >
      {scope.quickLinks.map(quickLink => (
        <QuickLink key={quickLink.id} link={quickLink} />
      ))}
      <AddLink />
    </div>
  );
}

export default QuickLinks;
