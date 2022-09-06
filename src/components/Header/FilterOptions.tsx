import { faAnglesDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector } from "react-redux";

import { selectIncompleteIds, useCompleteTodoMutation } from "../../redux/apiSlice";
import FilterButton from "./FilterButton";

const useCompleteAllTodos = () => {
    const [completeTodo] = useCompleteTodoMutation();
    const toComplete = useSelector(selectIncompleteIds);

    return async () => {
        if (!toComplete) return;

        for (const id of toComplete) {
            await completeTodo(id);
        }
    };
};

const FilterOptions = () => {
    const completeAllTodos = useCompleteAllTodos();

    return (
        <section className="flex flex-row justify-between mx-2 my-3">
            <button className="hover:scale-125" onClick={completeAllTodos}>
                <FontAwesomeIcon icon={faAnglesDown} />
            </button>
            <FilterButton title="All" />
            <FilterButton title="Active" />
            <FilterButton title="Completed" />
        </section>
    );
};

const StyledSection = styled.section`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin: 1rem 2rem;
`;

const StyledButton = styled(Button)`
    &:hover {
        transform: scale(1.25);
    }
`;
