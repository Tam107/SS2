import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import StoreIcon from "@mui/icons-material/Store";
import LocalActivityOutlinedIcon from "@mui/icons-material/LocalActivityOutlined";
import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import SettingsSystemDaydreamOutlinedIcon from "@mui/icons-material/SettingsSystemDaydreamOutlined";
import PsychologyOutlinedIcon from "@mui/icons-material/PsychologyOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { Link, useLocation } from "react-router-dom";
import { LuHotel } from "react-icons/lu";
import { LuGitPullRequestCreateArrow } from "react-icons/lu";

const SidebarAdmin = () => {
  const location = useLocation();

  // Kiểm tra xem có đang ở trang /dashboard không
  const navStyle = (path) =>
    `flex items-center space-x-3 cursor-pointer px-2 py-1 rounded-md hover:bg-indigo-100 ${
      location.pathname === path ? "bg-indigo-100" : ""
    }`;

  return (
    <div className="w-[230px]  h-screen bg-white shadow-sm overflow-y-scroll border-r-[1px] sticky top-0 left-0 z-10 ">
      <div className="flex flex-col h-full">
        <div className="flex-1 flex flex-col">
          <div className="h-14 flex items-center justify-center">
            <Link to="/dashboard" style={{ textDecoration: "none" }}>
              <span className="text-2xl font-[500] text-[#6439ff]">
                HOVN Admin
              </span>
            </Link>
          </div>
          <hr className="border-t border-gray-200" />
          <div className="px-2 flex-1">
            <ul className="space-y-4 h-full flex flex-col gap-1 mb-0">
              <div className="flex flex-col gap-1 mb-0">
                <p className="text-xs font-semibold text-gray-500 mt-3 mb-2">
                  MAIN
                </p>
                <Link to="/dashboard">
                  <li className={navStyle("/dashboard")}>
                    <DashboardIcon className="text-indigo-600" />
                    <span className="text-sm font-semibold text-gray-600">
                      Dashboard
                    </span>
                  </li>
                </Link>
              </div>

              <div className="flex flex-col gap-1 mb-0">
                <p className="text-xs font-semibold text-gray-500 mt-3 mb-2">
                  LISTS
                </p>
                <div className="flex flex-col">
                 
                  <Link to="/dashboard-teacher" style={{ textDecoration: "none" }}>
                    <li  className={`${navStyle("/dashboard-teacher")}`}>
                      <PersonOutlineIcon className="text-indigo-600" />
                      <span className="text-sm font-semibold text-gray-600">
                        Teacher
                      </span>
                    </li>
                  </Link>
                  {/* <Link to="/dashboard-view-homes" style={{ textDecoration: "none" }}>
                    <li className={navStyle("/dashboard-view-homes")}>
                      <StoreIcon className="text-indigo-600" />
                      <span className="text-sm font-semibold text-gray-600">
                        Homes
                      </span>
                    </li>
                  </Link>
                  <Link to="/dashboard-view-room" style={{ textDecoration: "none" }}>
                    <li className={navStyle("/dashboard-view-room")}>
                      <CreditCardIcon className="text-indigo-600" />
                      <span className="text-sm font-semibold text-gray-600">
                        Rooms
                      </span>
                    </li>
                  </Link> */}
                  {/* <Link to="/delivery" style={{ textDecoration: "none" }}>
                    <li className="flex items-center space-x-3 cursor-pointer hover:bg-indigo-100 px-2 py-1 rounded-md">
                      <LocalShippingIcon className="text-indigo-600" />
                      <span className="text-sm font-semibold text-gray-600">
                        Delivery
                      </span>
                    </li>
                  </Link> */}
                </div>
              </div>
              <div className="flex flex-col gap-1 mb-0">
                <p className="text-xs font-semibold text-gray-500 mt-3 mb-2">
                  REQUEST
                </p>
                <div className="flex flex-col">
                  
                  <Link to="/dashboard-teacher-request" style={{ textDecoration: "none" }}>
                    <li className={`${navStyle("/dashboard-teacher-request")}`}>
                      <LuGitPullRequestCreateArrow size={22} className="text-indigo-600" />
                      <span className="text-sm font-semibold text-gray-600">
                        Teacher Request
                      </span>
                    </li>
                  </Link>
               
                  {/* <Link to="/dashboard-view-homes" style={{ textDecoration: "none" }}>
                    <li className={navStyle("/dashboard-view-homes")}>
                      <StoreIcon className="text-indigo-600" />
                      <span className="text-sm font-semibold text-gray-600">
                        Homes
                      </span>
                    </li>
                  </Link>
                  <Link to="/dashboard-view-room" style={{ textDecoration: "none" }}>
                    <li className={navStyle("/dashboard-view-room")}>
                      <CreditCardIcon className="text-indigo-600" />
                      <span className="text-sm font-semibold text-gray-600">
                        Rooms
                      </span>
                    </li>
                  </Link> */}
                  {/* <Link to="/delivery" style={{ textDecoration: "none" }}>
                    <li className="flex items-center space-x-3 cursor-pointer hover:bg-indigo-100 px-2 py-1 rounded-md">
                      <LocalShippingIcon className="text-indigo-600" />
                      <span className="text-sm font-semibold text-gray-600">
                        Delivery
                      </span>
                    </li>
                  </Link> */}
                </div>
              </div>

            

              
            </ul>
          </div>
        </div>
        <div>
          <div className="flex  items-center space-x-2 px-2 pb-4">
            <div className="w-5 h-5 rounded-sm border border-indigo-600 cursor-pointer bg-gray-200"></div>
            <div className="w-5 h-5 rounded-sm border border-indigo-600 cursor-pointer bg-gray-800"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SidebarAdmin;
{
  /* <div className="h-12 flex items-center justify-center">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="text-lg font-bold text-indigo-600">HOVN Admin</span>
        </Link>
      </div>
      <hr className="border-t border-gray-200" />
      <div className="px-2 flex-1">
        <ul className="space-y-4">
          <p className="text-xs font-semibold text-gray-500 mt-3 mb-2">MAIN</p>
          <li className="flex items-center space-x-3 cursor-pointer hover:bg-indigo-100 px-2 py-1 rounded-md">
            <DashboardIcon className="text-indigo-600" />
            <span className="text-sm font-semibold text-gray-600">Dashboard</span>
          </li>

          <p className="text-xs font-semibold text-gray-500 mt-3 mb-2">LISTS</p>
          <Link to="/users" style={{ textDecoration: "none" }}>
            <li className="flex items-center space-x-3 cursor-pointer hover:bg-indigo-100 px-2 py-1 rounded-md">
              <PersonOutlineIcon className="text-indigo-600" />
              <span className="text-sm font-semibold text-gray-600">Users</span>
            </li>
          </Link>
          <Link to="/hotels" style={{ textDecoration: "none" }}>
            <li className="flex items-center space-x-3 cursor-pointer hover:bg-indigo-100 px-2 py-1 rounded-md">
              <StoreIcon className="text-indigo-600" />
              <span className="text-sm font-semibold text-gray-600">Hotels</span>
            </li>
          </Link>
          <Link to="/rooms" style={{ textDecoration: "none" }}>
            <li className="flex items-center space-x-3 cursor-pointer hover:bg-indigo-100 px-2 py-1 rounded-md">
              <CreditCardIcon className="text-indigo-600" />
              <span className="text-sm font-semibold text-gray-600">Rooms</span>
            </li>
          </Link>
          <li className="flex items-center space-x-3 cursor-pointer hover:bg-indigo-100 px-2 py-1 rounded-md">
            <LocalShippingIcon className="text-indigo-600" />
            <span className="text-sm font-semibold text-gray-600">Delivery</span>
          </li>

          <p className="text-xs font-semibold text-gray-500 mt-3 mb-2">USEFUL</p>
          <li className="flex items-center space-x-3 cursor-pointer hover:bg-indigo-100 px-2 py-1 rounded-md">
            <InsertChartIcon className="text-indigo-600" />
            <span className="text-sm font-semibold text-gray-600">Stats</span>
          </li>
          <li className="flex items-center space-x-3 cursor-pointer hover:bg-indigo-100 px-2 py-1 rounded-md">
            <NotificationsNoneIcon className="text-indigo-600" />
            <span className="text-sm font-semibold text-gray-600">Notifications</span>
          </li>

          <p className="text-xs font-semibold text-gray-500 mt-3 mb-2">SERVICE</p>
          <li className="flex items-center space-x-3 cursor-pointer hover:bg-indigo-100 px-2 py-1 rounded-md">
            <SettingsSystemDaydreamOutlinedIcon className="text-indigo-600" />
            <span className="text-sm font-semibold text-gray-600">System Health</span>
          </li>
          <li className="flex items-center space-x-3 cursor-pointer hover:bg-indigo-100 px-2 py-1 rounded-md">
            <PsychologyOutlinedIcon className="text-indigo-600" />
            <span className="text-sm font-semibold text-gray-600">Logs</span>
          </li>
          <li className="flex items-center space-x-3 cursor-pointer hover:bg-indigo-100 px-2 py-1 rounded-md">
            <SettingsApplicationsIcon className="text-indigo-600" />
            <span className="text-sm font-semibold text-gray-600">Settings</span>
          </li>

          <p className="text-xs font-semibold text-gray-500 mt-3 mb-2">USER</p>
          <li className="flex items-center space-x-3 cursor-pointer hover:bg-indigo-100 px-2 py-1 rounded-md">
            <AccountCircleOutlinedIcon className="text-indigo-600" />
            <span className="text-sm font-semibold text-gray-600">Profile</span>
          </li>
          <li className="flex items-center space-x-3 cursor-pointer hover:bg-indigo-100 px-2 py-1 rounded-md">
            <ExitToAppIcon className="text-indigo-600" />
            <span className="text-sm font-semibold text-gray-600">Logout</span>
          </li>
        </ul>
      </div>

      <div className="flex items-center space-x-2 px-2 pb-4">
        <div className="w-5 h-5 rounded-sm border border-indigo-600 cursor-pointer bg-gray-200"></div>
        <div className="w-5 h-5 rounded-sm border border-indigo-600 cursor-pointer bg-gray-800"></div>
      </div> */
}
