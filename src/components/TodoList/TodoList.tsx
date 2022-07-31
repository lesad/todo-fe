import { useGetTodosQuery } from '../../redux/apiSlice';
import TodoItem from './TodoItem';

const TodoList = () => {
  const { data: todos, isLoading, isSuccess, isError } = useGetTodosQuery();

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error!</p>;
  if (isSuccess)
    return (
      <ul>
        {todos.map((todo) => (
          <TodoItem key={todo.id} id={todo.id} text={todo.text} completed={todo.completed} />
        ))}
      </ul>
    );
};

export default TodoList;
