import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FC, useState } from "react";
import styled from "styled-components";

import { useAddTodoMutation } from "../../redux/apiSlice";

export const AddTodo: FC = () => {
    const [text, setText] = useState("");
    const [addTodo] = useAddTodoMutation();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => setText(e.target.value);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        const trimmedText = e.currentTarget.value.trim();
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
        <StyledForm className="flex flex-row my-3 border-b-2 border-b-black">
            <StyledInput
                className="grow focus:outline-none"
                placeholder="Enter new todo"
                value={text}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
            />
            <button type="submit" onClick={handleClick}>
                <FontAwesomeIcon icon={faPlus} />
            </button>
        </StyledForm>
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
