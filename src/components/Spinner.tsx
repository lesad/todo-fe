import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Spinner = () => (
  <div className='flex justify-center my-2'>
    <button type="button" className="rounded items-center" disabled>
      <FontAwesomeIcon icon={faSpinner} className="animate-spin mr-2" />
      Loading todos...
    </button>
  </div>
);

export default Spinner;
