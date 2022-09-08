import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { TodoList } from "./components/TodoList";

const App = () => (
    <main className="w-96 mt-5 mx-auto">
        <Header />
        <TodoList />
        <Footer />
    </main>
);

export default App;
