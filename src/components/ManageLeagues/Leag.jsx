// import { FaRegEdit, FaTrashAlt } from "react-icons/fa";
// import { FaImage } from "react-icons/fa6";

// const leagueData = [
//   {
//     id: 1,
//     name: "Serie A",
//     status: "In-active",
//   },
//   {
//     id: 2,
//     name: "Friendlies",
//     status: "In-active",
//   },
//   {
//     id: 3,
//     name: "La Liga",
//     status: "In-active",
//   },
//   // You can add more leagues as needed
// ];

// const Leag = () => {
//   return (
//     <div className="p-2">
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//         {leagueData.map((league) => (
//           <div
//             key={league.id}
//             className="bg-white border border-gray-200 rounded-lg shadow-sm"
//           >
//             <div className="p-4 flex items-center gap-4">
//               <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
//                 <FaImage className="text-gray-500 text-2xl" />
//               </div>

//               <div className="flex-1">
//                 <h3 className="text-lg font-medium">{league.name}</h3>
//                 <div className="mt-1">
//                   <span className="bg-red-400 text-white px-3 py-1 text-xs rounded-full">
//                     {league.status}
//                   </span>
//                 </div>
//               </div>

//               <div className="flex flex-col gap-3">
//                 <button className="text-blue-500 hover:text-blue-700">
//                   <FaRegEdit className="text-xl" />
//                 </button>
//                 <button className="text-red-500 hover:text-red-700">
//                   <FaTrashAlt className="text-xl" />
//                 </button>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Leag;

import { FaRegEdit, FaTrashAlt } from "react-icons/fa";
import { FaImage } from "react-icons/fa6";
import { getLeaguesTypes } from "../../Api";
import { useEffect } from "react";

const leagueData = [
  {
    id: 1,
    name: "Serie A",
    status: "In-active",
  },
  {
    id: 2,
    name: "Friendlies",
    status: "In-active",
  },
  {
    id: 3,
    name: "La Liga",
    status: "In-active",
  },
  // You can add more leagues as needed
];

// Grid View Component
const GridView = ({ data }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {data.map((league) => (
        <div
          key={league.id}
          className="bg-white border border-gray-200 rounded-lg shadow-sm"
        >
          <div className="p-4 flex items-center gap-4">
            <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
              <FaImage className="text-gray-500 text-2xl" />
            </div>

            <div className="flex-1">
              <h3 className="text-lg font-medium">{league.name}</h3>
              <div className="mt-1">
                <span className="bg-red-400 text-white px-3 py-1 text-xs rounded-full">
                  {league.status}
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <button className="text-blue-500 hover:text-blue-700">
                <FaRegEdit className="text-xl" />
              </button>
              <button className="text-red-500 hover:text-red-700">
                <FaTrashAlt className="text-xl" />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

// List View Component
// const ListView = ({ data }) => {
//   return (
//     <div className="overflow-x-auto">
//       <table className="min-w-full bg-white border border-gray-200 rounded-lg">
//         <thead className="bg-gray-100">
//           <tr>
//             <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">
//               ID
//             </th>
//             <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">
//               Image
//             </th>
//             <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">
//               Name
//             </th>
//             <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">
//               Status
//             </th>
//             <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">
//               Actions
//             </th>
//           </tr>
//         </thead>
//         <tbody>
//           {data.map((league) => (
//             <tr key={league.id} className="border-t border-gray-200">
//               <td className="py-3 px-4 text-sm">{league.id}</td>
//               <td className="py-3 px-4">
//                 <div className="w-10 h-10 bg-gray-200 rounded-lg flex items-center justify-center">
//                   <FaImage className="text-gray-500" />
//                 </div>
//               </td>
//               <td className="py-3 px-4 text-sm font-medium">{league.name}</td>
//               <td className="py-3 px-4">
//                 <span className="bg-red-400 text-white px-3 py-1 text-xs rounded-full">
//                   {league.status}
//                 </span>
//               </td>
//               <td className="py-3 px-4">
//                 <div className="flex items-center gap-2">
//                   <button className="text-blue-500 hover:text-blue-700">
//                     <FaRegEdit className="text-xl" />
//                   </button>
//                   <button className="text-red-500 hover:text-red-700">
//                     <FaTrashAlt className="text-xl" />
//                   </button>
//                 </div>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

const ListView = ({ data }) => {
  return (
    <div className="grid grid-cols-1 gap-4">
      {data.map((item) => (
        <div
          key={item.id} // Use `item.id` instead of `item._id` as per your data
          className="bg-[#f3f4f6] border border-gray-200 p-2 rounded-lg shadow-sm flex items-center gap-4"
        >
          <div className="w-12 h-12 rounded-md flex items-center justify-center bg-[#f3f4f6] border">
            <span className="text-[#00a6e5]">
              <FaImage className="text-gray-500 text-5xl p-1" />
            </span>
          </div>

          <div className="flex-1">
            <h3 className="text-sm font-bold pl-2">{item.name}</h3>
            <span
              className={`text-white px-3 py-1 text-xs rounded-full inline-block mt-1 ${
                item.status === "Active" ? "bg-[#4ade80]" : "bg-[#f87171]"
              }`}
            >
              {item.status}
            </span>
          </div>

          <div className="flex gap-3 flex-col">
            <button className="text-blue-500 hover:text-blue-700">
              <FaRegEdit className="text-xl" />
            </button>
            <button className="text-red-500 hover:text-red-700">
              <FaTrashAlt className="text-xl" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

const Leag = ({ isGrid, searchQuery, perPage }) => {
  useEffect(() => {
    const fetchTypesAdds = async () => {
      setLoading(true);
      try {
        const response = await getLeaguesTypes();
        setData(response);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
    fetchTypesAdds();
  }, []);

  // Filter data based on search query
  const filteredData = leagueData.filter((league) =>
    league.name.toLowerCase().includes(searchQuery || "")
  );

  // Limit data based on perPage setting
  const paginatedData = filteredData.slice(0, perPage);

  return (
    <div className="p-2">
      {isGrid ? (
        <GridView data={paginatedData} />
      ) : (
        <ListView data={paginatedData} />
      )}
    </div>
  );
};

export default Leag;
