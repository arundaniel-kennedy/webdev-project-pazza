import { ListGroupItem } from "react-bootstrap";

const TodoItem = ({
  todo = { done: true, title: "Buy milk", status: "COMPLETED" },
}) => {
  return (
    <ListGroupItem key={todo.title}>
      <input type="checkbox" className="me-2" defaultChecked={todo.done} id={`todo_item_${todo.title}`} />
      <label htmlFor={`todo_item_${todo.title}`}>{todo.title} ({todo.status})</label>
    </ListGroupItem>
  );
};
export default TodoItem;
