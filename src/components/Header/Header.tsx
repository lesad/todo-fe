import AddTodo from "./AddTodo";
import FilterOptions from "./FilterOptions";

const Header = () => (
    <header>
        <h1 className="text-3xl text-center font-bold">TODOS</h1>
        <AddTodo />
        <FilterOptions />
    </header>
);

export default Header;
