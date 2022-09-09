import type { FC } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

import { selectCompletedIds, useDeleteTodoMutation, useGetCompletedTodosQuery } from "../redux/apiSlice";

const useGetCompletedCount = () => {
    const { data: completedTodos } = useGetCompletedTodosQuery();
    return completedTodos?.length || 0;
};

const useDeleteCompletedTodos = () => {
    const [deleteTodo] = useDeleteTodoMutation();
    const toDelete = useSelector(selectCompletedIds);

    return async () => {
        if (!toDelete) return;
        const promises = toDelete.map((id) => deleteTodo(id));
        await Promise.all(promises);
    };
};

export const Footer: FC = () => {
    const completedCount = useGetCompletedCount();
    const handleClick = useDeleteCompletedTodos();

    return completedCount ? (
        <StyledFooter>
            <span>Completed: {completedCount}</span>
            <StyledButton type="button" onClick={handleClick}>
                Clear completed
            </StyledButton>
        </StyledFooter>
    ) : null;
};

const StyledFooter = styled.footer`
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    border-top: 2px solid black;
    padding-top: 1rem;
`;

const StyledButton = styled.button`
    border: 2px solid black;
    border-radius: 9999px;
    padding: 0 1rem;
    &:hover {
        background-color: #f52c16;
    }
`;
