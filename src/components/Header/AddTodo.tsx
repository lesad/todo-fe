import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FC, useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";

import { useAddTodoMutation } from "../../redux/apiSlice";
import { sagaActions } from "../../redux/sagaActions";
import { Button } from "../Button";

export const AddTodo: FC = () => {
    const dispatch = useDispatch();
    const [text, setText] = useState("");
    const [addTodo] = useAddTodoMutation();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => setText(e.target.value);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        const trimmedText = e.currentTarget.value.trim();
        if (e.key === "Enter" && trimmedText) {
            addTodo(trimmedText);
            dispatch({ type: sagaActions.ADD_TODO, payload: text });
            setText("");
        }
    };

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (text) {
            addTodo(text);
            dispatch({ type: sagaActions.ADD_TODO, payload: text });
            setText("");
        }
    };

    return (
        <StyledForm>
            <StyledInput placeholder="Enter new todo" value={text} onChange={handleChange} onKeyDown={handleKeyDown} />
            <Button icon={faPlus} onClick={handleClick} />
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
