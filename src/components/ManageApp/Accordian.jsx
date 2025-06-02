import { useState } from "react";
import SettingForms from "./SettingForms";
import { MdOutlineAppSettingsAlt } from "react-icons/md";
import { FaAppStoreIos } from "react-icons/fa";
import { FaApple } from "react-icons/fa";
import { SiGoogleads } from "react-icons/si";
import { MdBlock } from "react-icons/md";
import { MdNotificationsActive } from "react-icons/md";
import { IoLogoAndroid } from "react-icons/io";
import { FaTwitter } from "react-icons/fa";

const Accordion = ({ title, form }) => {
  const getImgComponent = () => {
    if (title === "Notification Settings") {
      return <MdNotificationsActive className="h-8 w-8 " />;
    } else if (title === "App Information") {
      return <FaAppStoreIos className="w-8 h-8" />;
    } else if (title === "Android Settings") {
      return <IoLogoAndroid className="h-8 w-8" />;
    } else if (title === "IOS Settings") {
      return <FaApple className="h-8 w-8" />;
    } else if (title === "Social Links") {
      return <FaTwitter className="h-8 w-8" />;
    }
  };
  const [isOpen, setIsOpen] = useState(false);

  const toggleContent = () => setIsOpen(!isOpen);

  return (
    <div className="accordion shadow-sm ">
      <div
        className={`rounded-md flex justify-between text-base items-center p-2 cursor-pointer bg-[#fafafa] border  hover:rounded-md transition ${
          isOpen ? "text-[#00a6e5]" : "text-black"
        }`}
        onClick={toggleContent}
      >
        <div className="flex gap-5 items-center text-[#00a6e5] ">
          <div>{getImgComponent()}</div>
          <h2 className="font-semibold mt-1 text-black ">{title}</h2>
        </div>
        <span
          className={`text-3xl font-bold icon transition duration-300 ease-in-out transform rotate-0 ${
            isOpen ? "rotate-90" : ""
          }`}
        >
          +
        </span>
      </div>
      {isOpen && (
        <div className="p-3 bg-[#ffffff] rounded-md m-1 border shadow-sm  border-gray-200">
          <SettingForms form={form} />
        </div>
      )}
    </div>
  );
};

export default Accordion;
