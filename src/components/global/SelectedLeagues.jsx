import { useState } from "react";
import { Reorder } from "framer-motion";
import { TiArrowUnsorted } from "react-icons/ti";
import { RiDeleteBin5Line } from "react-icons/ri";

const SelectedLeagues = ({ leagues = [], handleDelete }) => {
  const [items, setItems] = useState(leagues.map((lg, i) => i));

  return (
    <>
      {items?.length > 0 ? (
        <Reorder.Group
          axis="y"
          values={items}
          onReorder={setItems}
          className="w-full"
        >
          {items.map((item) => (
            <Reorder.Item
              key={item}
              value={item}
              className="bg-[#fafafa] border p-3 mb-2 rounded shadow-sm flex items-center justify-between w-[100%]  "
            >
              <div className="flex items-center">
                <TiArrowUnsorted className="text-[#6b7280] mr-3 hover:text-green-400 text-xl cursor-pointer" />
                <img
                  src={
                    leagues[item].image_path || "https://via.placeholder.com/30"
                  }
                  alt={leagues[item].name}
                  // className="w-8 h-8 mr-3 rounded-full border  border-[#cccfd5]"
                  className="w-11 h-11 mr-3 rounded-full border  border-[#cccfd5]"
                />
                <span className="font-normal text-sm">
                  {leagues[item].name}
                </span>
              </div>
              <RiDeleteBin5Line
                className="text-red-500 text-xl cursor-pointer hover:text-red-700"
                onClick={(e) => handleDelete(e, leagues[item].mongoId)}
              />
            </Reorder.Item>
          ))}
        </Reorder.Group>
      ) : (
        <div className="bg-white p-4 rounded text-center text-gray-500">
          No leagues selected
        </div>
      )}
    </>
  );
};

export default SelectedLeagues;
