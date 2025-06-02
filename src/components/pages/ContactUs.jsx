import { useState } from "react";
import { useLocation } from "react-router-dom";
import { IoGrid } from "react-icons/io5";
import { FaList } from "react-icons/fa";
import Location from "../global/Location";
import Portal from "./Portal";

const ContactUs = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [perPage, setPerPage] = useState(10);
  const [loading, setLoading] = useState(false);
  const [isGrid, setIsGrid] = useState(false);
  const location = useLocation();

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value.toLowerCase());
  };

  const handleGrid = (gridValue) => {
    setIsGrid(gridValue);
  };

  return (
    <Portal>
      <div className="flex flex-col min-h-screen bg-[#fafafa] p-3 md:p-6">
        <div className="flex flex-col md:flex-row justify-between p-2 gap-4">
          <Location location={location} />
        </div>

        <div className="p-2 flex flex-col sm:flex-row justify-between items-center gap-3">
          <input
            type="text"
            className="p-2 text-sm bg-white rounded-md border border-gray-300 w-full sm:w-[160px] focus:outline-none transition-all duration-300 ease-in-out focus:w-full sm:focus:w-[200px] focus:border-transparent focus:ring-2 focus:ring-blue-500"
            placeholder="Search by name or ID"
            value={searchQuery}
            onChange={handleSearchChange}
          />

          <div className="flex gap-2 items-center">
            {/* List view */}
            <div className="p-1 h-max w-max bg-white rounded-md shadow-sm">
              <FaList
                className={`cursor-pointer text-lg ${
                  !isGrid ? "text-blue-500" : "text-gray-500"
                }`}
                onClick={() => handleGrid(false)}
              />
            </div>

            {/* Grid view */}
            <div className="p-1 h-max w-max bg-white rounded-md shadow-sm">
              <IoGrid
                className={`cursor-pointer text-lg ${
                  isGrid ? "text-blue-500" : "text-gray-500"
                }`}
                onClick={() => handleGrid(true)}
              />
            </div>

            <div className="flex gap-3 items-center">
              <p className="text-sm font-medium">Page Size:</p>
              <select
                className="bg-white rounded-md border border-gray-300 h-max text-sm text-center pl-2 py-1"
                value={perPage}
                onChange={(e) =>
                  setPerPage(Number.parseInt(e.target.value, 10))
                }
              >
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="50">50</option>
                <option value="100">100</option>
                <option value="200">200</option>
              </select>
            </div>
          </div>
        </div>

        <h3 className="text-lg font-bold m-3">Contact List</h3>

        {/* Placeholder for MatchList or other content */}
        <div className="w-[95%] h-[200px] flex justify-center items-center mx-auto rounded-md bg-gray-200 shadow-md">
          <p className="text-center text-gray-600 font-semibold">
            No content here yet...
          </p>
        </div>
      </div>
    </Portal>
  );
};

export default ContactUs;
