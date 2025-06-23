import { useState } from "react";
import { deleteNotification, sendNotification } from "../../Api";
import { MdNotificationsActive } from "react-icons/md";
import NotificationListItem from "./NotificationListItem";
import NotificationGridItem from "./NotificationGridItem";

const NotificationItem = ({ notification, isGrid, fetchData }) => {
  const [loading, setLoading] = useState(false);

  // Delete notif function
  const handleDelete = async (id) => {
    setLoading(true);
    try {
      await deleteNotification(id);
      console.log("Notification deleted successfully");
      if (fetchData) {
        fetchData();
      }
    } catch (error) {
      console.error("Error deleting notification:", error);
    } finally {
      setLoading(false);
    }
  };

  // Send notif function
  const handleSendNotification = async (id) => {
    setLoading(true);
    try {
      await sendNotification(id);
      console.log("Notification sent successfully");
    } catch (error) {
      console.error("Error sending notification:", error);
    } finally {
      setLoading(false);
    }
  };

  // Render grid or list item based on isGrid prop
  return isGrid ? (
    <NotificationGridItem
      notification={notification}
      loading={loading}
      onDelete={handleDelete}
      onSend={handleSendNotification}
    />
  ) : (
    <NotificationListItem
      notification={notification}
      loading={loading}
      onDelete={handleDelete}
      onSend={handleSendNotification}
    />
  );
};

export default NotificationItem;
