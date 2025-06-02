import { useEffect, useState } from "react";

import { FaChevronDown } from "react-icons/fa";
import LoadingSemiCircle from "../global/LoadingSemiCircle";
import {
  CreateUpdateNotificationSettings,
  getNotificationSettings,
} from "../../Api";

const NotificationDropdown = ({ label, value, options, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleOptionClick = (option) => {
    onChange(option);
    setIsOpen(false); // Close dropdown after selection
  };

  return (
    <div className="mb-4">
      <label className="block text-xs font-semibold mb-2">
        {label} <span className="text-red-500">*</span>
      </label>
      <div className="relative">
        <div
          className="border border-gray-300 rounded-md p-1.5 flex justify-between items-center cursor-pointer text-xs"
          onClick={toggleDropdown}
        >
          <span>{value}</span>
          <FaChevronDown className="text-gray-500" />
        </div>
        {isOpen && (
          <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
            {options.map((option) => (
              <div
                key={option}
                className={`p-2 cursor-pointer text-xs ${
                  value === option
                    ? "bg-blue-500 text-white"
                    : "hover:bg-gray-100"
                }`}
                onClick={() => handleOptionClick(option)}
              >
                {option}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const InputField = ({
  label,
  name,
  value,
  onChange,
  placeholder,
  required,
}) => (
  <div>
    <label className="block text-xs font-bold mb-1">
      {label} {required && <span className="text-red-600 font-bold">*</span>}
    </label>
    <input
      type="text"
      name={name}
      value={value}
      onChange={onChange}
      className="w-full border border-gray-200 rounded-md p-1 text-xs focus:ring-0 focus:ring-blue-500 focus:border-blue-500 outline-none"
      placeholder={placeholder}
    />
  </div>
);

const NotificationSettings = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    notification_type: "FCM", // Default to FCM
    ios_notification_type: "FCM", // Default to FCM
    firebase_server_key: "",
    firebase_topic: "",
    ios_firebase_server_key: "",
    ios_firebase_topic: "",
    one_signal_app_id: "",
    one_signal_api_key: "",
    ios_one_signal_app_id: "",
    ios_one_signal_api_key: "",
  });

  useEffect(() => {
    const fetchSettings = async () => {
      setLoading(true);
      try {
        const settings = await getNotificationSettings();
        // console.log("aaaaaaa", settings);
        // const general = settings?.general_settings;
        setData({
          notification_type: settings?.notification_type || "FCM", // Default to FCM
          ios_notification_type: settings?.ios_notification_type || "FCM", // Default to FCM
          firebase_server_key: settings?.firebase_server_key || "",
          firebase_topic: settings?.firebase_topic || "",
          ios_firebase_server_key: settings?.ios_firebase_server_key || "",
          ios_firebase_topic: settings?.ios_firebase_topic || "",
          one_signal_app_id: settings?.one_signal_app_id || "",
          one_signal_api_key: settings?.one_signal_api_key || "",
          ios_one_signal_app_id: settings?.ios_one_signal_app_id || "",
          ios_one_signal_api_key: settings?.ios_one_signal_api_key || "",
        });
      } catch (err) {
        console.error("Error occurred: ", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await CreateUpdateNotificationSettings({
        // Pass the data to the API
        notification_type: data.notification_type,
        ios_notification_type: data.ios_notification_type,
        firebase_server_key: data.firebase_server_key,
        firebase_topic: data.firebase_topic,
        ios_firebase_server_key: data.ios_firebase_server_key,
        ios_firebase_topic: data.ios_firebase_topic,
        one_signal_app_id: data.one_signal_app_id,
        one_signal_api_key: data.one_signal_api_key,
      });

      console.log(res);
    } catch (error) {
      console.log(error?.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`w-full rounded-md p-2 ${
        loading ? "pointer-events-none" : ""
      }`}
    >
      {loading ? (
        <LoadingSemiCircle />
      ) : (
        <div className="flex flex-col gap-2">
          <div className="w-full bg-white rounded-md p-2 flex flex-col gap-2">
            <div className="flex flex-col md:flex-row gap-6">
              {/* ANDROID SECTION */}
              <div className="w-full md:w-1/2 border-r border-gray-200 pr-6">
                <h2 className="text-sm font-semibold mb-4">ANDROID</h2>
                <NotificationDropdown
                  label="Notification Type"
                  value={data.notification_type}
                  options={["FCM", "One Signal"]}
                  onChange={(type) =>
                    setData((prev) => ({ ...prev, notification_type: type }))
                  }
                />
                {data.notification_type === "FCM" ? (
                  <div className="grid grid-cols-2 gap-4">
                    <InputField
                      label="Firebase Server Key"
                      name="firebase_server_key"
                      value={data.firebase_server_key}
                      onChange={handleChange}
                      placeholder="N/A"
                      required
                    />
                    <InputField
                      label="Firebase Topics"
                      name="firebase_topic"
                      value={data.firebase_topic}
                      onChange={handleChange}
                      placeholder="N/A"
                      required
                    />
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-4">
                    <InputField
                      label="One Signal App ID"
                      name="one_signal_app_id"
                      value={data.one_signal_app_id}
                      onChange={handleChange}
                      placeholder="N/A"
                      required
                    />
                    <InputField
                      label="One Signal Api Key"
                      name="one_signal_api_key"
                      value={data.one_signal_api_key}
                      onChange={handleChange}
                      placeholder="N/A"
                      required
                    />
                  </div>
                )}
              </div>

              {/* IOS SECTION */}
              <div className="w-full md:w-1/2 pl-6">
                <h2 className="text-sm font-semibold mb-4">IOS</h2>
                <NotificationDropdown
                  label="Notification Type"
                  value={data.ios_notification_type}
                  options={["FCM", "One Signal"]}
                  onChange={(type) =>
                    setData((prev) => ({
                      ...prev,
                      ios_notification_type: type,
                    }))
                  }
                />
                {data.ios_notification_type === "FCM" ? (
                  <div className="grid grid-cols-2 gap-4">
                    <InputField
                      label="Firebase Server Key"
                      name="ios_firebase_server_key"
                      value={data.ios_firebase_server_key}
                      onChange={handleChange}
                      placeholder="N/A"
                      required
                    />
                    <InputField
                      label="Firebase Topics"
                      name="ios_firebase_topic"
                      value={data.ios_firebase_topic}
                      onChange={handleChange}
                      placeholder="N/A"
                      required
                    />
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-4">
                    <InputField
                      label="One Signal App ID"
                      name="ios_one_signal_app_id"
                      value={data.ios_one_signal_app_id}
                      onChange={handleChange}
                      placeholder="N/A"
                      required
                    />
                    <InputField
                      label="One Signal Api Key"
                      name="ios_one_signal_api_key"
                      value={data.ios_one_signal_api_key}
                      onChange={handleChange}
                      placeholder="N/A"
                      required
                    />
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              className={`text-sm my-4 font-normal right-12 bottom-5 py-1 px-2 text-white uppercase  transition active:scale-95 rounded-md shadow-lg ${
                loading ? "bg-gray-600" : "bg-[#00a4e6]"
              }`}
              onClick={handleSave}
            >
              Update
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationSettings;
