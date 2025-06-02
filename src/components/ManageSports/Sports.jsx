// import React, { useState, useEffect } from "react";
// import { FaRegEdit, FaTrashAlt } from "react-icons/fa";
// import { FaFutbol } from "react-icons/fa6";
// import LoadingBall from "../global/LoadingBall";
// import { deleteSportsType, getSportsTypes } from "../../Api";

// // Grid View Component
// const GridView = ({ data, isOpen, onClose }) => {
//   return (
//     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ">
//       {data.map((item) => (
//         //  ===========card start==================
//         <div
//           key={item._id}
//           className=" p-2 rounded-lg shadow-sm border border-gray-200 bg-[#f3f4f6]"
//         >
//           <div className="flex justify-between items-start  ">
//             <div className="w-12 h-12 rounded-md flex items-center justify-center bg-[#f3f4f6] border">
//               <FaFutbol className="text-[#00a6e5] text-7xl p-1" />
//             </div>

//             <div className=" ">
//               <h3 className="text-sm font-bold text-center">{item.name}</h3>
//               <div>
//                 <span
//                   className={`text-white px-3 py-1 text-xs rounded-full inline-block mt-1  ${
//                     item.status ? "bg-[#4ade80]" : "bg-[#f87171]"
//                   }`}
//                 >
//                   {item.status ? "Active" : "Inactive"}
//                 </span>
//               </div>
//             </div>

//             <div className="flex flex-col gap-2">
//               <button className="text-blue-500 hover:text-blue-700">
//                 <FaRegEdit className="text-lg" />
//               </button>
//               <button className="text-red-500 hover:text-red-700">
//                 <FaTrashAlt
//                   onClick={() => deleteSportsType(item._id)}
//                   className="text-lg"
//                 />
//               </button>
//             </div>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// // List View Component
// const ListView = ({ data }) => {
//   return (
//     <div className="grid grid-cols-1 gap-4">
//       {data.map((item) => (
//         <div
//           key={item._id}
//           className="bg-[#f3f4f6] border border-gray-200 p-2 rounded-lg shadow-sm flex items-center gap-4"
//         >
//           <div className="w-12 h-12 rounded-md flex items-center justify-center bg-[#f3f4f6] border">
//             <span className="text-[#00a6e5]">
//               <FaFutbol className="text-5xl p-1" />
//             </span>
//           </div>

//           <div className="flex-1">
//             <h3 className="text-sm font-bold pl-2">{item.name}</h3>
//             <span
//               className={`text-white px-3 py-1 text-xs rounded-full inline-block mt-1 ${
//                 item.status ? "bg-[#4ade80]" : "bg-[#f87171]"
//               }`}
//             >
//               {item.status ? "Active" : "Inactive"}
//             </span>
//           </div>

//           <div className="flex gap-3 flex-col">
//             <button className="text-blue-500 hover:text-blue-700">
//               <FaRegEdit className="text-xl" />
//             </button>
//             <button className="text-red-500 hover:text-red-700">
//               <FaTrashAlt
//                 onClick={() => deleteSportsType(item._id)}
//                 className="text-xl"
//               />
//             </button>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// // // Function to handle delete (you can replace with your actual delete function)
// // const handleDelete = (id) => {
// //   console.log(`Delete item with id: ${id}`);
// //   // Implement your delete functionality here
// // };

// // Main Component
// const Sports = ({
//   isGrid = true,
//   searchQuery = "",
//   perPage = 10,
//   isOpen,
//   onClose,
// }) => {
//   const [loading, setLoading] = useState(false);
//   const [data, setData] = useState([]);

//   useEffect(() => {
//     const fetchSports = async () => {
//       setLoading(true);
//       try {
//         const fetchSports = await getSportsTypes();
//         setData(fetchSports?.data);
//         setLoading(false);
//       } catch (error) {
//         console.error("error", error.message);
//         setLoading(false);
//       }
//     };
//     fetchSports();
//   }, []);

//   // Filter data based on search query
//   const filteredData = data
//     .filter((item) =>
//       item.name.toLowerCase().includes(searchQuery.toLowerCase())
//     )
//     .slice(0, perPage);

//   return (
//     <div className="p-2">
//       <div className="flex justify-between items-center mb-4">
//         <h2 className="text-lg font-normal">ALL SPORTS</h2>
//       </div>
//       {loading ? (
//         <LoadingBall />
//       ) : isGrid ? (
//         <GridView data={filteredData} isOpen={isOpen} onClose={onClose} />
//       ) : (
//         <ListView data={filteredData} isOpen={isOpen} onClose={onClose} />
//       )}
//     </div>
//   );
// };

// export default Sports;

import React, { useState, useEffect } from "react";
import { FaRegEdit, FaTrashAlt } from "react-icons/fa";
import { FaFutbol } from "react-icons/fa6";
import LoadingBall from "../global/LoadingBall";
import { deleteSportsType, getSportsTypes } from "../../Api";
import EditSports from "./EditSports";

// Grid View Component
const GridView = ({ data, onEdit }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ">
      {data.map((item) => (
        //  ===========card start==================
        <div
          key={item._id}
          className=" p-2 rounded-lg shadow-sm border border-gray-200 bg-[#f3f4f6]"
        >
          <div className="flex justify-between items-start  ">
            <div className="w-12 h-12 rounded-md flex items-center justify-center bg-[#f3f4f6] border">
              <FaFutbol className="text-[#00a6e5] text-7xl p-1" />
            </div>

            <div className=" ">
              <h3 className="text-sm font-bold text-center">{item.name}</h3>
              <div>
                <span
                  className={`text-white px-3 py-1 text-xs rounded-full inline-block mt-1  ${
                    item.status ? "bg-[#4ade80]" : "bg-[#f87171]"
                  }`}
                >
                  {item.status ? "Active" : "Inactive"}
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <button
                className="text-blue-500 hover:text-blue-700"
                onClick={() => onEdit(item)}
              >
                <FaRegEdit className="text-lg" />
              </button>
              <button className="text-red-500 hover:text-red-700">
                <FaTrashAlt
                  onClick={() => deleteSportsType(item._id)}
                  className="text-lg"
                />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

// List View Component
const ListView = ({ data, onEdit }) => {
  return (
    <div className="grid grid-cols-1 gap-4">
      {data.map((item) => (
        <div
          key={item._id}
          className="bg-[#f3f4f6] border border-gray-200 p-2 rounded-lg shadow-sm flex items-center gap-4"
        >
          <div className="w-12 h-12 rounded-md flex items-center justify-center bg-[#f3f4f6] border">
            <span className="text-[#00a6e5]">
              <FaFutbol className="text-5xl p-1" />
            </span>
          </div>

          <div className="flex-1">
            <h3 className="text-sm font-bold pl-2">{item.name}</h3>
            <span
              className={`text-white px-3 py-1 text-xs rounded-full inline-block mt-1 ${
                item.status ? "bg-[#4ade80]" : "bg-[#f87171]"
              }`}
            >
              {item.status ? "Active" : "Inactive"}
            </span>
          </div>

          <div className="flex gap-3 flex-col">
            <button
              className="text-blue-500 hover:text-blue-700"
              onClick={() => onEdit(item)}
            >
              <FaRegEdit className="text-xl" />
            </button>
            <button className="text-red-500 hover:text-red-700">
              <FaTrashAlt
                onClick={() => deleteSportsType(item._id)}
                className="text-xl"
              />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

// Main Component
const Sports = ({
  isGrid = true,
  searchQuery = "",
  perPage = 10,
  isOpen,
  onClose,
}) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedSport, setSelectedSport] = useState(null);

  useEffect(() => {
    const fetchSports = async () => {
      setLoading(true);
      try {
        const fetchSports = await getSportsTypes();
        setData(fetchSports?.data);
        setLoading(false);
      } catch (error) {
        console.error("error", error.message);
        setLoading(false);
      }
    };
    fetchSports();
  }, []);

  // Handler for opening the edit modal
  const handleEdit = (sport) => {
    setSelectedSport(sport);
    setIsEditModalOpen(true);
  };

  // Handler for closing the edit modal
  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setSelectedSport(null);
  };

  // Filter data based on search query
  const filteredData = data
    .filter((item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .slice(0, perPage);

  return (
    <div className="p-2">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-normal">ALL SPORTS</h2>
      </div>
      {loading ? (
        <LoadingBall />
      ) : isGrid ? (
        <GridView data={filteredData} onEdit={handleEdit} />
      ) : (
        <ListView data={filteredData} onEdit={handleEdit} />
      )}

      {/* Edit Modal */}
      <EditSports
        isOpen={isEditModalOpen}
        onClose={handleCloseEditModal}
        sportData={selectedSport}
      />
    </div>
  );
};

export default Sports;
