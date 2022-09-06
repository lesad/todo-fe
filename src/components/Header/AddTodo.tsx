import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";

import { useAddTodoMutation } from "../../redux/apiSlice";

const AddTodo = () => {
    const [text, setText] = useState("");
    const [addTodo] = useAddTodoMutation();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => setText(e.target.value);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        const trimmedText = e.target.value.trim();
        if (e.key === "Enter" && trimmedText) {
            addTodo(trimmedText);
            setText("");
        }
    };

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (text) {
            addTodo(text);
            setText("");
        }
    };

    return (
        <form className="flex flex-row my-3 border-b-2 border-b-black">
            <input
                className="grow focus:outline-none"
                placeholder="Enter new todo"
                autoFocus
                value={text}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
            />
            <button onClick={handleClick}>
                <FontAwesomeIcon icon={faPlus} />
            </button>
        </form>
    );
};

const StyledForm = styled.form`
    display: flex;
    flex-direction: row;
    margin: 0.75rem 0;
    border-bottom: 2px solid black;
`;

const StyledInput = styled.input`
    flex-grow: 1;
    border: none;
    &:focus {
        outline: none;
    }
`;
