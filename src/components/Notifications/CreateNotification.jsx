import Portal from "../pages/Portal.jsx";
import Location from "../global/Location.jsx";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { createNotification } from "../../Api.js";

const CreateNotification = () => {
  const navigation = useNavigate();
  const location = useLocation();
  const [data, setData] = useState({
    title: "",
    body: "",
    image: "",
  });

  const handleDataChange = (e, name) => {
    setData({
      ...data,
      [name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    const notification = {
      title: data.title,
      body: data.body,
      image: data.image,
    };
    try {
      const res = await createNotification(notification);
      // console.log(res.status);
      navigation("/admin/notifications");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Portal>
      <div className="bg-gray-100 min-h-screen p-5">
        <Location location={location} />
        <div className="mt-5 bg-white rounded-md w-[95%] mx-auto shadow-md text-sm">
          <div className="flex flex-col p-5 gap-2">
            <div>
              <label className="font-semibold">Title</label>
              <input
                type="text"
                className="mt-1 w-full p-1 text-sm border border-gray-200 rounded-md"
                placeholder="Enter notification title here..."
                value={data.title}
                name="title"
                onChange={(e) => handleDataChange(e, "title")}
              />
            </div>

            <div>
              <label className="font-semibold">Body</label>
              <input
                type="text"
                className="mt-1 w-full p-1 text-sm border border-gray-200 rounded-md"
                placeholder="Enter notification description here..."
                name="body"
                value={data.body}
                onChange={(e) => handleDataChange(e, "body")}
              />
            </div>

            {/* <div>
              <label className="font-semibold">
                Image Url{" "}
                <span className="text-gray-400 text-xs">{`(Optional)`}</span>
              </label>
              <input
                type="text"
                className="mt-1 w-full p-1 text-sm border border-gray-200 rounded-md"
                placeholder="Enter notification image url..."
                name="image"
                value={data.image}
                onChange={(e) => handleDataChange(e, "image")}
              />
            </div> */}

            <div className="mt-2">
              <button
                className="p-2 w-32 uppercase h-max bg-[#00a4e6] text-center text-xs text-white font-normal rounded-md shadow-md transition cursor-pointer active:scale-95"
                onClick={handleSubmit}
              >
                Create & Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </Portal>
  );
};

export default CreateNotification;
