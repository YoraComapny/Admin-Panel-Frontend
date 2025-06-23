import instance from "axios";
import { toast } from "react-toastify";

// eslint-disable-next-line no-unused-vars
const baseURL = import.meta.env.VITE_BASE_API_URL;
const axios = instance.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const setAuthToken = (token, userId) => {
  if (token) {
    // Apply token and userId to headers
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    axios.defaults.headers.common["UserId"] = userId;
  } else {
    // Delete token and userId from headers
    delete axios.defaults.headers.common["Authorization"];
    delete axios.defaults.headers.common["UserId"];
  }
};

axios.interceptors.request.use(
  (config) => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user?.token && user?.userId) {
      // Set token and userId from local storage to headers
      // config.headers.Authorization = user.token;

      config.headers.Authorization = `Bearer ${user.token}`;
      config.headers.UserId = user.userId;
      return config;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// ***************************************** USER APIS ******************************************************//

export const signupUser = async (form) => {
  try {
    const res = await axios.post(`/signup`, form);
    return res;
  } catch (error) {
    toast.error(`${error?.response?.data?.message}`, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    return error;
  }
};

export const loginUser = async (user) => {
  try {
    const res = await axios.post(`/login`, user);
    return res;
  } catch (error) {
    toast.error(`${error?.response?.data?.message}`, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    return error;
  }
};

// ***************************************** MATCHES APIS ******************************************************//

export const createMatch = async (formData) => {
  try {
    const res = await axios.post(`/live/create-match`, formData);
    console.log("Actual response ", res);
    return res;
  } catch (error) {
    toast.error(`${error?.response?.data?.mesaage}`, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    // console.log("Error is here ", error);
    return error;
  }
};

export const fetchAllMatches = async (currentPage, searchQuery, perPage) => {
  try {
    const res = await axios.get(
      `/live/all-matches?page=${currentPage}&search=${searchQuery}&perPage=${perPage}`
    );
    console.log("res-1", res?.data?.paginatedMatches);
    return res;
  } catch (error) {
    toast.error(`${error?.response?.data?.message}`, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    return error;
  }
};

export const deleteMatch = async (id) => {
  try {
    const res = await axios.delete(`/live/delete-match/${id}`);
    toast.success("Match deleted successfully!", {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    return res;
  } catch (error) {
    toast.error(`${error?.response?.data?.message}`, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    return error;
  }
};

export const getMatch = async (id) => {
  try {
    const res = await axios.get(`/live/get-single-match/${id}`);

    return res;
  } catch (error) {
    toast.error(`${error?.response?.data?.message}`, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    return error;
  }
};
export const duplicateMatch = async (id) => {
  try {
    const res = await axios.post(`/live/duplicate/${id}`);
    if (res) {
      toast.success("Match duplicated successfully!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
    return res;
  } catch (error) {
    toast.error(`${error?.response?.data?.message}`, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    return error;
  }
};

export const updateMatch = async (id, formData) => {
  try {
    const res = await axios.put(`/live/update-match/${id}`, formData);
    if (res) {
      toast.success("Match updated successfully!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
    return res;
  } catch (error) {
    toast.error(`${error?.response?.data?.message}`, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    return error;
  }
};

export const CloneMatch = async (id, formData) => {
  try {
    const res = await axios.put(`/live/clone-match/${id}`, formData);
    if (res) {
      // toast.success(
      //   "Match updated successfully!",
      //   {
      //     position: "top-right",
      //     autoClose: 5000,
      //     hideProgressBar: false,
      //     closeOnClick: true,
      //     pauseOnHover: true,
      //     draggable: true,
      //     progress: undefined,
      //     theme: "light",
      //   }
      // );
    }
    return res;
  } catch (error) {
    toast.error(`${error?.response?.data?.message}`, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    return error;
  }
};

export const updateMatchOrder = async (order) => {
  try {
    const res = await axios.post("/live/reorder", { numbers: order });
    return res.data;
  } catch (error) {
    console.error("Error updating match order", error);
    throw error;
  }
};

export const getOrder = async () => {
  try {
    const res = await axios.get("/live/get-order");
    return res.data.data.numbers;
  } catch (err) {
    console.log("Internal server error", err);
    throw err;
  }
};

export const getThumbnail = async (data) => {
  try {
    const res = await axios.post("/live/gen-thumbnail", data);
    return res.data.thumbnail;
  } catch (err) {
    console.log("Internal server error", err);
    return false;
  }
};

export const updateMobileView = async (viewData) => {
  try {
    const res = await axios.post("/live/mobile-view", {
      mobile_view: viewData,
    });
    console.log("Mobile view updated successfully", res.data);
    return res.data;
  } catch (error) {
    console.error(
      "Error updating mobile view:",
      error.response?.data?.message || error.message
    );
    throw new Error(
      error.response?.data?.message || "Failed to update mobile view"
    );
  }
};

// ***************************************** NEWS APIS ******************************************************//

export const createNews = async (data) => {
  try {
    const res = await axios.post(`/create/news`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log("image ka error ", res);
    return res;
  } catch (error) {
    toast.error(`${error?.response?.data?.message}`, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    return error;
  }
};

export const editNews = async (id, data) => {
  try {
    const res = await axios.put(`/news/${id}`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res;
  } catch (error) {
    toast.error(`${error?.response?.data?.message}`, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    return error;
  }
};

export const getAllNews = async (currentPage, searchQuery, perPage) => {
  try {
    const res = await axios.get(
      `/all/news?page=${currentPage}&search=${searchQuery}&perPage=${perPage}`
    );
    return res;
  } catch (error) {
    toast.error(`${error?.response?.data?.message}`, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    return error;
  }
};
export const deleteSingleNews = async (id) => {
  try {
    const res = await axios.delete(`/delete-news/${id}`);

    return res;
  } catch (error) {
    toast.error(`${error?.response?.data?.message}`, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    return error;
  }
};

export const getSingleNews = async (id) => {
  try {
    const res = await axios.get(`/news/${id}`);
    return res;
  } catch (error) {
    toast.error(`${error?.response?.data?.message}`, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    return error;
  }
};

// ************************************* MANAGE APP APIS ************************************************//

// *********** APP INFORMATION SECTION ************ //
export const createUpdateAppInformation = async (data) => {
  try {
    const res = await axios.post(
      `/manage-app/app-information/set-app-information`,
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    toast.success(`Settings updated!`, {
      position: "top-right",
      autoClose: 800,
      hideProgressBar: false,
      closeOnClick: true,
      theme: "light",
    });
    return res;
  } catch (error) {
    toast.error(`${error?.response?.data?.message}`, {
      position: "top-right",
      autoClose: 800,
      hideProgressBar: false,
      closeOnClick: true,
      theme: "light",
    });
    return error;
  }
};
export const getAppInformation = async () => {
  try {
    const res = await axios.get(
      `/manage-app/app-information/get-app-information`
    );
    return res.data;
  } catch (error) {
    toast.error(`${error?.response?.data?.message}`, {
      position: "top-right",
      autoClose: 800,
      hideProgressBar: false,
      closeOnClick: true,
      theme: "light",
    });
    return error;
  }
};

// *********** ANDROID SECTION ************ //
export const CreateUpdateNotificationSettings = async (data) => {
  try {
    const res = await axios.post(
      `/manage-app/android/set-notification-setting`,
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    toast.success(`${res?.data?.message}`, {
      position: "top-right",
      autoClose: 800,
      theme: "light",
    });
    return res;
  } catch (error) {
    toast.error(`${error?.response?.data?.message}`, {
      position: "top-right",
      autoClose: 800,
      theme: "light",
    });
    return error;
  }
};
export const getNotificationSettings = async () => {
  try {
    const response = await axios.get(
      "/manage-app/android/get-notification-setting"
    );
    // console.log("aaaa", response.data.settings);
    return response.data?.settings.general_settings;
  } catch (err) {
    toast.error(`${err?.response?.data?.message}`, {
      position: "top-right",
      autoClose: 800,
      closeOnClick: true,
      theme: "light",
    });
    return err;
  }
};

// *********** Android SECTION ************ //

export const androidCreateUpdateSettings = async (data) => {
  try {
    const res = await axios.post(`/android/set-android-setting`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    toast.success(`${res?.data?.message}`, {
      position: "top-right",
      autoClose: 800,
      theme: "light",
    });
    return res;
  } catch (error) {
    toast.error(`${error?.response?.data?.message}`, {
      position: "top-right",
      autoClose: 800,
      theme: "light",
    });
    return error;
  }
};

export const getAndroidSettings = async () => {
  try {
    const settings = await axios.get("/android/get-android-setting");
    return settings;
  } catch (err) {
    toast.error(`${err?.response?.data?.message}`, {
      position: "top-right",
      autoClose: 800,
      closeOnClick: true,
      theme: "light",
    });
    return err;
  }
};

// *********** iOS SECTION ************ //
export const iosCreateUpdateSettings = async (data) => {
  try {
    const res = await axios.post(`/ios/set-ios-setting`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    toast.success(`${res?.data?.message}`, {
      position: "top-right",
      autoClose: 800,
      theme: "light",
    });
    return res;
  } catch (error) {
    toast.error(`${error?.response?.data?.message}`, {
      position: "top-right",
      autoClose: 800,
      theme: "light",
    });
    return error;
  }
};

export const getIosSettings = async () => {
  try {
    const settings = await axios.get("/ios/get-ios-setting");
    return settings;
  } catch (err) {
    toast.error(`${err?.response?.data?.message}`, {
      position: "top-right",
      autoClose: 800,
      closeOnClick: true,
      theme: "light",
    });
    return err;
  }
};
// *********** BLOCK COUNTRIES SECTION ************ //
export const getSocialLinks = async () => {
  try {
    const linksData = await axios.get(
      "/manage-app/social-links/get-social-links"
    );
    return linksData.data;
  } catch (err) {
    toast.error(`${err?.response?.data?.message}`, {
      position: "top-right",
      autoClose: 800,
      hideProgressBar: false,
      closeOnClick: true,
      theme: "light",
    });
    return err;
  }
};

export const CreateAndUpdateSocialLinks = async (data) => {
  try {
    const res = await axios.post(
      `/manage-app/social-links/set-social-links`,
      data
    );
    // toast.success(`Changes saved!`, {
    //   position: "top-right",
    //   autoClose: 800,
    //   hideProgressBar: false,
    //   theme: "light",
    // });
    return res;
  } catch (error) {
    toast.error(`${error?.response?.data?.message}`, {
      position: "top-right",
      autoClose: 800,
      hideProgressBar: false,
      theme: "light",
    });
    return error;
  }
};

// ***********Android-ADS SECTION ************ //
export const deleteAnroidads = async (id) => {
  try {
    const del = await axios.delete(`/manage-app/ads/delete-ad/${id}`);
    console.log("api.js ka code", del);
    toast.success(`Add Deleted Successfully`, {
      position: "top-right",
      autoClose: 800,
      hideProgressBar: true,
      theme: "light",
    });
    console.log("Api.js", del);
    return del;
  } catch (err) {
    toast.error(`${err?.response?.data?.message}`, {
      position: "top-right",
      autoClose: 800,
      hideProgressBar: true,
      theme: "light",
    });
    return err;
  }
};

export const createUpdateAndroidAdSettings = async (settings) => {
  try {
    const res = await axios.post(
      `/manage-app/ads//set/android-ads-settings`,
      settings
    );
    toast.success(`Changes saved!`, {
      position: "top-right",
      autoClose: 800,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    return res;
  } catch (error) {
    toast.error(`${error?.response?.data?.message}`, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    return error;
  }
};

export const getAndroidAdsSettings = async () => {
  try {
    const settings = await axios.get(
      "/manage-app/ads/get/android-ads-settings"
    );
    return settings.data;
  } catch (err) {
    toast.error(`${err?.response?.data?.message}`, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    return err;
  }
};

// *********** IOS-ADS SECTION ************ //
export const deleteIosads = async (id) => {
  try {
    const del = await axios.delete(`/manage-app/ios-ads/delete-ad/${id}`);
    console.log("api.js ka code", del);
    toast.success(`Add Deleted Successfully`, {
      position: "top-right",
      autoClose: 800,
      hideProgressBar: true,
      theme: "light",
    });
    console.log("Api.js", del);
    return del;
  } catch (err) {
    toast.error(`${err?.response?.data?.message}`, {
      position: "top-right",
      autoClose: 800,
      hideProgressBar: true,
      theme: "light",
    });
    return err;
  }
};

export const createUpdateIosAdSettings = async (settings) => {
  try {
    const res = await axios.post(
      `/manage-app/ios-ads/set/ios-ads-settings`,
      settings
    );
    toast.success(`Changes saved!`, {
      position: "top-right",
      autoClose: 800,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    return res;
  } catch (error) {
    toast.error(`${error?.response?.data?.message}`, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    return error;
  }
};

export const getIosAdsSettings = async () => {
  try {
    const settings = await axios.get(
      "/manage-app/ios-ads/get/ios-ads-settings"
    );
    return settings.data;
  } catch (err) {
    toast.error(`${err?.response?.data?.message}`, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    return err;
  }
};
// ***************************************** MOBILE VIEW APIS ******************************************************//

export const handleView = async (data) => {
  try {
    const res = await axios.post("/live/mobile-view", data);
    return res;
  } catch (err) {
    toast.error(`Error occured`, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  }
};

export const fetchMobileView = async () => {
  try {
    const res = await axios.get("/live/get-view");
    return res;
  } catch (error) {
    console.log(error);
    return error;
  }
};

// ***************************************** NOTIFICATION APIS ******************************************************//
export const createNotification = async (notification) => {
  try {
    const res = await axios.post(
      `/notifications/create-notification`,
      notification
    );
    console.log("1111111---------NOtifcations", res?.data?.message);
    toast.success(res?.data?.message || `Notification created  successfully!`, {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    return res;
  } catch (error) {
    toast.error(`${error?.response?.data?.message}`, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    return error;
  }
};

export const getAllNotifications = async () => {
  try {
    const notifications = await axios.get(
      "/notifications/get-all-notifications"
    );
    return notifications.data;
  } catch (err) {
    toast.error(`${err?.response?.data?.message}`, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    return err;
  }
};

export const deleteNotification = async (id) => {
  try {
    const del = await axios.delete(`/notifications/delete-notification/${id}`);
    toast.success(`Notification deleted successfully!`, {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    return del;
  } catch (err) {
    toast.error(`${err?.response?.data?.message}`, {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    return err;
  }
};

export const deleteAllNotification = async () => {
  try {
    const del = await axios.delete(`/notifications/delete-all-notification`);
    toast.success(`All Notification deleted successfully!`, {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    return del;
  } catch (err) {
    toast.error(`${err?.response?.data?.message}`, {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    return err;
  }
};

export const sendNotification = async (id) => {
  try {
    const notify = await axios.post(`/notifications/send-notification/${id}`);
    toast.success(`Notification sent successfully!`, {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    return notify;
  } catch (err) {
    toast.error(`${err?.response?.data?.message}`, {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    return err;
  }
};

// ***************************************** ADMIN SETTINGS APIS ******************************************************//
export const createAdminSettings = async (admin) => {
  try {
    const res = await axios.post(`/admin/set-admin-settings`, admin);
    toast.success(`Settings saved successfully!`, {
      position: "top-right",
      autoClose: 800,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      progress: undefined,
      theme: "light",
    });
    return res;
  } catch (error) {
    toast.error(`${error?.response?.data?.message}`, {
      position: "top-right",
      autoClose: 800,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      progress: undefined,
      theme: "light",
    });
    return error;
  }
};

export const getAdminSettings = async () => {
  try {
    const settings = await axios.get("/admin/get-admin-settings");
    return settings.data;
  } catch (err) {
    toast.error(`${err?.response?.data?.message}`, {
      position: "top-right",
      autoClose: 800,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      progress: undefined,
      theme: "light",
    });
    return err;
  }
};

// ***************************************** FIXTURES & LEAGUES ******************************************************//
export const searchLeagues = async (country) => {
  if (country) {
    try {
      const res = await axios.get(`/fixture/get-leagues-rapid/${country}`);
      return res.data;
    } catch (err) {
      toast.error(`Something went wrong: ${err.message}`);
    }
  }
};
export const getLeagues = async () => {
  try {
    const res = await axios.get(`/fixture/get-leagues`);
    // console.log(res.data.data);
    return res.data.data;
  } catch (err) {
    toast.error(`Something went wrong: ${err.message}`);
  }
};

export const saveLeagues = async (data) => {
  try {
    console.log(data);
    const res = await axios.post(`/fixture/set-leagues`, data);
    toast.success("League saved!");
    return res;
  } catch (err) {
    toast.error(`Something went wrong: ${err.message}`);
  }
};
export const deleteLeague = async (id) => {
  try {
    const res = await axios.delete(`/fixture/delete-league/${id}`);
    toast.success("League deleted successully");
    return res;
  } catch (err) {
    toast.error(`Something went wrong: ${err.message}`);
  }
};

// export const getFixtures = async (date) => {
//   try {
//     // const res = await axios.post(`/fixture/get-fixture-rapid`, date);
//     // const res = await axios.post(`/fixture/get-by-date`, date);
//     // const res = await axios.get(`/fixture/get-by-date`, fixtureDate);
//     const res = await axios.get(`/fixture/get-by-date`, { date: fixtureDate });
//     return res.data;
//   } catch (err) {
//     toast.error(`${err?.response?.data?.message}`, {
//       position: "top-right",
//       autoClose: 800,
//       hideProgressBar: true,
//       theme: "light",
//     });
//   }
// };

export const getFixtures = async (dateObj) => {
  try {
    const res = await axios.get(
      `/fixture/get-by-date?fixtureDate=${dateObj.date}`
    );

    console.log("after api call res", res?.data);
    return res.data;
  } catch (err) {
    console.error("Fixture API Error:", err);
    toast.error(
      `${err?.response?.data?.message || "Could not fetch fixtures"}`,
      {
        position: "top-right",
        autoClose: 800,
        hideProgressBar: true,
        theme: "light",
      }
    );
    // Return null to indicate error
    return null;
  }
};

// ***************************************** Types-Adds ******************************************************//

export const createAddType = async (data) => {
  try {
    const res = await axios.post(`/types-add/create-types-add`, data);
    window.location.reload();
    toast.success("Add Type created successfully!");
    return res;
  } catch (error) {
    console.log("error", error);
  }
};

export const getAddTypes = async () => {
  try {
    const res = await axios.get(`/types-add/get-types-add`);
    toast.success("Add fetched successfully!", {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    return res.data;
  } catch (error) {
    toast.error(`${error?.response?.data?.message}`, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    console.log("error", error);
  }
};

export const deleteAddType = async (id) => {
  try {
    const res = await axios.delete(`/types-add/delete-types-add/${id}`);
    window.location.reload();

    toast.success("Add Type deleted successfully!", {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    return res;
  } catch (error) {
    toast.error(`${error?.response?.data?.message}`, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    console.log("error", error);
  }
};

export const updateAddType = async (id, data) => {
  try {
    const res = await axios.put(`/types-add/update-types-add/${id}`, data);
    window.location.reload();
    toast.success("Add Type updated successfully!", {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    return res;
  } catch (error) {
    toast.error(`${error?.response?.data?.message}`, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    console.log("error", error);
  }
};

// ***************************************** Types-Sports ******************************************************//

export const createSportsType = async (data) => {
  try {
    // const res = await axios.post(`/types-sports/create-sports`, data);
    const res = await axios.post(`/types-sports/create-sports`, data);
    window.location.reload();
    toast.success("Add Type created successfully!");
    return res;
  } catch (error) {
    console.log("error", error);
  }
};

export const getSportsTypes = async () => {
  try {
    const res = await axios.get(`/types-sports/get-sports`);
    toast.success("Sports fetched successfully!", {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    return res.data;
  } catch (error) {
    toast.error(`${error?.response?.data?.message}`, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    console.log("error", error);
  }
};

export const deleteSportsType = async (id) => {
  try {
    const res = await axios.delete(`/types-sports/delete-sports/${id}`);
    window.location.reload();

    toast.success("Add Type deleted successfully!", {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    return res;
  } catch (error) {
    toast.error(`${error?.response?.data?.message}`, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    console.log("error", error);
  }
};

export const updateSportsType = async (id, data) => {
  try {
    const res = await axios.put(`/types-sports/update-sports/${id}`, data);
    window.location.reload();
    toast.success("Add Type updated successfully!", {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    return res;
  } catch (error) {
    toast.error(`${error?.response?.data?.message}`, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    console.log("error", error);
  }
};

// ***************************************** Types-Leagues ******************************************************//

export const createLeaguesType = async (data) => {
  try {
    const res = await axios.post(`/types-leagues/create-types-leagues`, data);
    window.location.reload();
    toast.success("League type created successfully!");
    return res;
  } catch (error) {
    console.log("error", error);
  }
};

export const getLeaguesTypes = async () => {
  try {
    const res = await axios.get(`/types-leagues/get-types-leagues`);
    toast.success("Leagues fetched successfully!", {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    return res.data;
  } catch (error) {
    toast.error(`${error?.response?.data?.message}`, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    console.log("error", error);
  }
};

export const deleteLeaguesType = async (id) => {
  try {
    const res = await axios.delete(`/types-leagues/delete-types-leagues/${id}`);
    window.location.reload();

    toast.success("Leagues deleted successfully!", {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    return res;
  } catch (error) {
    toast.error(`${error?.response?.data?.message}`, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    console.log("error", error);
  }
};

export const updateLeaguesType = async (id, data) => {
  try {
    const res = await axios.put(
      `/types-leagues/update-types-leagues/${id}`,
      data
    );
    window.location.reload();
    toast.success("Leagues updated successfully!", {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    return res;
  } catch (error) {
    toast.error(`${error?.response?.data?.message}`, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    console.log("error", error);
  }
};

// ***************************************** Selected-Leagues ******************************************************//

// Get user's selected leagues
export const getSelectedLeagues = async () => {
  try {
    const res = await axios.get(`/selected-leagues/user/selected-leagues`);
    // console.log("Data coming from api", res?.data?.data);
    return res.data.data;
  } catch (err) {
    toast.error(`Something went wrong: ${err.message}`);
    throw err;
  }
};

// Add a league to user's selected leagues
export const addLeague = async (name, image_path) => {
  try {
    const res = await axios.post(`/selected-leagues/user/add-league`, {
      name,
      image_path,
    });
    console.log("2--res", res);
    return res.data;
  } catch (err) {
    // toast.error(`Something went wrong: ${err.message}`);
    console.error("error", err);
    throw err;
  }
};

export const removeLeague = async (id) => {
  console.log("removeLeague API called with ID:", id);

  try {
    // Make sure the URL format matches your backend API structure
    const res = await axios.delete(
      `/selected-leagues/user/remove-league/${id}`
    );

    console.log("API delete response:", res?.data);
    return res.data;
  } catch (err) {
    console.error("Full error object:", err);
    console.error("Error response:", err.response);

    // More descriptive error handling
    const errorMsg =
      err.response?.data?.message || err.message || "Unknown error";
    toast.error(`Failed to remove league: ${errorMsg}`);
    throw err;
  }
};

// Update the order of user's selected leagues
// export const updateLeaguesOrder = async (orderData) => {
//   try {
//     const res = await axios.put(`/selected-leagues/user/update-leagues-order`, {
//       leagues: orderData,
//     });
//     return res.data;
//   } catch (err) {
//     toast.error(`Something went wrong: ${err.message}`);
//     throw err;
//   }
// };

export const updateimages = async (formData) => {
  try {
    // 🔸 CHANGE: Updated endpoint to match backend and pass FormData directly
    const res = await axios.post(`/upload-status`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    // 🔸 CHANGE: Check for success response properly
    if (res.data && res.data.success) {
      toast.success("Images updated successfully!", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }

    return res;
  } catch (error) {
    // 🔸 CHANGE: Better error handling
    const errorMessage =
      error?.response?.data?.message || "Failed to upload images";

    toast.error(errorMessage, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

    console.log("Upload error:", error);
    throw error; // 🔸 CHANGE: Re-throw error so component can handle it
  }
};

export const getAllStatus = async () => {
  try {
    const res = await axios.get(`/get-upload-status`);
    return res;
  } catch (error) {
    toast.error(`${error?.response?.data?.message}`, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    return error;
  }
};

// export const updateImageStaus = async (viewData) => {
//   try {
//     const res = await axios.post("/image-status-update", {
//       status: viewData.status,
//     });
//     console.log("status updated successfully", res.data);
//     return res.data;
//   } catch (error) {
//     console.error(
//       "Error updating status:",
//       error.response?.data?.message || error.message
//     );
//     throw new Error(error.response?.data?.message || "Failed to update status");
//   }
// };

export const updateImageStatus = async (data) => {
  try {
    const res = await axios.post("/image-status-update", {
      status: data.status,
    });

    // Show success notification
    toast.success("Status updated successfully", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

    return res.data;
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || "Failed to update status";

    // Show error notification
    toast.error(errorMessage, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

    console.error("Error updating status:", errorMessage);
    throw error; // Re-throw the error for further handling if needed
  }
};
