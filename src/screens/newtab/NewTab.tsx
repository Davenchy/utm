/**
 * Renders the New Tab screen with a clock, a hadith box, quick links, settings and a todo section.
 * Allows the user to open and close the todo section and settings dialog.
 * @returns NewTab :JSX.Element
 */
import "@/main.css";
import Clock from "./components/Clock";
import Hadith from "./components/Hadith";
import Background from "./components/Background";
import { Button } from "./components/Buttons";
import QuickLinks from "./components/QuickLinks";
import TodoSection from "./components/TodoSection";
import {
  OpenCloseSystem,
  useOpenCloseSystem
} from "@/features/OpenCloseSystem";
import { SettingsDialog } from "./components/Settings";

function NewTab() {
  const todoDialogSystem = useOpenCloseSystem("todoDialog");
  const settingsDialogSystem = useOpenCloseSystem("settings");
  // const sessionsDialogSystem = useOpenCloseSystem("sessions");

  return (
    <div className="w-screen h-screen overflow-hidden">
      <Background />
      <div
        className="h-full text-white flex flex-col justify-between
				items-center"
      >
        <div></div>
        <Clock />
        <Hadith />
        <QuickLinks />
        <OpenCloseSystem
          systemId="todoDialog"
          className="w-96 h-3/4 absolute right-2 bottom-12"
        >
          <TodoSection />
        </OpenCloseSystem>
        <OpenCloseSystem
          systemId="settings"
          className="w-8/12 h-3/4 absolute left-2 bottom-12"
        >
          <SettingsDialog />
        </OpenCloseSystem>
        <div className="w-full h-12 px-2 flex justify-between items-center">
          <Button
            label="Settings"
            style="label"
            onClick={() => { }}
            openCloseSystem={settingsDialogSystem}
          />
          <div className="space-x-4">
            {/* <Button */}
            {/*   label="Sessions" */}
            {/*   style="label" */}
            {/*   onClick={() => {}} */}
            {/*   openCloseSystem={sessionsDialogSystem} */}
            {/* /> */}
            <Button
              label="Todo"
              style="label"
              onClick={() => { }}
              openCloseSystem={todoDialogSystem}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewTab;
