interface Props {
  id: string;
  name?: string;
  labelText?: string;
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Checkbox: React.FC<Props> = ({
  id,
  name,
  labelText,
  checked,
  defaultChecked,
  onChange,
}) => {
  return (
    <div className="relative">
      <input
        type="checkbox"
        id={id}
        name={name}
        checked={checked}
        defaultChecked={defaultChecked}
        onChange={onChange}
        aria-checked={checked}
        className="!hidden cbx-input"
      />
      <label htmlFor={id} className="cbx-label"></label>
      <span className="cbx-text">{labelText}</span>
    </div>
  );
};
