import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAnglesDown } from '@fortawesome/free-solid-svg-icons';

import {
  selectIncompleteIds,
  useCompleteTodoMutation,
} from '../../redux/apiSlice';

import FilterButton from './FilterButton';
import { useSelector } from 'react-redux';

const useCompleteAllTodos = () => {
  const [completeTodo] = useCompleteTodoMutation();
  const toComplete = useSelector(selectIncompleteIds);

  return async () => {
    if (!toComplete) return;

    // TODO error handling
    for (const id of toComplete) {
      await completeTodo(id);
    }
  };
};

const FilterOptions = () => {
  const completeAllTodos = useCompleteAllTodos();

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
