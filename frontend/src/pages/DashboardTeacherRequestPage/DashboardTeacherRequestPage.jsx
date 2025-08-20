import React from "react";
import SidebarAdmin from "../../components/SidebarAdmin/SidebarAdmin";
import HeaderAdmin from "../../components/HeaderAdmin/HeaderAdmin";
import DashboardTeacherRequest from "../../components/DashboardTeacherRequest/DashboardTeacherRequest";

const DashboardTeacherRequestPage = () => {
    return (
        <div className="flex min-h-screen bg-gray-50">
            {/* Sidebar */}
            <div className="hidden md:block">
                <SidebarAdmin />
            </div>

            {/* Main content */}
            <div className="flex-1 flex flex-col">
                <HeaderAdmin />
                <hr className="border-t border-gray-200" />
                <div className="flex-1 overflow-auto">
                    <DashboardTeacherRequest />
                </div>
            </div>
        </div>
    );
};

export default DashboardTeacherRequestPage;
