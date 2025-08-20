import React from "react";
import { Tooltip } from "antd";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { LuGitPullRequestCreateArrow } from "react-icons/lu";
import { HiMenu } from "react-icons/hi";

const HeaderAdmin = ({ onMenuClick }) => {
    return (
        <div className="h-16 bg-white shadow-sm flex items-center justify-between px-4 sticky top-0 z-20">
            {/* Mobile menu button */}
            <div className="md:hidden">
                <button
                    onClick={onMenuClick}
                    className="p-2 rounded-md hover:bg-gray-100 focus:outline-none"
                >
                    <HiMenu size={24} className="text-gray-700" />
                </button>
            </div>

            {/* Right icons */}
            <div className="flex items-center gap-6 ml-auto">
                <Tooltip title="Request as a teacher" arrow>
                    <LuGitPullRequestCreateArrow
                        className="text-gray-600 cursor-pointer hover:text-indigo-600 transition"
                        size={26}
                    />
                </Tooltip>

                <Tooltip title="Dashboard" arrow>
                    <DashboardIcon
                        className="text-gray-600 cursor-pointer hover:text-indigo-600 transition"
                        fontSize="medium"
                    />
                </Tooltip>
            </div>
        </div>
    );
};

export default HeaderAdmin;
