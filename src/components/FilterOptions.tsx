import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAnglesDown } from '@fortawesome/free-solid-svg-icons';
import FilterButton from './FilterButton';

const FilterOptions = () => {
  return (
    <section className="flex flex-row justify-between mr-5 my-3">
      <button className="hover:scale-125">
        <FontAwesomeIcon icon={faAnglesDown} />
      </button>
      <FilterButton title="All" />
      <FilterButton title="Active" />
      <FilterButton title="Completed" />
    </section>
  );
};

export default FilterOptions;
