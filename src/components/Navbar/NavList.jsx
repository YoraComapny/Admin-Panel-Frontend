import { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { MdSpaceDashboard, MdLiveTv, MdContactPage } from "react-icons/md";
import { FaCalendarWeek, FaAppStoreIos } from "react-icons/fa";
import { FaNewspaper } from "react-icons/fa6";
import { MdNotificationsActive } from "react-icons/md";
import { IoOptionsSharp, IoSettings, IoTrophySharp } from "react-icons/io5";
import { IoIosArrowDown } from "react-icons/io";
import { MdHorizontalRule } from "react-icons/md";
import "../styles/navlist.css";
import { CgScreen } from "react-icons/cg";
import { MdContacts } from "react-icons/md";
import { BiSolidVideoRecording } from "react-icons/bi";
import { MdAddPhotoAlternate } from "react-icons/md";

const NavList = () => {
  const location = useLocation();
  const [hoveredItem, setHoveredItem] = useState(null);
  const [openSubSection, setOpenSubSection] = useState(() => {
    // Initialize state from localStorage
    const savedState = localStorage.getItem("openSubSection");
    return savedState ? JSON.parse(savedState) : null;
  });

  const itemList = [
    {
      name: "Dashboard",
      icon: <MdSpaceDashboard />,
      path: "/admin/dashboard",
    },
    {
      name: "Manage Live",
      icon: <CgScreen />,
      path: "/admin/manage-live",
    },
    {
      name: "Manage Apps",
      icon: <FaAppStoreIos />,
      path: "/admin/manage-apps",
    },
    {
      name: "Fixtures",
      icon: <FaCalendarWeek />,
      path: "/admin/fixtures",
    },
    {
      name: "Selected Leagues",
      icon: <IoTrophySharp />,
      path: "/admin/selected-leagues",
    },
    {
      name: "Highlights",
      icon: <BiSolidVideoRecording />,
      path: "/admin/highlights",
    },
    {
      name: "News",
      icon: <FaNewspaper />,
      path: "/admin/news",
    },
    {
      name: "Contact Us",
      icon: <MdContacts />,
      path: "/admin/contact-us",
    },
    {
      name: "Notifications",
      icon: <MdNotificationsActive />,
      path: "/admin/notifications",
    },
    {
      name: "Types",
      icon: <IoOptionsSharp />,
      path: "",
      subSection: [
        {
          name: "Ads",
          icon: <MdHorizontalRule />,
          path: "/admin/types/adds",
        },
        {
          name: "Sports",
          icon: <MdHorizontalRule />,
          path: "/admin/types/sports",
        },
        {
          name: "Leagues",
          icon: <MdHorizontalRule />,
          path: "/admin/types/leagues",
        },
      ],
    },
    {
      name: "Administration",
      icon: <IoSettings />,
      path: "/admin/administration",
    },
    {
      name: "Status",
      icon: <MdAddPhotoAlternate />,
      path: "/admin/upload-status",
    },
  ];

  const handleItemClick = (index) => {
    if (openSubSection === index) {
      setOpenSubSection(null);
      localStorage.removeItem("openSubSection"); // Remove from localStorage when closing
    } else {
      setOpenSubSection(index);
      localStorage.setItem("openSubSection", JSON.stringify(index)); // Save to localStorage when opening
    }
  };

  // Sync state with localStorage on component mount
  useEffect(() => {
    const savedState = localStorage.getItem("openSubSection");
    if (savedState) {
      setOpenSubSection(JSON.parse(savedState));
    }
  }, []);

  return (
    <div className="m-1 p-4 flex flex-col gap-2 h-[100%] ">
      {itemList.map((item, index) => (
        <div key={index}>
          <NavLink
            to={item.subSection ? "#" : item.path}
            className={`flex justify-between items-center gap-3 p-1 h-9 text-[#868b92] text-start transition-all hover:bg-[#ebebeb] rounded-md ${
              location.pathname === item.path ? "bg-[#ebebeb]" : ""
            }`}
            onMouseEnter={() => setHoveredItem(index)}
            onMouseLeave={() => setHoveredItem(null)}
          >
            <div className="flex items-center gap-2">
              <div
                className={`text-xl  ${
                  hoveredItem === index || location.pathname === item.path
                    ? "text-[#00a6e5]"
                    : ""
                }`}
              >
                {item.icon}
              </div>
              <p
                className={`text-xs font-semibold ${
                  location.pathname === item.path
                    ? "text-[#00a6e5]"
                    : "text-gray-800"
                }`}
              >
                {item.name}
              </p>
            </div>
            {item.subSection && (
              <div onClick={() => handleItemClick(index)}>
                <IoIosArrowDown className="hover:text-black transition-colors" />
              </div>
            )}
          </NavLink>

          {openSubSection === index && (
            <div className="transition-all ml-2 p-2">
              {item.subSection.map((subItem, subIndex) => (
                <NavLink
                  to={subItem.path}
                  key={subIndex}
                  className={`flex items-center gap-2 p-1 h-10 text-gray-600 text-start transition-all hover:bg-[#ebebeb] rounded-md ${
                    location.pathname === subItem.path ? "bg-[#ebebeb]" : ""
                  }`}
                >
                  <div className="text-xl">{subItem.icon}</div>
                  <p
                    className={`text-xs font-semibold ${
                      location.pathname === subItem.path
                        ? "text-[#00a6e5]"
                        : "text-gray-800"
                    }`}
                  >
                    {subItem.name}
                  </p>
                </NavLink>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default NavList;
