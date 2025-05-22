import React, { useState } from 'react'
import { IoAddCircle } from "react-icons/io5";

const PopUp = ({setPopupTeacher}) => {
    const [isHovered,setIsHovered] = useState(false)
  
  return (
   <>
     <div
    onMouseEnter={()=>{setIsHovered(true)}}
    onMouseLeave={() => setIsHovered(false)}
    className="popup fixed top-[10%] right-0 w-[2%] bg-white px-2 py-4 h-80 rounded-tl-xl rounded-bl-xl shadow-lg transition-all duration-300 hover:w-[15%]">
      {!isHovered &&<IoAddCircle size={20} className='' /> }
        <div 
        onClick={()=>setPopupTeacher(true)}
        className='flex cursor-pointer items-center w-full gap-2'>
          {isHovered&& <IoAddCircle size={35} className='' />}
          {isHovered && <p className='text-sm'>Invited teacher</p>}
        </div>

    </div>
   </>

  )
}

export default PopUp
