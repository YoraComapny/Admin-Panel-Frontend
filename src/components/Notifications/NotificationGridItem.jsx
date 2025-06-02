import { MdNotificationsActive } from "react-icons/md";
import { IoIosSend } from "react-icons/io";
import { MdDelete } from "react-icons/md";

const NotificationGridItem = ({ notification, loading, onDelete, onSend }) => {
  return (
    <div className="bg-[#f3f4f6] border rounded-lg shadow-sm p-3  ">
      <div className="flex   ">
        {/* Left - Bell icon */}
        <div className="w-12 h-14 flex items-center justify-center  bg-[#f3f4f6]  border rounded-lg mr-3">
          <MdNotificationsActive className="text-3xl text-[#8b5cf6] " />
        </div>

        {/* Middle - Notification content */}
        <div className="flex-1 mr-3">
          <h3 className=" text-black  text-sm font-medium mb-1 ">
            {notification.title || "Goal ⚽"}
          </h3>
          <p className="text-xs text-gray-700 font-normal">
            {notification.body || "🏆 Copenhagen 1-2 Chelsea 🏆..."}
          </p>
        </div>

        {/* Right - Action buttons */}
        <div className="flex flex-col space-y-2">
          <button
            className={`text-blue-500 hover:text-blue-700 transition-colors ${
              loading ? "opacity-50 pointer-events-none" : ""
            }`}
            onClick={() => onSend(notification._id)}
            disabled={loading}
          >
            <IoIosSend className="text-xl" />
          </button>
          <button
            className={`text-red-400 hover:text-red-600 transition-colors ${
              loading ? "opacity-50 pointer-events-none" : ""
            }`}
            onClick={() => onDelete(notification._id)}
            disabled={loading}
          >
            <MdDelete className="text-xl" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotificationGridItem;
