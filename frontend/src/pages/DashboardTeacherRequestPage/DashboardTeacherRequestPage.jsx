import React from "react";
import SidebarAdmin from "../../components/SidebarAdmin/SidebarAdmin";
import HeaderAdmin from "../../components/HeaderAdmin/HeaderAdmin";
import DashboardTeacherRequest from "../../components/DashboardTeacherRequest/DashboardTeacherRequest";

const DashboardTeacherRequestPage = () => {
  return (
    <>
      <div className="flex">
        <SidebarAdmin />

        <div className="w-full">
          {/* <Dashboard/> */}
          <HeaderAdmin/>
          <hr className="border-t border-gray-200" />
          <DashboardTeacherRequest/>
        </div>
      </div>
    </>
  );
};

export default DashboardTeacherRequestPage;
