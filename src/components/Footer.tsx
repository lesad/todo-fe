const Footer = () => {
  const completedCount = 2;
  return (
    <footer>
      <span>Completed: {completedCount}</span>
      <button>Clear</button>
    </footer>
  );
};

export default Footer;
