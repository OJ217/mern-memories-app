/** @format */

import logoText from "../../images/logo-text.png";
import logoIllustration from "../../images/logo-illustration.png";
import { Link, useLocation } from "react-router-dom";

export function MainHeader() {
  const location = useLocation();

  return (
    <header className="p-4 rounded-xl bg-white shadow-md flex flex-col items-center justify-center space-y-4">
      {/* Logo container */}
      <div className="flex items-end gap-4">
        <Link to={"/"}>
          <img src={logoText} alt="" className="h-10" />
        </Link>
        <Link to={"/"}>
          <img src={logoIllustration} alt="" className="w-10 h-10" />
        </Link>
      </div>
      {location.pathname !== "/create-memory" && (
        <Link to={"/create-memory"}>
          <button
            type="button"
            className="block p-2 rounded-md bg-[#2FAAD5] font-medium w-full text-2xl text-white"
          >
            Create new memory
          </button>
        </Link>
      )}
    </header>
  );
}
