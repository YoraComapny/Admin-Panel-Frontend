import React, { useEffect, useState } from "react";
import { FaRegEdit, FaTrashAlt } from "react-icons/fa";
import { deleteAddType, getAddTypes } from "../../Api";
import { SiEclipseadoptium } from "react-icons/si";
import LoadingBall from "../global/LoadingBall";
import EditAddType from "./EditAddType";

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
              <SiEclipseadoptium className="text-[#00a6e5] text-7xl p-1" />
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
                onClick={() => onEdit(item)}
                className="text-blue-500 hover:text-blue-700"
              >
                <FaRegEdit className="text-lg" />
              </button>
              <button className="text-red-500 hover:text-red-700">
                <FaTrashAlt
                  onClick={() => deleteAddType(item._id)}
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
              <SiEclipseadoptium className="text-5xl p-1" />
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
              onClick={() => onEdit(item)}
              className="text-blue-500 hover:text-blue-700"
            >
              <FaRegEdit className="text-xl" />
            </button>
            <button className="text-red-500 hover:text-red-700">
              <FaTrashAlt
                onClick={() => deleteAddType(item._id)}
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
const Adds = ({ isGrid, searchQuery = "", perPage = 10 }) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    const fetchTypesAdds = async () => {
      setLoading(true);
      try {
        const response = await getAddTypes();
        setData(response);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
    fetchTypesAdds();
  }, []);

  const handleEdit = (item) => {
    setSelectedItem(item);
    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setSelectedItem(null);

    // Refresh data after edit
    const fetchTypesAdds = async () => {
      setLoading(true);
      try {
        const response = await getAddTypes();
        setData(response);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
    fetchTypesAdds();
  };

  // Filter data based on search query
  const filteredData = data
    .filter((item) => item.name.toLowerCase().includes(searchQuery))
    .slice(0, perPage);

  return (
    <div className="p-2">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-normal">ALL ADS</h2>
      </div>
      {loading ? (
        <LoadingBall />
      ) : isGrid ? (
        <GridView data={filteredData} onEdit={handleEdit} />
      ) : (
        <ListView data={filteredData} onEdit={handleEdit} />
      )}

      {/* Edit Modal */}
      <EditAddType
        isOpen={isEditModalOpen}
        onClose={handleCloseEditModal}
        item={selectedItem}
      />
    </div>
  );
};

export default Adds;
