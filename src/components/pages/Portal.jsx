// import Sidebar from "../Navbar/Sidebar.jsx";
// import { GiHamburgerMenu } from "react-icons/gi";
// import User from "../Navbar/User.jsx";
// import { useEffect, useState } from "react";
// import { Link, useNavigate, useLocation } from "react-router-dom";
// import { CiLogout } from "react-icons/ci";
// import LoadingBar from "react-top-loading-bar";
// import PropTypes from "prop-types";

// const Portal = ({ children }) => {
//   const [loading, setLoading] = useState(false);
//   const [isSidebarOpen, setIsSidebarOpen] = useState(true);
//   const [open, setOpen] = useState(false);
//   const [user, setUser] = useState(null);
//   const navigation = useNavigate();
//   const location = useLocation();

//   const handleOpen = () => {
//     setOpen((prevState) => !prevState);
//   };

//   const toggleSidebar = () => {
//     setIsSidebarOpen(!isSidebarOpen);
//   };

//   const closeSidebar = () => {
//     setIsSidebarOpen(false);
//   };

//   useEffect(() => {
//     const getUser = () => {
//       const value = JSON.parse(localStorage.getItem("user"));
//       if (value) {
//         setUser(value);
//       } else {
//         navigation("/admin");
//       }
//     };

//     getUser();
//     setLoading(true);
//     const delay = setTimeout(() => {
//       setLoading(false);
//     }, 1000);

//     return () => {
//       clearTimeout(delay);
//     };
//   }, [navigation, location.pathname]);

//   // If user is null, don't render anything (since the user will be redirected)
//   if (user === null) {
//     return null; // Render nothing if the user is not set
//   }

//   // const getUser = () => {
//   //   const value = JSON.parse(localStorage.getItem("user"));
//   //   if (value) {
//   //     setUser(value);
//   //   } else {
//   //     navigation("/");
//   //   }
//   // };

//   return (
//     <div className="flex w-full ">
//       {user ? (
//         <>
//           <LoadingBar color="blue" progress={loading ? 100 : 0} height="4px" />
//           <div>
//             <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />
//           </div>
//           <div className="h-max w-full shadow-sm ">
//             {/* ===========fixed navbar ============= */}
//             <div className="bg-[rgb(255,255,255)]  ">
//               <div className="flex justify-between items-center ">
//                 <div className="flex gap-2 justify-center items-center ">
//                   {isSidebarOpen ? (
//                     ""
//                   ) : (
//                     <GiHamburgerMenu
//                       className="text-3xl border-2 border-black rounded-full p-1 hover:text-gray-600 hover:border-gray-600 transition-colors cursor-pointer"
//                       onClick={toggleSidebar}
//                     />
//                   )}

//                   <div className="font-normal text-sm pl-5 ">
//                     <p className="p-2 m-2 border border-[#e5e7eb] rounded-md  ">
//                       Welcome Back{" "}
//                       <span className="text-[#00a6e5] font-semibold">
//                         {/* {user.name} */}
//                         Admin
//                       </span>
//                     </p>
//                   </div>
//                 </div>
//                 <div className="relative " onClick={handleOpen}>
//                   <User name={"john doe"} imgSrc={user.img} />
//                   {open ? (
//                     <Link
//                       className="absolute right-0 p-2 bg-white rounded-md z-10 min-w-[100px] flex gap-2 items-center justify-center font-sm transition hover:text-red-600"
//                       to="/admin/logout"
//                     >
//                       <CiLogout className="text-xl" />
//                       <p>Logout</p>
//                     </Link>
//                   ) : (
//                     ""
//                   )}
//                 </div>
//               </div>
//             </div>

//             {/* ===========fixed navbar ============= */}

//             <div>{children}</div>
//           </div>
//         </>
//       ) : null}
//     </div>
//   );
// };

// Portal.propTypes = {
//   children: PropTypes.node,
// };

// export default Portal;

import Sidebar from "../Navbar/Sidebar.jsx";
import { GiHamburgerMenu } from "react-icons/gi";
import User from "../Navbar/User.jsx";
import { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { CiLogout } from "react-icons/ci";
import LoadingBar from "react-top-loading-bar";
import PropTypes from "prop-types";

const Portal = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigation = useNavigate();
  const location = useLocation();

  const handleOpen = () => {
    setOpen((prevState) => !prevState);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  useEffect(() => {
    const getUser = () => {
      const value = JSON.parse(localStorage.getItem("user"));
      if (value) {
        setUser(value);
      } else {
        navigation("/admin");
      }
    };

    getUser();
    setLoading(true);
    const delay = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => {
      clearTimeout(delay);
    };
  }, [navigation, location.pathname]);

  // If user is null, don't render anything (since the user will be redirected)
  if (user === null) {
    return null; // Render nothing if the user is not set
  }

  return (
    <div className="flex flex-col md:flex-row w-full h-screen overflow-hidden">
      <LoadingBar color="blue" progress={loading ? 100 : 0} height="4px" />

      {/* Sidebar - position fixed on mobile, static on desktop */}
      <div
        className={`${isSidebarOpen ? "block" : "hidden"} md:block z-40`}
        style={{ height: "100vh" }}
      >
        <div className="h-full">
          <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />
        </div>
      </div>

      {/* Main content area with fixed navbar */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        {/* Fixed navbar */}
        <div className="bg-white shadow-sm sticky top-0 left-0 right-0 z-30">
          <div className="flex justify-between items-center p-1 shadow-xs">
            <div className="flex gap-2 justify-center items-center">
              {!isSidebarOpen && (
                <GiHamburgerMenu
                  className="text-3xl border-2 border-black rounded-full p-1 hover:text-gray-600 hover:border-gray-600 transition-colors cursor-pointer"
                  onClick={toggleSidebar}
                />
              )}

              <div className="font-normal text-sm pl-2">
                <p className="p-2 m-2 border border-[#e5e7eb] rounded-md">
                  Welcome Back{" "}
                  <span className="text-[#00a6e5] font-semibold">Admin</span>
                </p>
              </div>
            </div>
            <div className="relative" onClick={handleOpen}>
              <User name={"john doe"} imgSrc={user.img} />
              {open && (
                <Link
                  className="absolute right-0 p-2 bg-white rounded-md z-50 min-w-[100px] flex gap-2 items-center justify-center font-sm transition hover:text-red-600 shadow-md"
                  to="/"
                >
                  <CiLogout className="text-xl" />
                  <p>Logout</p>
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* Scrollable content area */}
        <div className="flex-1 overflow-y-auto pb-4">{children}</div>
      </div>
    </div>
  );
};

Portal.propTypes = {
  children: PropTypes.node,
};

export default Portal;
