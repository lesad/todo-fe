import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faRemove } from '@fortawesome/free-solid-svg-icons';
import React, { useReducer, useState } from 'react';

import {
  useCompleteTodoMutation,
  useDeleteTodoMutation,
  useIncompleteTodoMutation,
  useUpdateTodoMutation,
} from '../../redux/apiSlice';

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setText(e.target.value);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const trimmedText = e.target.value.trim();
    if (e.key === 'Enter' && trimmedText) {
      updateTodo({ id, text: trimmedText });
      toggleEdit();
    }
  };

  const handleRenameClick = () => {
    if (text !== value) updateTodo({ id, text: text });
    toggleEdit();
  };

  return (
    <li className="flex flex-row py-2 hover:bg-gray-100 px-2 group">
      <input
        className="mr-2"
        type="checkbox"
        checked={isCompleted}
        onChange={handleCheckboxChange}
      />
      {isEditable ? (
        <input
          type="text"
          value={text}
          onKeyDown={handleKeyDown}
          onChange={handleInputChange}
          onBlur={toggleEdit}
        />
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

export default TodoItem;
