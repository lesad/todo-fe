import { faPen, faRemove } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FC, useReducer, useState } from "react";
import styled from "styled-components";

import { useCompleteTodoMutation, useDeleteTodoMutation, useIncompleteTodoMutation, useUpdateTodoMutation } from "../../redux/apiSlice";

interface TodoItemProps {
    id: string;
    value: string;
    isCompleted: boolean;
}

export const TodoItem: FC<TodoItemProps> = ({ id, value, isCompleted }) => {
    const [text, setText] = useState<string>(value);
    const [isEditable, toggleEdit] = useReducer((state) => !state, false);

    const [completeTodo] = useCompleteTodoMutation();
    const [incompleteTodo] = useIncompleteTodoMutation();
    const [updateTodo] = useUpdateTodoMutation();
    const [deleteTodo] = useDeleteTodoMutation();

    const handleCheckboxChange = () => {
        if (isCompleted) incompleteTodo(id);
        else completeTodo(id);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => setText(e.target.value);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        const trimmedText = e.currentTarget.value.trim();
        if (e.key === "Enter" && trimmedText) {
            updateTodo({ id, text: trimmedText });
            toggleEdit();
        }
    };

    const handleRenameClick = () => {
        if (text !== value) updateTodo({ id, text });
        toggleEdit();
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
            <StyledButton type="button" onClick={handleRenameClick}>
                <FontAwesomeIcon icon={faPen} />
            </StyledButton>
            <StyledButton type="button" onClick={() => deleteTodo(id)}>
                <FontAwesomeIcon icon={faRemove} />
            </StyledButton>
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

const StyledButton = styled.button`
    padding: 0 0.5rem;
    display: none;

    &:nth-last-child(2) {
        margin-left: auto;
    }
`;

const StyledListItem = styled.li`
    display: flex;
    flex-direction: row;
    padding: 0.8rem 0;

    &:hover {
        background-color: #fffddb;
    }

    &:hover ${StyledButton} {
        display: block;
    }
`;
