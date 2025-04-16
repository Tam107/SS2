import React from "react";
// import Dashboard from '../../components/Dashboard/Dashboard'
import SidebarAdmin from "../../components/SidebarAdmin/SidebarAdmin";
import { Link } from "react-router";
import HeaderAdmin from "../../components/HeaderAdmin/HeaderAdmin";

const DashboardPage = () => {
  return (
    <>
      <div className="flex">
        <SidebarAdmin />

        <div className="w-full">
          {/* <Dashboard/> */}
          <HeaderAdmin/>
          <hr className="border-t border-gray-200" />
        </div>
      </div>
    </>
  );
};

export default DashboardPage;
