import AddTodo from './components/AddTodo';
import FilterOptions from './components/FilterOptions';
import Footer from './components/Footer';
import TodoList from './components/TodoList';

const App = () => {
  return (
    <div className="w-96 my-0 mx-auto">
      <header>
        <h1 className='text-2xl text-center'>TODOS</h1>
        <AddTodo />
      </header>
      <FilterOptions />
      <TodoList />
      <Footer />
    </div>
  );
};

export default App;
