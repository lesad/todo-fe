import { faAnglesDown } from "@fortawesome/free-solid-svg-icons";
import type { FC } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

import { selectIncompleteIds, useCompleteTodoMutation } from "../../redux/apiSlice";
import { Filter } from "../../redux/filterSlice";
import { Button } from "../Button";
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
        <StyledSection>
            <StyledButton onClick={completeAllTodos} icon={faAnglesDown} />
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

const StyledButton = styled(Button)`
    &:hover {
        transform: scale(1.25);
    }
`;
