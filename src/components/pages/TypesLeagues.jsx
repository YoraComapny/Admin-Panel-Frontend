// import { useEffect, useState, useCallback } from "react";
// import { Link, Outlet, useLocation } from "react-router-dom";
// import { IoGrid } from "react-icons/io5";
// import { FaList } from "react-icons/fa";
// import { toast } from "react-toastify";
// import Location from "../global/Location";
// import Portal from "./Portal";
// import LoadingBall from "../global/LoadingBall";
// import Leag from "../ManageLeagues/Leag";

// const TypesLeagues = () => {
//   const [searchQuery, setSearchQuery] = useState("");
//   const [perPage, setPerPage] = useState(10);
//   const [loading, setLoading] = useState(false);
//   const [isGrid, setIsGrid] = useState(false);
//   const location = useLocation();

//   const handleSearchChange = (event) => {
//     setSearchQuery(event.target.value.toLowerCase());
//   };

//   const handleGrid = (gridValue) => {
//     setIsGrid(gridValue);
//   };

//   return (
//     <Portal>
//       <div className="flex flex-col min-h-screen bg-gray-100 p-3 md:p-6">
//         <div className="flex flex-col md:flex-row justify-between p-2 gap-4">
//           <Location location={location} />
//           <div className="flex flex-col sm:flex-row items-center gap-3 ">
//             <Link to="/admin/types/leagues/create-leagues">
//               <button className="w-full sm:w-auto py-1 px-4 text-sm uppercase bg-[#00a4e6] text-[#d4e2f2] rounded-sm hover:bg-[#00a4e9] transition active:scale-95 font-normal">
//                 + Create League
//               </button>
//             </Link>
//           </div>
//         </div>

//         <div className="p-2 flex flex-col sm:flex-row justify-between items-center gap-3">
//           <input
//             type="text"
//             className="p-2 text-xs bg-white rounded-md border border-gray-400 w-full sm:w-[160px]
//              focus:outline-none transition-all duration-300 ease-in-out focus:w-full sm:focus:w-[200px]
//              focus:border-transparent focus:ring-2 focus:ring-blue-500"
//             placeholder="Search by name or ID"
//             value={searchQuery}
//             onChange={handleSearchChange}
//           />

//           <div className="flex gap-2 items-center">
//             <div className="p-1 h-max w-max bg-gray-100 rounded-md">
//               <IoGrid
//                 className={`cursor-pointer text-lg ${
//                   isGrid ? "text-blue-500" : "text-black"
//                 }`}
//                 onClick={() => handleGrid(true)}
//               />
//             </div>
//             <div className="p-1 h-max w-max bg-[#fff]">
//               <FaList
//                 className={`cursor-pointer text-lg ${
//                   !isGrid ? "text-blue-500" : "text-black"
//                 }`}
//                 onClick={() => handleGrid(false)}
//               />
//             </div>
//             <div className="flex gap-3 items-center">
//               <p className="text-sm">Page Size: </p>
//               <select
//                 className="bg-white rounded-md border-2 border-black h-max text-xs text-center pl-2 py-1"
//                 value={perPage}
//                 onChange={(e) =>
//                   setPerPage(Number.parseInt(e.target.value, 10))
//                 }
//               >
//                 <option value="10">10</option>
//                 <option value="20">20</option>
//                 <option value="50">50</option>
//                 <option value="100">100</option>
//                 <option value="200">200</option>
//               </select>
//             </div>
//           </div>
//         </div>
//         {loading ? (
//           <div className="mt-3">
//             <LoadingBall />
//           </div>
//         ) : (
//           <Leag />
//         )}
//       </div>
//     </Portal>
//   );
// };

// export default TypesLeagues;

import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { IoGrid } from "react-icons/io5";
import { FaList } from "react-icons/fa";
import { toast } from "react-toastify";
import Location from "../global/Location";
import Portal from "./Portal";
import LoadingBall from "../global/LoadingBall";
import Leag from "../ManageLeagues/Leag";

const TypesLeagues = () => {
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
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <Link to="/admin/types/leagues/create-leagues">
              <button className="w-full sm:w-auto py-1 px-4 text-sm uppercase bg-[#00a4e6] text-[#d4e2f2] rounded-sm hover:bg-[#00a4e9] transition active:scale-95 font-normal">
                + Create League
              </button>
            </Link>
          </div>
        </div>

        <div className="p-2 flex flex-col sm:flex-row justify-between items-center gap-3">
          <input
            type="text"
            className="p-2 text-xs bg-white rounded-md border border-gray-400 w-full sm:w-[160px] 
             focus:outline-none transition-all duration-300 ease-in-out focus:w-full sm:focus:w-[200px]
             focus:border-transparent focus:ring-2 focus:ring-blue-500"
            placeholder="Search by name or ID"
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
        {loading ? (
          <div className="mt-3">
            <LoadingBall />
          </div>
        ) : (
          <Leag isGrid={isGrid} searchQuery={searchQuery} perPage={perPage} />
        )}
      </div>
    </Portal>
  );
};

export default TypesLeagues;
