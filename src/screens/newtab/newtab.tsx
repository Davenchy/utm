import "@/main.css";
import Clock from "./components/clock";
import Background from "./components/background";
import QuickLinks from "./components/quick-links";
import SimpleButton from "./components/simple_button";
import TodoSection from "./components/todo_section";
import { useState } from "react";
import { useTodoManagerContext } from "./features/todo_manager";

function NewTab() {
  const [isQuickLinksOpened, setIsQuickLinksOpened] = useState<boolean>(false);
  const { manager } = useTodoManagerContext();
  const [todoListVisible, setTodoListVisible] = useState(false);

  const handleTodoButtonClick = () => {
    setTodoListVisible(!todoListVisible);
  };

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
        <div
          className="hidden"
          style={{ display: todoListVisible ? "block" : "none" }}
        >
          <div className="absolute flex justify-evenly bg-black/30 w-[22%] h-[88%] right-[0px] bottom-[40px]">
            <TodoSection />
            <button className="addButton absolute w-full text-2xl bottom-[0px] bg-black/80 pb-3 pt-3 hover:text-gray-100/50 h-[8%]" onClick={() => manager.addItem("New Todo")}>
              <span className="border-4 border-current text-2xl mr-2 pb-1">+</span>Add
            </button>
          </div>
        </div>
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
            <SimpleButton label="Todo" onClick={handleTodoButtonClick} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewTab;
