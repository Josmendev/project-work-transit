import { Link } from "react-router";
import { Icon } from "../Icon";
import { Image } from "../Image";
import DropdownUser from "./DropdownUser";

const Header = (props: {
  sidebarOpen: string | boolean | undefined;
  setSidebarOpen: (arg0: boolean) => void;
}) => {
  return (
    <header className="header-main drop-shadow-1">
      <div className="header-container shadow-2">
        <div className="flex items-center gap-2 sm:gap-4 lg:hidden">
          <button
            aria-controls="sidebar"
            onClick={(e) => {
              e.stopPropagation();
              props.setSidebarOpen(!props.sidebarOpen);
            }}
            className="z-10 block p-2"
          >
            <Icon.Menu color="#1C2434" strokeWidth={2} />
          </button>
          <Link className="block flex-shrink-0 lg:hidden" to="/dashboard">
            <Image src="/logo-certisalud.webp" alt="Logo" className="w-[120px] h-[72px]" />
          </Link>
        </div>

        <div className="flex items-center gap-3 2xsm:gap-7">
          <DropdownUser />
        </div>
      </div>
    </header>
  );
};

export default Header;
