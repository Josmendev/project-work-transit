import type { CertificateTypeResponse } from "../../../features/register-certificates/type-certificate/types/CertificateType";
import { Icon } from "../Icon";

interface Props {
  label: string;
  options?: Array<CertificateTypeResponse>;
  selectedOption?: CertificateTypeResponse;
  onChange?: (option: CertificateTypeResponse) => void;
}

const SelectGroup: React.FC<Props> = ({ label, options, selectedOption, onChange }) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedData = e.target.selectedOptions[0].dataset.option;
    if (selectedData && onChange) onChange(JSON.parse(selectedData));
  };

  return (
    <div>
      <label className="select-group-label">{label}</label>

      <div className="select-group-container">
        <select
          value={selectedOption?.description ?? ""}
          onChange={handleChange}
          className="select-group relative"
        >
          <option value="" disabled>
            Seleccione una opción
          </option>
          {options?.map(
            (option) =>
              option.isActive && (
                <option
                  key={option.certificateTypeId}
                  value={option.description}
                  data-option={JSON.stringify(option)}
                >
                  {option.description}
                </option>
              )
          )}
        </select>

        <span className="select-group-chevron">
          <Icon.Chevron />
        </span>
      </div>
    </div>
  );
};

export default SelectGroup;
