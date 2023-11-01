import { useTodoManager } from "../features/todo_manager";

function TodoSection() {
  const { items, removeTodo } = useTodoManager();

  return (
    <div className="w-full overflow-auto">
      <h1 className="text-2xl text-center h-[5%] bg-black/80 w-full">
        Todo List
      </h1>
      <ul className="h-[87%] w-full overflow-auto">
        {items.map((todo) => (
          <li
            className="w-full bg-black/50 p-[10px] border-t border-l border-r border-gray-100/50 border-4 flex flex-wrap items-center justify-between"
            key={todo.id}
          >
            <input type="checkbox" className="w-[10%] inline mr-2 ml-1 pt-[5px] peer h-4 w-4"/>
            <div className="w-[80%] inline peer-checked:line-through">{`${todo.title} - ${todo.id}`}</div>
            <div className="w-[10%] inline">
              <button onClick={() => removeTodo(todo.id)}><svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="25" height="25" viewBox="0,0,256,256"><g fill="#ff0000" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none"><g transform="scale(8.53333,8.53333)"><path d="M13,3c-0.26757,-0.00363 -0.52543,0.10012 -0.71593,0.28805c-0.1905,0.18793 -0.29774,0.44436 -0.29774,0.71195h-5.98633c-0.36064,-0.0051 -0.69608,0.18438 -0.87789,0.49587c-0.18181,0.3115 -0.18181,0.69676 0,1.00825c0.18181,0.3115 0.51725,0.50097 0.87789,0.49587h18c0.36064,0.0051 0.69608,-0.18438 0.87789,-0.49587c0.18181,-0.3115 0.18181,-0.69676 0,-1.00825c-0.18181,-0.3115 -0.51725,-0.50097 -0.87789,-0.49587h-5.98633c0,-0.26759 -0.10724,-0.52403 -0.29774,-0.71195c-0.1905,-0.18793 -0.44836,-0.29168 -0.71593,-0.28805zM6,8v16c0,1.105 0.895,2 2,2h14c1.105,0 2,-0.895 2,-2v-16z"></path></g></g></svg></button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoSection;
