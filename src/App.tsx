import Footer from "./components/Footer";
import Header from "./components/Header";
import TodoList from "./components/TodoList";

const App = () => (
    <main className="w-96 mt-5 mx-auto">
        <Header />
        <TodoList />
        <Footer />
    </main>
);

const StyledMain = styled.main`
    width: 24rem;
    margin: 0 auto;
    margin-top: 2rem;
`;

export default App;
