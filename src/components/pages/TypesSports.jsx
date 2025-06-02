import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { IoGrid } from "react-icons/io5";
import { FaList } from "react-icons/fa";
import Location from "../global/Location";
import Portal from "./Portal";
import LoadingBall from "../global/LoadingBall";
import Sports from "../ManageSports/Sports";
import CreateSports from "../ManageSports/CreateSports";

const TypesSports = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [perPage, setPerPage] = useState(10);
  const [loading, setLoading] = useState(false);
  const [isGrid, setIsGrid] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const location = useLocation();

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value.toLowerCase());
  };

  const handleGrid = (gridValue) => {
    setIsGrid(gridValue);
  };

  const handleSubmit = (data) => {
    console.log("Submitted data:", data);
  };

  return (
    <Portal>
      <div className="flex flex-col min-h-screen bg-[#fafafa] p-3 md:p-6">
        <div className="flex flex-col md:flex-row justify-between p-2 gap-4">
          <Location location={location} />
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <button
              onClick={() => setIsModalOpen(true)}
              className="w-full sm:w-auto py-1 px-4 text-sm uppercase bg-[#00a4e6] text-[#d4e2f2] rounded-sm hover:bg-[#00a4e9] transition active:scale-95 font-normal"
            >
              CREATE SPORTS TYPE
            </button>
          </div>
        </div>

        <div className="p-2 flex flex-col sm:flex-row justify-between items-center gap-3">
          <input
            type="text"
            className="p-2 text-xs bg-white rounded-md border border-gray-400 w-full sm:w-[160px]
             focus:outline-none transition-all duration-300 ease-in-out focus:w-full sm:focus:w-[200px]
             focus:border-transparent focus:ring-2 focus:ring-blue-500"
            placeholder="Search by name"
            value={searchQuery}
            onChange={handleSearchChange}
          />

          <div className="flex gap-2 items-center">
            <div
              className="p-1 h-max w-max bg-[#fff] cursor-pointer"
              onClick={() => handleGrid(true)}
            >
              <IoGrid
                className={`text-lg ${isGrid ? "text-blue-500" : "text-black"}`}
              />
            </div>
            <div
              className="p-1 h-max w-max bg-[#fff] cursor-pointer"
              onClick={() => handleGrid(false)}
            >
              <FaList
                className={`text-lg ${
                  !isGrid ? "text-blue-500" : "text-black"
                }`}
              />
            </div>
            <div className="flex gap-3 items-center">
              <p className="text-sm">Page Size: </p>
              <select
                className="bg-white rounded-md border-2 border-black h-max text-xs text-center pl-2 py-1"
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

        <CreateSports
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleSubmit}
        />

        {loading ? (
          <div className="mt-3">
            <LoadingBall />
          </div>
        ) : (
          <Sports
            isGrid={isGrid}
            searchQuery={searchQuery}
            perPage={perPage}
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onSubmit={handleSubmit}
          />
        )}
      </div>
    </Portal>
  );
};

export default TypesSports;
