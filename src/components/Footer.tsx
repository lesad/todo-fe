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
    <footer className="flex flex-row justify-evenly border-t-2 border-black pt-2">
      <span>Completed: {completedCount}</span>
      <button
        className="border-2 border-black rounded-full hover:bg-red-200 px-2"
        onClick={handleClick}
      >
        Clear completed
      </button>
    </footer>
  ) : (
    <> </>
  );
};

export default Footer;
