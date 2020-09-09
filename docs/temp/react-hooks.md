# React Hooks

利用 useState 创建 Redux

``` js
// 这就是 Redux
function useReducer(reducer, initialState) {
  const [state, setState] = useState(initialState);

  function dispatch(action) {
    const nextState = reducer(state, action);
    setState(nextState);
  }

  return [state, dispatch];
}
// 一个 Action
function useTodos() {
  const [todos, dispatch] = useReducer(todosReducer, []);

  function handleAddClick(text) {
    dispatch({ type: "add", text });
  }

  return [todos, { handleAddClick }];
}

// 绑定 Todos 的 UI
function TodosUI() {
  const [todos, actions] = useTodos();
  return (
    <>
      {todos.map((todo, index) => (
        <div>{todo.text}</div>
      ))}
      <button onClick={actions.handleAddClick}>Add Todo</button>
    </>
  );
}
```