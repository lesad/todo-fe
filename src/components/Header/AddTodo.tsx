import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

const AddTodo = () => {
  return (
    <form className="flex flex-row my-3">
      <input className="grow focus:outline-none" placeholder="New todo" />
      <button>
        <FontAwesomeIcon icon={faPlus} />
      </button>
    </form>
  );
};

export default AddTodo;
