import { faPen, faRemove } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface ITodoItemProps {
  id: string;
  text: string;
  isCompleted: boolean;
}

const TodoItem = ({ id, text, isCompleted }: ITodoItemProps) => {
  return (
    <li className="flex flex-row py-2">
      <input className="mr-2" type="checkbox" checked={isCompleted}/>
      <label className="truncate">{text}</label>
      <button className="px-1 ml-auto">
        <FontAwesomeIcon icon={faPen} />
      </button>
      <button className="px-1">
        <FontAwesomeIcon icon={faRemove} />
      </button>
    </li>
  );
};

export default TodoItem;
