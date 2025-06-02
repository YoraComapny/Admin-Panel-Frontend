import "../styles/toggleBtn.css";
import AndroidSettings from "./AndroidSettings";
import { AppInformation } from "./AppInformation";
import IosSetting from "./IosSetting";
import NotificationSettings from "./NotificationSettings";
import { SocialLinks } from "./SocialLinks";

const SettingForms = ({ form }) => {
  return form === "AppInformation" ? (
    <>
      <AppInformation />
    </>
  ) : form === "NotificationSettings" ? (
    <>
      <NotificationSettings />
    </>
  ) : form === "AndroidSettings" ? (
    <>
      <AndroidSettings />
    </>
  ) : form === "iosSetting" ? (
    <>
      <IosSetting />
    </>
  ) : form === "SocialLinks" ? (
    <>
      <SocialLinks />
    </>
  ) : (
    <div>Other Settings</div>
  );
};

export default SettingForms;
