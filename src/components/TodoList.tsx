import useGetTodos from '../mock';
import TodoItem from './TodoItem';

const TodoList = () => {
  const todos = useGetTodos();

  return (
    <ul>
      {todos.map((t) => (
        <TodoItem
          key={t.id}
          id={t.id}
          text={t.text}
          isCompleted={t.completed}
        />
      ))}
    </ul>
  );
};

export default TodoList;
