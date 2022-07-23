const Footer = () => {
  const completedCount = 2;
  return (
    <footer className="flex flex-row justify-evenly">
      <span>Completed: {completedCount}</span>
      <button className="rounded-full bg-red-200 px-2">Clear completed</button>
    </footer>
  );
};

export default Footer;
