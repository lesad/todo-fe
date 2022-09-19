import { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import { useGetTodosQuery } from "../../redux/apiSlice";
import { Filter, selectFilter } from "../../redux/filterSlice";
import type Todo from "../../types/todo";
import { Spinner } from "../Spinner";
import { loadingFinished, loadingStarted } from "./actions";
import { TodoItem } from "./TodoItem";

export const filterTodos = (todos: Todo[], filter: Filter) => {
    switch (filter) {
        case "Active":
            return todos.filter((todo) => !todo.completed);
        case "Completed":
            return todos.filter((todo) => todo.completed);
        default: // All
            return todos;
    }
};

export const TodoList: FC = () => {
    const { data: todos, isLoading, isSuccess, isError } = useGetTodosQuery();
    const filter = useSelector(selectFilter);
    const dispatch = useDispatch();

    useEffect(() => {
        if (isLoading) dispatch(loadingStarted());
        else dispatch(loadingFinished());
    }, [isLoading, dispatch]);

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
