import { useState } from "react";
import classNames from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faCircleCheck as faCircleChecked,
  faClipboardList,
  faPlus
} from "@fortawesome/free-solid-svg-icons";
import { faCircleCheck } from "@fortawesome/free-regular-svg-icons";
import { ITodoItem } from "@/types";
import { Button } from "./Buttons";
import { Container, Header, Title } from "./QuickLayout";
import InputBox from "./InputBox";
import useHotKeys from "@/features/HotKeys";
import useTodoManager from "@/features/TodoManager";

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
  onRemove: (id: string) => void;
  onToggle: (id: string) => void;
  onUpdate: (item: ITodoItem) => void;
}) {
  const [editing, setEditing] = useState(false);
  const [label, setLabel] = useState(item.label);

  useHotKeys(
    e => editing && e.key === "Escape",
    () => setEditing(false),
    [editing]
  );
  useHotKeys(
    e => editing && e.key === "Enter",
    () => save(),
    [editing, label]
  );

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
          <InputBox
            type="text"
            theme="dark"
            value={label}
            onChange={value => setLabel(value)}
            placeholder="HINT: Leave empty to remove"
            autoFocus
            fill
          />
        ) : (
          <p
            className={classNames("cursor-pointer font-bold", {
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

  const add = () => {
    if (!label.length) return;
    onAddRequest(label);
    setLabel("");
  };

  const submitTodoItem = (e: React.FormEvent) => {
    e.preventDefault();
    add();
  };

  return (
    <form className="flex space-x-2" onSubmit={submitTodoItem}>
      <InputBox
        type="text"
        theme="dark"
        value={label}
        onChange={value => setLabel(value)}
        placeholder="What do you want to do next?"
        autoFocus
        fill
      />
      <Button style="primary" type="submit" onClick={add}>
        <FontAwesomeIcon icon={faPlus} size="lg" />
        <span>ADD</span>
      </Button>
    </form>
  );
}

function TodoSection() {
  const {
    todoItems,
    addTodoItem,
    setTodoItem,
    toggleTodoItem,
    removeTodoItem
  } = useTodoManager();

  return (
    <Container itemsAlignment="stretch" className="bg-black/80" fill>
      <Header>
        <FontAwesomeIcon icon={faClipboardList} size="lg" />
        <Title label="Todo List" />
      </Header>
      <ul className="overflow-y-auto flex flex-col p-2 grow">
        {todoItems.map(todo => (
          <TodoItem
            key={todo.id}
            item={todo}
            onToggle={toggleTodoItem}
            onRemove={removeTodoItem}
            onUpdate={item => setTodoItem(item.id, _ => item)}
          />
        ))}
      </ul>
      <div className="p-2">
        <AddTodoItem onAddRequest={addTodoItem} />
      </div>
    </Container>
  );
}

export default TodoSection;
