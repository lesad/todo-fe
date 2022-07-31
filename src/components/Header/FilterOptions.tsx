import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAnglesDown } from '@fortawesome/free-solid-svg-icons';

import { useCompleteTodoMutation, useGetTodosQuery } from '../../redux/apiSlice';
import FilterButton from './FilterButton';

const FilterOptions = () => {
  const { data: todos, isSuccess, refetch } = useGetTodosQuery();
  const [completeTodo] = useCompleteTodoMutation();

  const completeAllTodos = () => {
    if (isSuccess)
      todos.forEach((todo) => {
        if (!todo.completed) completeTodo(todo.id);
      });
    refetch();
  };

  return (
    <section className="flex flex-row justify-between mr-5 my-3">
      <button className="hover:scale-125" onClick={completeAllTodos}>
        <FontAwesomeIcon icon={faAnglesDown} />
      </button>
      <FilterButton title="All" />
      <FilterButton title="Active" />
      <FilterButton title="Completed" />
    </section>
  );
};

export default FilterOptions;
