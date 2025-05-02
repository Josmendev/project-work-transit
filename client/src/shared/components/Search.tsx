import { useState } from "react";
import { Button } from "./Button/Button";
import { Icon } from "./Icon";

interface Props {
  id: string;
  name: string;
  placeholder?: string;
  className?: string;
  onSearch?: (query: string) => void;
}

export const Search: React.FC<Props> = ({
  id,
  name,
  placeholder = "Buscar ...",
  className = "",
  onSearch = () => {},
}) => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className={`w-80 -mt-3 mb-5 relative ml-auto ${className}`}>
      <input
        type="text"
        id={id}
        name={name}
        className="w-full bg-shades-light border border-neutral-200 rounded-md p-2.5"
        placeholder={placeholder}
        value={searchQuery}
        onChange={(e) => {
          setSearchQuery(e.target.value);
          onSearch(e.target.value);
        }}
      />
      <Button
        title="Buscar"
        id="btnSearchUser"
        type="submit"
        classButton="pointer-events-none absolute top-1/2 right-0 -translate-y-1/2 px-3.5"
        iconRight={<Icon.Search color="#9ca3af" size={20} />}
      />
    </div>
  );
};
