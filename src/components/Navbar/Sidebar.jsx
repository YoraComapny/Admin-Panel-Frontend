import NavList from "./NavList";
import { FaRegArrowAltCircleLeft } from "react-icons/fa";
import Football from "../../assets/ball-football-icon.svg";
import football from "../../assets/logo.png";
import { MdOutlineKeyboardDoubleArrowLeft } from "react-icons/md";

const Sidebar = ({ isOpen, onClose }) => {
  return (
    <div
      className={` shadow-md h-[100%] transition-width duration-200   ${
        isOpen ? "w-[200px]" : "w-[0]"
      }`}
    >
      <div
        className={`flex justify-between p-1  items-center   ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        } transition-opacity`}
      >
        <img
          className=" mt-2 w-[148px] h-[19px] text-white text-xl flex justify-end items-center m-1 cursor-pointer shadow-sm p-[0.125rem] "
          src={football}
          alt="sports-dashboard"
        />
        <MdOutlineKeyboardDoubleArrowLeft
          className="text-3xl p-1 m-1 hover:text-gray-500 transition-colors cursor-pointer mt-2"
          onClick={onClose}
        />
      </div>
      <div
        className={`text-[19px]   ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        } transition-opacity`}
      >
        <NavList />
      </div>
    </div>
  );
};

export default Sidebar;
