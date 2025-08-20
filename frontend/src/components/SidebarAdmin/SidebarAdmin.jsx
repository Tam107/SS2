import React from "react";
import { Link, useLocation } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import { LuGitPullRequestCreateArrow } from "react-icons/lu";

const SidebarAdmin = () => {
    const location = useLocation();

    const navStyle = (path) =>
        `flex items-center space-x-3 px-3 py-2 rounded-lg cursor-pointer transition ${
            location.pathname === path
                ? "bg-indigo-100 text-indigo-700 font-semibold"
                : "hover:bg-indigo-50 text-gray-600"
        }`;

    return (
        <div className="w-56 h-screen bg-white shadow-md border-r hidden md:flex flex-col top-0 left-0">
            {/* Logo */}
            <div className="h-16 flex items-center justify-center border-b">
                <Link to="/dashboard" className="no-underline">
                    <span className="text-xl font-bold text-indigo-600">HOVN Admin</span>
                </Link>
            </div>

            {/* Menu */}
            <div className="flex-1 overflow-y-auto px-2">
                <ul className="mt-4 space-y-4">
                    {/* MAIN */}
                    <div>
                        <p className="text-xs font-semibold text-gray-500 mb-2">MAIN</p>
                        <Link to="/dashboard">
                            <li className={navStyle("/dashboard")}>
                                <DashboardIcon className="text-indigo-600" />
                                <span>Dashboard</span>
                            </li>
                        </Link>
                    </div>

                    {/* LISTS */}
                    <div>
                        <p className="text-xs font-semibold text-gray-500 mb-2">LISTS</p>
                        <Link to="/dashboard-teacher">
                            <li className={navStyle("/dashboard-teacher")}>
                                <PersonOutlineIcon className="text-indigo-600" />
                                <span>Teacher</span>
                            </li>
                        </Link>
                    </div>

                    {/* REQUEST */}
                    <div>
                        <p className="text-xs font-semibold text-gray-500 mb-2">REQUEST</p>
                        <Link to="/dashboard-teacher-request">
                            <li className={navStyle("/dashboard-teacher-request")}>
                                <LuGitPullRequestCreateArrow
                                    size={20}
                                    className="text-indigo-600"
                                />
                                <span>Teacher Request</span>
                            </li>
                        </Link>
                    </div>
                </ul>
            </div>

            {/* Theme Selector */}
            <div className="flex items-center space-x-2 px-3 py-4 border-t">
                <div className="w-6 h-6 rounded-sm border border-indigo-600 cursor-pointer bg-gray-200"></div>
                <div className="w-6 h-6 rounded-sm border border-indigo-600 cursor-pointer bg-gray-800"></div>
            </div>
        </div>
    );
};

export default SidebarAdmin;
