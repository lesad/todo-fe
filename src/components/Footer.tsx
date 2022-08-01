import { useSelector } from 'react-redux';

import {
  selectCompletedIds,
  useDeleteTodoMutation,
  useGetCompletedTodosQuery,
} from '../redux/apiSlice';

const useGetCompletedCount = () => {
  const { data: completedTodos } = useGetCompletedTodosQuery();
  return completedTodos?.length || 0;
};

const useDeleteCompletedTodos = () => {
  const [deleteTodo] = useDeleteTodoMutation();
  const toDelete = useSelector(selectCompletedIds);
  if (!toDelete) return;

  // TODO: error handling
  return async () => {
    for (const id of toDelete) {
      await deleteTodo(id);
    }
  };
};

const Footer = () => {
  const completedCount = useGetCompletedCount();
  const handleClick = useDeleteCompletedTodos();

  return completedCount ? (
    <footer className="flex flex-row justify-evenly">
      <span>Completed: {completedCount}</span>
      <button className="rounded-full bg-red-200 px-2" onClick={handleClick}>
        Clear completed
      </button>
    </footer>
  ) : (
    <> </>
  );
};

export default Footer;
