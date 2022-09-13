import type { FC } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

import { useGetTodosQuery } from "../../redux/apiSlice";
import { Filter, selectFilter } from "../../redux/filterSlice";
import type Todo from "../../types/todo";
import { Spinner } from "../Spinner";
import { TodoItem } from "./TodoItem";

export const filterTodos = (todos: Todo[], filter: Filter) => {
    switch (filter) {
        case Filter.Active:
            return todos.filter((todo) => !todo.completed);
        case Filter.Completed:
            return todos.filter((todo) => todo.completed);
        default: // Filter.All
            return todos;
    }
};

export const TodoList: FC = () => {
    const { data: todos, isLoading, isSuccess, isError } = useGetTodosQuery();
    const filter = useSelector(selectFilter);

    if (isLoading) return <Spinner />;
    if (!isSuccess || isError) return <span>Error!</span>;

    return (
        <StyledUl>
            {filterTodos(todos, filter).map((todo) => (
                <TodoItem key={todo.id} id={todo.id} value={todo.text} isCompleted={todo.completed} />
            ))}
        </StyledUl>
    );
};

const StyledUl = styled.ul`
    border-top: 2px solid black;
`;
