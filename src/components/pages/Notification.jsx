import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { IoGrid } from "react-icons/io5";
import { FaList } from "react-icons/fa";
import Location from "../global/Location";
import Portal from "./Portal";
import LoadingBall from "../global/LoadingBall";
import NotificationList from "../Notifications/NotificationList.jsx";
import { deleteAllNotification } from "../../Api.js";

const Notification = () => {
  const [loading, setLoading] = useState(false);
  const [isGrid, setIsGrid] = useState(false);
  const [searchQuery, setSearchQuery] = useState(""); // Add searchQuery state
  const location = useLocation();
  const [perPage, setPerPage] = useState(10);

  const handleGridToggle = (gridValue) => {
    setIsGrid(gridValue);
  };

  return (
    <Portal>
      <div className="flex flex-col min-h-screen bg-[#fafafa] p-3 md:p-6 ">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between p-2 gap-4">
          <Location location={location} />
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <Link to="/admin/notification" className="w-full sm:w-auto">
              <button
                onClick={deleteAllNotification}
                className="w-full sm:w-auto py-2 px-2 text-sm uppercase bg-[#f87272] text-black rounded-md  transition active:scale-95 font-medium"
              >
                DELETE ALL NOTIFICATIONS
              </button>
            </Link>
            <Link
              to="/admin/notification/create-notification"
              className="w-full sm:w-auto"
            >
              <button className="w-full sm:w-auto py-2 px-2 text-sm uppercase bg-[#00a4e6] text-[#d4e2f2] rounded-md hover:bg-[#00a4e9] transition active:scale-95 font-medium">
                Create Notification
              </button>
            </Link>
          </div>
        </div>

        {/* Search and View Controls */}
        <div className="p-2 flex flex-col sm:flex-row justify-between items-center gap-3">
          <input
            type="text"
            className="p-2 text-xs bg-white rounded-md border border-gray-400 w-full sm:w-[160px] focus:outline-none transition-all duration-300 ease-in-out focus:w-full sm:focus:w-[200px] focus:border-transparent focus:ring-2 focus:ring-blue-500"
            placeholder="Search by name or ID"
            onChange={(e) => setSearchQuery(e.target.value.toLowerCase())}
            value={searchQuery}
          />

          <div className="flex gap-2 items-center">
            {/* List View Button */}
            <button
              className="p-1 h-max w-max bg-white"
              onClick={() => handleGridToggle(false)}
            >
              <FaList
                className={`cursor-pointer text-lg ${
                  !isGrid ? "text-blue-500" : "text-black"
                }`}
              />
            </button>

            {/* Grid View Button */}
            <button
              className="p-1 h-max w-max bg-white"
              onClick={() => handleGridToggle(true)}
            >
              <IoGrid
                className={`cursor-pointer text-lg ${
                  isGrid ? "text-blue-500" : "text-black"
                }`}
              />
            </button>

            {/* Page Size Selector */}
            <div className="flex gap-3 items-center">
              <p className="text-sm">Page Size:</p>
              <select
                className="bg-white rounded-md border-2 border-black h-max text-xs text-center pl-2 py-1"
                onChange={(e) =>
                  setPerPage(Number.parseInt(e.target.value, 10))
                }
              >
                {[10, 20, 50, 100, 200].map((size) => (
                  <option key={size} value={size}>
                    {size}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Content Section */}
        {loading ? (
          <div className="mt-3">
            <LoadingBall />
          </div>
        ) : (
          <div className="min-h-screen bg-[#fafafa] p-5 rounded-md ">
            <NotificationList isGrid={isGrid} searchQuery={searchQuery} />
          </div>
        )}
      </div>
    </Portal>
  );
};

export default Notification;
