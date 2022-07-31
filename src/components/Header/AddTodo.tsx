import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

import { useAddTodoMutation } from '../../redux/apiSlice';

const AddTodo = () => {
  const [text, setText] = useState('');
  const [addTodo] = useAddTodoMutation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setText(e.target.value);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const trimmedText = e.target.value.trim();
    if (e.key === 'Enter' && trimmedText) {
      addTodo(trimmedText);
      setText('');
    }
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (text) {
      addTodo(text);
      setText('');
    }
  };

  return (
    <form className="flex flex-row my-3">
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

export default AddTodo;
