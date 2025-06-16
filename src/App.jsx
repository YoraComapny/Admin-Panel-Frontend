import { Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./components/pages/Login.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserContextProvider } from "./context";
import {
  Dashboard,
  Fixtures,
  ManageApp,
  ManageLive,
  Leagues,
  News,
  Administration,
  Types,
  CreateMatch,
  EditMatch,
  ContactUs,
  Highlights,
  Notification,
  Logout,
} from "./components/pages/index.js";
import AddNews from "./components/News/AddNews.jsx";
import EditNews from "./components/News/EditNews.jsx";
import CreateNotification from "./components/Notifications/CreateNotification.jsx";
import Adds from "./components/ManageAdd/Adds.jsx";
import Sports from "./components/ManageSports/Sports.jsx";
import TypesAdd from "./components/pages/TypesAdd.jsx";
import TypesSports from "./components/pages/TypesSports.jsx";
import TypesLeagues from "./components/pages/TypesLeagues.jsx";
import CreateAdds from "./components/ManageAdd/CreateAdd.jsx";
import CreateLeagues from "./components/ManageLeagues/CreateLeagues.jsx";
import CloneMatch from "./components/ManageLive/CloneMatch.jsx";
import Upload from "./components/status/upload.jsx";
function App() {
  return (
    <>
      <UserContextProvider>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/manage-live" element={<ManageLive />} />
          <Route path="/admin/fixtures" element={<Fixtures />} />
          <Route path="/admin/manage-apps" element={<ManageApp />} />
          <Route path="/admin/selected-leagues" element={<Leagues />} />
          <Route path="/admin/news" element={<News />} />
          <Route path="/admin/administration" element={<Administration />} />
          <Route path="/admin/manage-live/edit/:id" element={<EditMatch />} />
          <Route path="/admin/manage-live/clone/:id" element={<CloneMatch />} />
          <Route
            path="/admin/manage-live/create-match"
            element={<CreateMatch />}
          />

          <Route path="/admin/news/create-news" element={<AddNews />} />
          <Route path="/admin/news/edit-news/:id" element={<EditNews />} />
          <Route path="/admin/highlights" element={<Highlights />} />
          <Route
            path="/admin/highlights/create-highlights"
            element={<Highlights />}
          />
          <Route path="/admin/contact-us" element={<ContactUs />} />
          <Route path="/admin/notifications" element={<Notification />} />
          <Route
            path="/admin/notification/create-notification"
            element={<CreateNotification />}
          />

          <Route path="/admin/types/adds" element={<TypesAdd />} />
          <Route path="/admin/types/sports" element={<TypesSports />} />
          <Route path="/admin/types/leagues" element={<TypesLeagues />} />
          <Route
            path="/admin/types/leagues/create-leagues"
            element={<CreateLeagues />}
          />

          <Route path="/admin/upload-status" element={<Upload />} />

          <Route path="/" element={<Logout />} />
        </Routes>
        {/* <Portal /> */}
        <ToastContainer />
      </UserContextProvider>
    </>
  );
}

export default App;
