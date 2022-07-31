interface IFilterButtonProps {
  title: string;
}

const FilterButton = ({ title }: IFilterButtonProps) => {
  return (
    <button className="border-black border-2 rounded-full px-2 hover:bg-blue-200">
      {title}
    </button>
  );
};

export default FilterButton;
