import { faPen, faRemove } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useReducer, useState } from "react";

import { useCompleteTodoMutation, useDeleteTodoMutation, useIncompleteTodoMutation, useUpdateTodoMutation } from "../../redux/apiSlice";

interface TodoItemProps {
    id: string;
    value: string;
    isCompleted: boolean;
}

const TodoItem = ({ id, value, isCompleted }: TodoItemProps) => {
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
        const trimmedText = e.target.value.trim();
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
        <li className="flex flex-row py-2 hover:bg-gray-100 px-2 group">
            <input className="mr-2" type="checkbox" checked={isCompleted} onChange={handleCheckboxChange} />
            {isEditable ? (
                <input type="text" value={text} onKeyDown={handleKeyDown} onChange={handleInputChange} onBlur={toggleEdit} />
            ) : (
                <span className="truncate" onDoubleClick={toggleEdit}>
                    {text}
                </span>
            )}
            <button className="px-1 ml-auto hidden group-hover:block" onClick={handleRenameClick}>
                <FontAwesomeIcon icon={faPen} />
            </button>
            <button className="px-1 hidden group-hover:block" onClick={() => deleteTodo(id)}>
                <FontAwesomeIcon icon={faRemove} />
            </button>
        </li>
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
