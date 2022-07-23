interface ITodoItemProps {
  id: string;
  text: string;
  isCompleted: boolean;
}

const TodoItem = ({ id, text, isCompleted }: ITodoItemProps) => {
  return (
    <li>
      <input type="checkbox" />
      <label>{text}</label>
      <button>Edit</button>
      <button>Delete</button>
    </li>
  );
};

export default TodoItem;
