import { faAnglesDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { FC } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

import { selectIncompleteIds, useCompleteTodoMutation } from "../../redux/apiSlice";
import { Filter } from "../../redux/filterSlice";
import { FilterButton } from "./FilterButton";

const useCompleteAllTodos = () => {
    const [completeTodo] = useCompleteTodoMutation();
    const toComplete = useSelector(selectIncompleteIds);

    return async () => {
        if (!toComplete) return;
        const promises = toComplete.map((id) => completeTodo(id));
        await Promise.all(promises);
    };
};

export const FilterOptions: FC = () => {
    const completeAllTodos = useCompleteAllTodos();

    return (
        <StyledSection className="flex flex-row justify-between mx-2 my-3">
            <StyledButton type="button" className="hover:scale-125" onClick={completeAllTodos}>
                <FontAwesomeIcon icon={faAnglesDown} />
            </StyledButton>
            <FilterButton title={Filter.All} />
            <FilterButton title={Filter.Active} />
            <FilterButton title={Filter.Completed} />
        </StyledSection>
    );
};

const StyledSection = styled.section`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin: 1rem 2rem;
`;

const StyledButton = styled.button`
    &:hover {
        transform: scale(1.25);
    }
`;
