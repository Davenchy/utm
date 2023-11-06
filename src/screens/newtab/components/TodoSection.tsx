import { useState } from "react";
import classNames from "classnames";
import useHotkeys from "@/shared/hotkeys";
import { useTodoManager } from "../features/todo_manager";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faCircleCheck as faCircleChecked,
  faClipboardList
} from "@fortawesome/free-solid-svg-icons";
import { faCircleCheck } from "@fortawesome/free-regular-svg-icons";
import { ITodoItem } from "@/types";

function DoneComponent({
  state,
  onClick
}: {
  state: boolean;
  onClick: () => void;
}) {
  return (
    <div onClick={onClick} className="cursor-pointer">
      {state ? (
        <FontAwesomeIcon icon={faCircleChecked} size="lg" />
      ) : (
        <FontAwesomeIcon icon={faCircleCheck} size="lg" />
      )}
    </div>
  );
}

function TodoItem({
  item,
  onRemove,
  onToggle,
  onUpdate
}: {
  item: ITodoItem;
  onRemove: (id: number) => void;
  onToggle: (id: number) => void;
  onUpdate: (item: ITodoItem) => void;
}) {
  const [editing, setEditing] = useState(false);
  const [label, setLabel] = useState(item.label);

  useHotkeys((e) => {
    if (!editing) return;
    if (e.key === "Escape") setEditing(false);
    if (e.key === "Enter") save();
  }, [editing, label]);

  const edit = () => {
    setLabel(item.label);
    setEditing(true);
  };

  const save = () => {
    setEditing(false);
    if (label === item.label) return;
    item.label = label;
    if (label.length === 0) onRemove(item.id);
    else onUpdate(item);
  };

  return (
    <li className="flex space-x-2 my-2 items-center">
      <DoneComponent state={item.done} onClick={() => onToggle(item.id)} />
      <div className="grow">
        {editing ? (
          <input
            className="bg-black/70 p-2 rounded w-full outline-none
              hover:bg-black/80 focus:bg-black/80 focus:shadow
              focus:shadow-white/30"
            type="text"
            value={label}
            onChange={e => setLabel(e.target.value)}
            placeholder="hint: Leave empty to remove"
            autoFocus
          />
        ) : (
          <p
            className={classNames("cursor-pointer", {
              "line-through text-gray-400": item.done
            })}
            onClick={edit}
          >
            {item.label}
          </p>
        )}
      </div>
      <button className="text-red-500" onClick={() => onRemove(item.id)}>
        <FontAwesomeIcon icon={faTrash} size="lg" />
      </button>
    </li>
  );
}

function AddTodoItem({
  onAddRequest
}: {
  onAddRequest: (label: string) => void;
}) {
  const [label, setLabel] = useState("");

  const submitTodoItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!label.length) return;
    onAddRequest(label);
    setLabel("");
  };

  return (
    <form className="flex space-x-2" onSubmit={submitTodoItem}>
      <input
        className="bg-black/70 p-2 rounded w-full outline-none
        hover:bg-black/80 focus:bg-black/80 focus:shadow focus:shadow-white/30"
        type="text"
        value={label}
        onChange={e => setLabel(e.target.value)}
        placeholder="What do you want to do next?"
        autoFocus
      />
      <button
        className="text-black font-bold bg-white/70 w-fit px-2 py-1
        rounded hover:bg-white/80 active:bg-white/90 focus:bg-white/80"
        type="submit"
      >
        ADD
      </button>
    </form>
  );
}

function TodoSection() {
  const { items, addTodo, removeTodo, toggleTodo, setTodo } = useTodoManager();

  return (
    <div className="w-full h-full bg-black/50 flex flex-col pb-2">
      <div className="bg-black/80 py-2 flex justify-center items-center space-x-2">
        <FontAwesomeIcon icon={faClipboardList} size="lg" />
        <h1 className="text-2xl font-bold text-center">Todo List</h1>
      </div>
      <ul className="overflow-y-auto flex flex-col p-2 grow">
        {items.map(todo => (
          <TodoItem
            key={todo.id}
            item={todo}
            onRemove={removeTodo}
            onToggle={toggleTodo}
            onUpdate={setTodo}
          />
        ))}
      </ul>
      <div className="px-2">
        <AddTodoItem onAddRequest={addTodo} />
      </div>
    </div>
  );
}

export default TodoSection;
