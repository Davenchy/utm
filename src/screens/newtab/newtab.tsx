import "@/main.css";
import Clock from "./components/clock";
import Background from "./components/background";
import QuickLinks from "./components/quick-links";
import SimpleButton from "./components/simple_button";
import TodoSection from "./components/todo_section";
import { useState } from "react";
import classNames from "classnames";

function NewTab() {
  const [isQuickLinksOpened, setIsQuickLinksOpened] = useState<boolean>(false);
  const [todoListVisible, setTodoListVisible] = useState(false);

  return (
    <div className="w-screen h-screen">
      <Background />
      <div
        className="h-full text-white flex flex-col justify-between
				items-center"
      >
        <div></div>
        <Clock />
        {isQuickLinksOpened && <QuickLinks />}
        <div className={classNames(
          "w-96 h-3/4 absolute right-0 bottom-12",
          {
            "hidden": !todoListVisible
          }
        )}>
          <TodoSection />
        </div>
        <div className="w-full h-12 px-2 flex justify-between items-center">
          <div className="space-x-4">
            <SimpleButton label="Settings" onClick={() => { }} />
            <SimpleButton
              label="Quick Links"
              onClick={() => setIsQuickLinksOpened((s) => !s)}
            />
          </div>
          <div className="space-x-4">
            <SimpleButton label="Sessions" onClick={() => { }} />
            <SimpleButton label="Todo" onClick={
              () => setTodoListVisible((s) => !s)
            } />
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewTab;
