// NotificationListItem.jsx
import { MdNotificationsActive } from "react-icons/md";
import { IoIosSend } from "react-icons/io";
import { MdDelete } from "react-icons/md";

const NotificationListItem = ({ notification, loading, onDelete, onSend }) => {
  return (
    <div className="w-full flex items-center justify-between p-3 bg-[#f3f4f6] border rounded-lg shadow-sm">
      <div className="flex items-center gap-3 flex-1">
        <div className="w-16 h-16 flex items-center justify-center bg-[#f3f4f6] border rounded-lg">
          <MdNotificationsActive className="text-5xl text-[#8b5cf6]" />
        </div>
        <div className="flex flex-col">
          <p className="font-medium text-black text-lg">
            {notification.title || "🏆 Real Madrid vs Real Sociedad 🏆"}
          </p>
          <p className="text-sm text-black font-normal">
            {notification.body || "Second Half Start | Enjoy Live Match📺..."}
          </p>
        </div>
      </div>
      <div className="flex gap-2 flex-col">
        <button
          className={`text-blue-500 hover:text-blue-700 transition-colors ${
            loading ? "opacity-50 pointer-events-none" : ""
          }`}
          onClick={() => onSend(notification._id)}
          disabled={loading}
        >
          <IoIosSend className="text-2xl" />
        </button>
        <button
          className={`text-red-400 hover:text-red-600 transition-colors ${
            loading ? "opacity-50 pointer-events-none" : ""
          }`}
          onClick={() => onDelete(notification._id)}
          disabled={loading}
        >
          <MdDelete className="text-2xl" />
        </button>
      </div>
    </div>
  );
};

export default NotificationListItem;
