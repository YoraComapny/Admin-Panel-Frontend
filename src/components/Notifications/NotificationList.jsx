// import { useEffect, useState } from "react";
// import { getAllNotifications } from "../../Api";
// import LoadingBall from "../global/LoadingBall";
// import NotificationItem from "./NotificationItem";
// import { toast } from "react-toastify";

// const NotificationList = ({ isGrid }) => {
//   const [loading, setLoading] = useState(false);
//   const [notifs, setNotifs] = useState([]);

//   useEffect(() => {
//     setLoading(true);
//     const fetchData = async () => {
//       try {
//         const notifications = await getAllNotifications();
//         setNotifs(notifications.data);
//       } catch (error) {
//         toast.error("Error fetching Notifications");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchData();
//   }, []);
//   return (
//     <div className="w-full bg-[#fafafa]">
//       <div className="w-[97%] mx-auto font-normal text-xl">
//         <div className=" flex justify-between px-3 py-1 ">
//           <h4 className="pb-2  ">All Notification</h4>
//         </div>

//         {loading ? (
//           <div className="mt-5">
//             <LoadingBall />
//           </div>
//         ) : (
//           <div
//             className={
//               isGrid
//                 ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4"
//                 : "p-1 flex flex-col gap-2 justify-center"
//             }
//           >
//             {notifs.map((notification) => (
//               <NotificationItem
//                 key={notification._id}
//                 notification={notification}
//                 isGrid={isGrid}
//               />
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default NotificationList;

import { useEffect, useState } from "react";
import { getAllNotifications } from "../../Api";
import LoadingBall from "../global/LoadingBall";
import NotificationItem from "./NotificationItem";
import { toast } from "react-toastify";

const NotificationList = ({ isGrid, searchQuery }) => {
  const [loading, setLoading] = useState(false);
  const [notifs, setNotifs] = useState([]);

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const notifications = await getAllNotifications();
        setNotifs(notifications.data);
      } catch (error) {
        toast.error("Error fetching Notifications");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Filter notifications based on search query
  const filteredNotifications = notifs.filter((notification) => {
    if (!searchQuery) return true;

    // Search in title and body
    return (
      (notification.title &&
        notification.title.toLowerCase().includes(searchQuery)) ||
      (notification.body &&
        notification.body.toLowerCase().includes(searchQuery)) ||
      (notification._id && notification._id.toLowerCase().includes(searchQuery))
    );
  });

  return (
    <div className="w-full bg-[#fafafa]">
      <div className="w-[97%] mx-auto font-normal text-xl">
        <div className="flex justify-between px-3 py-1">
          <h4 className="pb-2">All Notification</h4>
          {searchQuery && (
            <p className="text-sm text-gray-500">
              Found {filteredNotifications.length} results for "{searchQuery}"
            </p>
          )}
        </div>

        {loading ? (
          <div className="mt-5">
            <LoadingBall />
          </div>
        ) : filteredNotifications.length === 0 ? (
          <div className="flex justify-center items-center h-40">
            <p className="text-gray-500">
              {searchQuery
                ? "No notifications found matching your search"
                : "No notifications available"}
            </p>
          </div>
        ) : (
          <div
            className={
              isGrid
                ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4"
                : "p-1 flex flex-col gap-2 justify-center"
            }
          >
            {filteredNotifications.map((notification) => (
              <NotificationItem
                key={notification._id}
                notification={notification}
                isGrid={isGrid}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationList;
