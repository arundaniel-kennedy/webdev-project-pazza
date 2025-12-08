import { ListGroup } from "react-bootstrap";
import TodoForm from "./TodoForm";
import TodoItem from "./TodoItem";
import { useSelector } from "react-redux";

export default function TodoList() {
  const { todos } = useSelector((state: { todosReducer: { todos: [] } }) => state.todosReducer);

  return (
    <div>
      <h2>Todo List</h2>
      <ListGroup>
        <TodoForm />
        {todos.map((todo, index) => (
          <TodoItem todo={todo} key={index} />
        ))}
      </ListGroup>
      <hr />
    </div>
  );
}
