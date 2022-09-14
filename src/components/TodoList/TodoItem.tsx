import { faPen, faRemove } from "@fortawesome/free-solid-svg-icons";
import { FC, useReducer, useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";

import { useCompleteTodoMutation, useDeleteTodoMutation, useIncompleteTodoMutation, useUpdateTodoMutation } from "../../redux/apiSlice";
import { sagaActions } from "../../redux/sagaActions";
import { Button } from "../Button";

interface TodoItemProps {
    id: string;
    value: string;
    isCompleted: boolean;
}

export const TodoItem: FC<TodoItemProps> = ({ id, value, isCompleted }) => {
    const dispatch = useDispatch();
    const [text, setText] = useState<string>(value);
    const [isEditable, toggleEdit] = useReducer((state) => !state, false);

    const [completeTodo] = useCompleteTodoMutation();
    const [incompleteTodo] = useIncompleteTodoMutation();
    const [updateTodo] = useUpdateTodoMutation();
    const [deleteTodo] = useDeleteTodoMutation();

    const handleCheckboxChange = () => {
        if (isCompleted) incompleteTodo(id);
        else completeTodo(id);
        dispatch({ type: sagaActions.TOGGLE_TODO });
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => setText(e.target.value);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        const trimmedText = e.currentTarget.value.trim();
        if (e.key === "Enter" && trimmedText) {
            updateTodo({ id, text: trimmedText });
            toggleEdit();
            dispatch({ type: sagaActions.UPDATE_TODO });
        }
    };

    const handleRenameClick = () => {
        if (text !== value) {
            updateTodo({ id, text });
            dispatch({ type: sagaActions.UPDATE_TODO });
        }
        toggleEdit();
    };

    const handleDeleteClick = () => {
        deleteTodo(id);
        dispatch({ type: sagaActions.DELETE_TODO });
    };

    return (
        <StyledListItem>
            <StyledCheckbox type="checkbox" checked={isCompleted} onChange={handleCheckboxChange} />
            {isEditable ? (
                <StyledInput
                    type="text"
                    value={text}
                    onKeyDown={handleKeyDown}
                    onChange={handleInputChange}
                    onBlur={toggleEdit}
                    // TODO: unify events
                    onMouseLeave={toggleEdit}
                />
            ) : (
                <StyledSpan onDoubleClick={toggleEdit}>{text}</StyledSpan>
            )}
            <StyledButton onClick={handleRenameClick} icon={faPen} />
            <StyledButton onClick={handleDeleteClick} icon={faRemove} />
        </StyledListItem>
    );
};

const StyledCheckbox = styled.input`
    margin-right: 1rem;
`;

// TODO: hidden spacing makes this jump
const StyledInput = styled.input`
    border: 0;
    outline: 0;
    background-color: #fffddb;
`;

const StyledSpan = styled.span`
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`;

const StyledButton = styled(Button)`
    padding: 0 0.5rem;
    display: none;

    &:nth-last-child(2) {
        margin-left: auto;
    }
`;

const StyledListItem = styled.li`
    display: flex;
    flex-direction: row;
    margin: 0.8rem 0;
    height: 2rem;

    &:hover {
        background-color: #fffddb;
    }

    &:hover ${StyledButton} {
        display: block;
    }
`;
