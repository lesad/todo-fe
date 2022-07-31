import AddTodo from './AddTodo';
import FilterOptions from './FilterOptions';

const Header = () => (
  <header>
    <h1 className="text-2xl text-center">TODOS</h1>
    <AddTodo />
    <FilterOptions />
  </header>
);

export default Header;
