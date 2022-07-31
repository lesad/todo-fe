import { useGetCompletedTodosQuery } from '../redux/apiSlice';

const Footer = () => {
  const {
    data: completedTodos,
    isSuccess,
    isError,
  } = useGetCompletedTodosQuery();

  if (isError || !isSuccess) return <p>No data</p>;

  const completedCount = completedTodos.length;

  return (
    <footer className="flex flex-row justify-evenly">
      <span>Completed: {completedCount}</span>
      <button className="rounded-full bg-red-200 px-2">Clear completed</button>
    </footer>
  );
};

export default Footer;
