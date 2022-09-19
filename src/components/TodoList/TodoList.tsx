import type { FC } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

import { useGetTodosQuery } from "../../redux/apiSlice";
import { selectFilter } from "../../redux/filterSlice";
import type Todo from "../../types/todo";
import { Spinner } from "../Spinner";
import { loadingFinished, loadingStarted } from "./actions";
import { filterTodos } from "./filterTodo";
import { TodoItem } from "./TodoItem";

export const TodoList: FC = () => {
    const { data: todos, isLoading, isSuccess, isError } = useGetTodosQuery();
    const filter = useSelector(selectFilter);

    if (isLoading) return <Spinner />;
    if (!isSuccess || isError) return <span>Error!</span>;

    return (
        <StyledUl>
            {filterTodos(todos, filter).map((todo: Todo) => (
                <TodoItem key={todo.id} id={todo.id} value={todo.text} isCompleted={todo.completed} />
            ))}
        </StyledUl>
    );
};

const StyledUl = styled.ul`
    border-top: 2px solid black;
`;
