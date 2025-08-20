import React from "react";
import { IoIosNotifications } from "react-icons/io";
import { IoListCircle, IoLogOut } from "react-icons/io5";
import { Link } from "react-router";
import { logoutUserAction } from "../../redux/actions/UserAction";
import Store from "../../redux/store";
import { handleLogoutApi } from "../../api/client/api";

const MenuRight = ({ count, user, setShowRequest, setShowList }) => {
    const handleLogout = async () => {
        const data = await handleLogoutApi();
        if (data.success) {
            Store.dispatch(logoutUserAction());
        }
    };

    return (
        <div className="flex flex-col items-start gap-4 p-2 bg-white rounded-2xl shadow-md w-full max-w-[250px]">
            {/* Logo */}
            <Link to={"/"} className="text-2xl font-bold text-green-600 tracking-wide">
                LOGO
            </Link>

            {/* Teacher request button */}
            {user.role === "teacher" && (
                <div
                    onClick={() => setShowRequest(true)}
                    className="flex items-center gap-2 px-3 py-2 w-full rounded-xl cursor-pointer hover:bg-green-50 transition-colors"
                >
                    <div className="relative">
                        <IoIosNotifications size={26} className="text-green-600" />
                        {count > 0 && (
                            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-semibold rounded-full w-5 h-5 flex items-center justify-center shadow">
                {count}
              </span>
                        )}
                    </div>
                    <p className="text-sm font-medium text-gray-700">Requests</p>
                </div>
            )}

            {/* History */}
            <div
                onClick={() => setShowList(true)}
                className="flex items-center gap-2 px-3 py-2 w-full rounded-xl cursor-pointer hover:bg-blue-50 transition-colors"
            >
                <IoListCircle size={26} className="text-blue-600" />
                <p className="text-sm font-medium text-gray-700">History</p>
            </div>

            {/* Logout */}
            <div
                onClick={handleLogout}
                className="flex items-center gap-2 px-3 py-2 w-full rounded-xl cursor-pointer hover:bg-red-50 transition-colors"
            >
                <IoLogOut size={26} className="text-red-600" />
                <p className="text-sm font-medium text-gray-700">Log out</p>
            </div>
        </div>
    );
};

export default MenuRight;
