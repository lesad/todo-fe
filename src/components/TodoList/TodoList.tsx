import { useGetTodosQuery } from '../../redux/apiSlice';
import Spinner from '../Spinner';
import TodoItem from './TodoItem';

const TodoList = () => {
  const { data: todos, isLoading, isSuccess, isError } = useGetTodosQuery();

  if (isLoading) return <Spinner />;
  if (!isSuccess || isError) return <span>Error!</span>;

  return (
    <ul>
      {todos.map((todo) => (
        <TodoItem key={todo.id} {...todo} />
      ))}
    </ul>
  );
};

export default TodoList;
