import { Button, Input, Tag } from "antd";
import TextArea from "antd/es/input/TextArea";
import React, { useRef, useState } from "react";
import toast from "react-hot-toast";
import { LuCircleChevronRight } from "react-icons/lu";
import { useDispatch, useSelector } from "react-redux";
import { userRegisterTeacherApi } from "../../api/client/api";
import { loadUserAction } from "../../redux/actions/UserAction";

const Home = ({ title, setTitle, full, setFull,content,setContent }) => {
  const stateUser = useSelector((state) => state.UserReducer);
  const [disable, setDisable] = useState(false);
  const dispatch = useDispatch();
  // focus input
  const inputRef = useRef(null);
  const hanldeFocusInput = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };
  // end focus input

  //handle register
  const handleRegister = async () => {
    setDisable(true);
    if (stateUser.user.isRegister) {
      toast.error("Vui long cho phan hoi");
      setDisable(false);
    } else {
      const res = await userRegisterTeacherApi(stateUser.user._id);
      // console.log(res);

      if (res.success) {
        toast.success("Registered");

        setDisable(true);
        // dispatch(loadUserAction())
      } else {
        toast.error("Registered");
        setDisable(false);
      }
    }
    // setDisable(false)
  };

  const handleSubmit = ()=>{
    console.log(title);
    console.log(content);
    
    
  }
  return (
    <div className="relative w-full h-screen pl-28 pr-10 py-4 bg-[#F6F5F1]">
      <div className="logo fixed top-4 left-4">
        <p className="text-2xl text-green-700">LOGO</p>
      </div>
      <div className="popup fixed top-[10%] right-0 w-[5%] bg-white px-2 py-4 h-80 rounded-tl-xl rounded-bl-xl shadow-lg transition-all duration-300 hover:w-[10%]"></div>
      <div className="flex gap-1">
        <div
          className={`${
            full ? "w-full" : "w-[65%]"
          } duration-300 transition-all  h-full bg-white shadow-md  rounded-xl`}
        >
          <div
            className={`w-full py-3 px-8 flex items-center justify-between border-b-[1px] border-gray-200 `}
          >
            {/* <h3 className='font-[400] pl-6 text-3xl'>Untitled Document</h3> */}
            <Input
              ref={inputRef}
              className="font-[400] text-3xl w-[75%] border-none focus:ring-0 outline-none border-gray-300 rounded-md"
              placeholder="Enter title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />{" "}
            <div className="flex items-center gap-2">
              <div
                onClick={hanldeFocusInput}
                className="px-4 py-2 bg-[#F7F7F7] cursor-pointer rounded-3xl"
              >
                Đổi đề bài
              </div>
              <div
                onClick={() => setFull(!full)}
                className={`p-2 cursor-pointer rounded-full bg-[#F7F7F7]`}
              >
                <LuCircleChevronRight size={22} />
              </div>
            </div>
          </div>
          <TextArea
            value={content}
            onChange={(e) => setContent(e.target.value)} // Sửa lại để lấy giá trị từ e.target.value
            className="pt-14 h-screen  px-6 border-none rounded-tr-none rounded-tl-none focus:ring-0 outline-none"
            rows={30}
            placeholder="Paste your test"
          />
        </div>
        <div
          style={{ height: "calc(100vh - 16px)" }}
          className={`${
            full ? "w-0" : "w-[30%]"
          }  bg-[#FDFDFC] rounded-xl duration-300 transition-all`}
        >
          {!full && (
            <>
              <div
                className={`w-full duration-300 transition-all py-3 pb-4 px-4 flex items-center gap-2 justify-end border-b-[1px] border-gray-200 `}
              >
                {stateUser?.user?.role === "teacher" ? (
                  <Tag
                    color="green"
                    className="text-lg font-medium px-4 py-2 rounded-lg"
                  >
                    Teacher
                  </Tag>
                ) : (
                  <Button
                    onClick={handleRegister}
                    type="primary"
                    size="large"
                    className={`!bg-green-700 font-[500]`}
                    disabled={stateUser?.user?.isRegister || disable}
                  >
                    Register Teacher
                  </Button>
                )}
                <button
                  onClick={handleSubmit}
                  className="px-6 py-2 bg-blue-500 text-white text-sm font-medium rounded-lg hover:bg-blue-600 transition"
                >
                  Submit for Review
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
