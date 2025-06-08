import React, { useEffect, useState } from "react";
import { IoIosNotifications } from "react-icons/io";
import { useSelector } from "react-redux";
import { Link } from "react-router";
import { IoListCircle } from "react-icons/io5";
import { IoLogOut } from "react-icons/io5";
import { logoutUserAction } from "../../redux/actions/UserAction";
import Store from "../../redux/store";
import { handleLogoutApi } from "../../api/client/api";

const MenuRight = ({ count, user, setShowRequest,setShowList }) => {
  const handleLogout =async()=>{
    const data = await handleLogoutApi()
    if(data.success){
      Store.dispatch(logoutUserAction());
    }

    
    
    
  }
  return (
    <>
      <Link to={"/"} className="text-2xl text-green-700">
        LOGO
      </Link>
      <br />
      <br />

      {user.role === "teacher" && (
        <>
          <div
            onClick={() => {
              setShowRequest(true);
            }}
            className="flex  p-1 hover:border-2 transition-all duration-150 border-1  items-center gap-1 cursor-pointer"
          >
            <div className="relative">
              <IoIosNotifications size={25} />
              <div className="size-3 text-sm flex items-center justify-center rounded-full p-1 text-white bg-red-500 absolute top-0 right-0 z-10">
                {count}
              </div>
            </div>
            <p className="text-sm">Request</p>
          </div>
          <br />
        </>
      )}
     
      <div
        onClick={() => {
          setShowList(true);
        }}
        className="flex  p-1 hover:border-2 transition-all duration-150 border  items-center gap-1 cursor-pointer"
      >
        <div className="relative">
        <IoListCircle size={25} />
        
        </div>
        <p className="text-sm">History</p>
      </div>
      <br />
      <div
        onClick={() => {
          handleLogout()
        }}
        className="flex  p-1 hover:border-2 transition-all duration-150 border  items-center gap-1 cursor-pointer"
      >
        <div className="relative">
        <IoLogOut size={25} />
        
        </div>
        <p className="text-sm">Log out</p>
      </div>
    </>
  );
};

export default MenuRight;
