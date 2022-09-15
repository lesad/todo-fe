import styled from "styled-components";

import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { LastAction } from "./components/LastAction";
import { TodoList } from "./components/TodoList";

const App = () => (
    <StyledMain>
        <Header />
        <TodoList />
        <Footer />
        <LastAction />
    </StyledMain>
);

const StyledMain = styled.main`
    width: 24rem;
    margin: 0 auto;
    margin-top: 2rem;
`;

export default App;
