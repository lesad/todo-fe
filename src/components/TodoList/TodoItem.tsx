import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faRemove } from '@fortawesome/free-solid-svg-icons';
import React, { useReducer, useState } from 'react';

import {
  useCompleteTodoMutation,
  useDeleteTodoMutation,
  useIncompleteTodoMutation,
  useUpdateTodoMutation,
} from '../../redux/apiSlice';

interface ITodoItemProps {
  id: string;
  text: string;
  completed: boolean;
}

const TodoItem = ({ id, text, completed }: ITodoItemProps) => {
  const [content, setContent] = useState<string>(text);
  const [isEditable, toggleEdit] = useReducer((state) => !state, false);

  const [completeTodo] = useCompleteTodoMutation();
  const [incompleteTodo] = useIncompleteTodoMutation();
  const [updateTodo] = useUpdateTodoMutation();
  const [deleteTodo] = useDeleteTodoMutation();

  const handleCheckboxChange = () => {
    if (completed) incompleteTodo(id);
    else completeTodo(id);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setContent(e.target.value);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const trimmedText = e.target.value.trim();
    if (e.key === 'Enter' && trimmedText) {
      updateTodo({ id, text: trimmedText });
      toggleEdit();
    }
  };

  const handleRenameClick = () => {
    if (content !== text) updateTodo({ id, text: content });
  };

  return (
    <li className="flex flex-row py-2">
      <input
        className="mr-2"
        type="checkbox"
        checked={completed}
        onChange={handleCheckboxChange}
      />
      {isEditable ? (
        <input
          type="text"
          value={content}
          onKeyDown={handleKeyDown}
          onChange={handleInputChange}
          onBlur={toggleEdit}
        />
      ) : (
        <span className="truncate" onDoubleClick={toggleEdit}>
          {content}
        </span>
      )}
      <button className="px-1 ml-auto" onClick={handleRenameClick}>
        <FontAwesomeIcon icon={faPen} />
      </button>
      <button className="px-1" onClick={() => deleteTodo(id)}>
        <FontAwesomeIcon icon={faRemove} />
      </button>
    </li>
  );
};

export default TodoItem;
