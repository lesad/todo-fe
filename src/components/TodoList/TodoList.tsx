import { useSelector } from 'react-redux';

import Todo from '../../types/todo';
import Spinner from '../Spinner';
import TodoItem from './TodoItem';
import { useGetTodosQuery } from '../../redux/apiSlice';
import { Filter, selectFilter } from '../../redux/filterSlice';

const filterTodos = (todos: Todo[], filter: Filter) => {
  switch (filter) {
    case 'Active':
      return todos.filter((todo) => !todo.completed);
    case 'Completed':
      return todos.filter((todo) => todo.completed);
    default: // All
      return todos;
  }
};

const TodoList = () => {
  const { data: todos, isLoading, isSuccess, isError } = useGetTodosQuery();
  const filter = useSelector(selectFilter);

  if (isLoading) return <Spinner />;
  if (!isSuccess || isError) return <span>Error!</span>;

  return (
    <ul>
      {filterTodos(todos, filter).map((todo) => (
        <TodoItem
          key={todo.id}
          id={todo.id}
          value={todo.text}
          isCompleted={todo.completed}
        />
      ))}
    </ul>
  );
};

export default TodoList;
