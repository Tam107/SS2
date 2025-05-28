import React, { useEffect, useState } from "react";
import { IoIosNotifications } from "react-icons/io";
import { useSelector } from "react-redux";
import { Link } from "react-router";

const MenuRight = ({count,user,setShowRequest}) => {
  
 
  
  
  return (
    <>
      <Link to={"/"} className="text-2xl text-green-700">LOGO</Link>
      <br />
      <br />
      {user.role === "teacher" && (
        <>
          <div onClick={()=>{setShowRequest(true)}} className="flex  p-1 hover:border-2 transition-all duration-150 border  items-center gap-1 cursor-pointer">
            <div  className="relative">
              <IoIosNotifications size={25} />
              <div className="size-3 text-sm flex items-center justify-center rounded-full p-1 text-white bg-red-500 absolute top-0 right-0 z-10">
                {count}
              </div>
            </div>
            <p className="text-sm">Request</p>
          </div>
        </>
      )}
    </>
  );
};

export default MenuRight;
