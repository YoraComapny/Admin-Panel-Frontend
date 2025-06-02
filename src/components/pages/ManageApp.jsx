import Accordion from "../ManageApp/Accordian";
import { useLocation } from "react-router-dom";
import Location from "../global/Location";
import Portal from "./Portal";
import { IoLogoAndroid } from "react-icons/io";
const ManageApp = () => {
  const location = useLocation();
  const contentList = [
    // Add your content for each accordion item here
    {
      title: "App Information",
      form: "AppInformation",
      img: "https://placehold.jp/300x300.png",
    },
    {
      title: "Notification Settings",
      form: "NotificationSettings",
      img: "https://placehold.jp/300x300.png",
    },
    // {
    //   title: "iOS Settings",
    //   form: "iOSSettings",
    //   img: "https://placehold.jp/300x300.png",
    // },
    {
      title: "Android Settings",
      form: "AndroidSettings",
      img: "https://placehold.jp/300x300.png",
    },
    {
      title: "IOS Settings",
      form: "iosSetting",
      img: "https://placehold.jp/300x300.png",
    },
    {
      title: "Social Links",
      form: "SocialLinks",
      img: "https://placehold.jp/300x300.png",
    },
  ];
  return (
    <>
      <Portal>
        <div className="bg-[#fafafa] min-h-screen">
          <div className="relative p-3 shadow-md min-h-screen">
            {/* Location Section */}
            <div className="py-3 w-[90%] mx-auto">
              <Location location={location} />
            </div>

            {/* Content List Section */}
            <div className="flex flex-col gap-5 w-[90%] mx-auto bg-[#fafafa] p-3 rounded-md shadow-md">
              {contentList.map((item, index) => (
                <div key={index} className="rounded-md">
                  <Accordion title={item.title} form={item.form} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </Portal>
    </>
  );
};

export default ManageApp;
