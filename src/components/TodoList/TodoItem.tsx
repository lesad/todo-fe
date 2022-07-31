import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faRemove } from '@fortawesome/free-solid-svg-icons';
import { useReducer, useState } from 'react';

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
  const [textState, setTextState] = useState<string>(text);
  const [isCompleted, toggleCompleted] = useReducer(
    (state) => !state,
    completed
  );

  const [completeTodo] = useCompleteTodoMutation();
  const [incompleteTodo] = useIncompleteTodoMutation();
  const [updateTodo] = useUpdateTodoMutation();
  const [deleteTodo] = useDeleteTodoMutation();

  const onCheckClick = () => {
    if (isCompleted) incompleteTodo(id);
    else completeTodo(id);
    toggleCompleted();
  };

  const onRenameClick = () => {
    updateTodo({id, text: textState});
  };

  const onDeleteClick = () => {
    console.log(`Deleting todo ${text} with id ${id}`);
    // deleteTodo(id);
  };

  return (
    <li className="flex flex-row py-2">
      <input
        className="mr-2"
        type="checkbox"
        checked={isCompleted}
        onChange={onCheckClick}
      />
      <label className="truncate">{text}</label>
      <button className="px-1 ml-auto" onClick={onRenameClick}>
        <FontAwesomeIcon icon={faPen} />
      </button>
      <button className="px-1" onClick={onDeleteClick}>
        <FontAwesomeIcon icon={faRemove} />
      </button>
    </li>
  );
};

export default TodoItem;
