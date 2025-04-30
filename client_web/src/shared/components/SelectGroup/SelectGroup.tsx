import { Icon } from "../Icon";

interface Props<T> {
  label: string;
  options?: T[];
  selectedOption?: T;
  onChange?: (option: T) => void;
  getLabel: (option: T) => string;
  getKey?: (option: T, index: number) => string | number;
}

const SelectGroup = <T,>({
  label,
  options = [],
  selectedOption,
  onChange,
  getLabel,
  getKey,
}: Props<T>) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedData = e.target.selectedOptions[0].dataset.option;
    if (selectedData && onChange) {
      onChange(JSON.parse(selectedData));
    }
  };

  return (
    <div>
      <label className="select-group-label">{label}</label>

      <div className="select-group-container">
        <select
          value={selectedOption ? getLabel(selectedOption) : ""}
          onChange={handleChange}
          className="select-group relative"
        >
          <option value="" disabled>
            Seleccione una opción
          </option>
          {options.map((option, idx) => (
            <option
              key={getKey ? getKey(option, idx) : idx}
              value={getLabel(option)}
              data-option={JSON.stringify(option)}
            >
              {getLabel(option)}
            </option>
          ))}
        </select>

        <span className="select-group-chevron">
          <Icon.Chevron />
        </span>
      </div>
    </div>
  );
};

export default SelectGroup;
