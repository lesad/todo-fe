import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

import { useAddTodoMutation } from "../../redux/apiSlice";

export const AddTodo = () => {
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
        <form className="flex flex-row my-3 border-b-2 border-b-black">
            <input
                className="grow focus:outline-none"
                placeholder="Enter new todo"
                value={text}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
            />
            <button type="submit" onClick={handleClick}>
                <FontAwesomeIcon icon={faPlus} />
            </button>
        </form>
    );
};
