import { Button, Dropdown, Input, Menu, Tag } from "antd";
import TextArea from "antd/es/input/TextArea";
import React, { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { loadUserAction } from "../../redux/actions/UserAction";
import { useNavigate } from "react-router";
import PopUp from "../PopUp/PopUp";
import PopUpTeacher from "../PopUpTeacher/PopUpTeacher";
import MenuRight from "../MenuRight/MenuRight";
import PopUpRequest from "../PopUpRequest/PopUpRequest";
import Review from "../Review/Review";

const Writing = ({ full, setFull, data }) => {
  const navigate = useNavigate();

  const stateUser = useSelector((state) => state.UserReducer);
  const [disable, setDisable] = useState(false);
  const dispatch = useDispatch();
  const [popUpTeacher, setPopupTeacher] = useState(false);
  const inputRef = useRef(null);
  const [showRequest, setShowRequest] = useState(false);
  const [count, setCount] = useState(0);
  const getCount = () => {
    const tmp = stateUser.user.EssaysId.filter((i) => i.isAccepted === false);

    setCount(tmp?.length || 0);
  };
  useEffect(() => {
    getCount();
  }, [stateUser.user]);

  return (
    <>
      <div className="relative w-full h-screen pl-28 pr-4 py-4 bg-[#F6F5F2]">
        <div className="logo fixed top-4 left-4">
          <MenuRight
            setShowRequest={setShowRequest}
            count={count}
            user={stateUser.user}
          />
        </div>
        {stateUser.user.role !== "teacher" && (
          <PopUp
            popUpTeacher={popUpTeacher}
            setPopupTeacher={setPopupTeacher}
          />
        )}

        <div className="flex w-full gap-1">
          <div
            style={{ height: "calc(100vh - 20px)" }}
            className={`${
              full ? "w-full" : "w-[65%]"
            } duration-300 transition-all   bg-white shadow-md  rounded-xl`}
          >
            <div
              className={`w-full flex flex-col py-3 px-8  items-center justify-between border-b-[1px] border-gray-200 `}
            >
              {/* <h3 className='font-[400] pl-6 text-3xl'>Untitled Document</h3> */}
              <Input.TextArea
                ref={inputRef}
                className="font-[400] text-lg  border-none focus:ring-0 outline-none border-gray-300 rounded-md"
                placeholder="Enter title"
                value={data.title}
                autoSize={{ minRows: 1, maxRows: 5 }} // Tự động điều chỉnh số dòng từ 2 đến 5
              />{" "}
            </div>
            <TextArea
              value={data.content}
              className="pt-6 h-screen  flex-1  px-6 border-none rounded-tr-none rounded-tl-none focus:ring-0 outline-none"
              rows={29}
              placeholder="Paste your test"
            />
          </div>
          <div
            style={{ height: "calc(100vh - 20px)" }}
            className={`${
              full ? "w-0" : "flex-1"
            }  bg-[#FDFDFC] rounded-xl duration-300 transition-all`}
          >
            {!full && (
              <>
                <div
                  className={`w-full duration-300 transition-all px-2 py-2 `}
                >
                  <div className="grid grid-cols-2 gap-2 mb-2">
                    <div className="w-full flex items-center justify-between rounded-lg border bg-[#F1F5F9] px-4 py-2">
                      <p className="text-sm text-[#7F8BA0]">Task Response</p>
                      <p className="text-lg font-medium text-black">
                        {data.path?.Task_Response.score}
                      </p>
                    </div>
                    <div className="w-full flex items-center justify-between rounded-lg border bg-[#F1F5F9] px-4 py-2">
                      <p className="text-sm text-[#7F8BA0]">Lexical Resource</p>
                      <p className="text-lg font-medium text-black">
                        {data.path?.Lexical_Resource.score}
                      </p>
                    </div>
                    <div className="w-full flex items-center justify-between rounded-lg border bg-[#F1F5F9] px-4 py-2">
                      <p className="text-sm text-[#7F8BA0]">
                        Grammatical Range & Accuracy
                      </p>
                      <p className="text-lg font-medium text-black">
                        {data.path?.Grammatical_Range_and_Accuracy.score}
                      </p>
                    </div>
                    <div className="w-full flex items-center justify-between rounded-lg border bg-[#F1F5F9] px-4 py-2">
                      <p className="text-sm text-[#7F8BA0]">
                        Coherence & Cohesion
                      </p>
                      <p className="text-lg font-medium text-black">
                        {data.path?.Coherence_and_Cohesion.score}
                      </p>
                    </div>
                  </div>
                  <div className="w-full mb-2 flex items-center justify-between rounded-lg border bg-[#17A34A] px-4 py-2">
                    <p className="text-lg font-medium text-[white]">Overall</p>
                    <p className="text-lg font-medium text-white">
                      {data.path?.total_score}
                    </p>
                  </div>
                  <div className="w-full  max-h-[600px] flex flex-col gap-2 overflow-y-scroll ">
                    <div className="w-full flex flex-col gap-1 aspect-[8/2] p-2 rounded-lg border border-red-200 bg-red-100/50 bg-[#FFEFF0]">
                      <div className="w-fit rounded-lg items-center border text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 capitalize font-medium px-2.5 py-1 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 border-red-200 dark:border-red-700/30">
                        Task Response
                      </div>
                      <div className="text-sm">
                        {data?.path?.Task_Response.comment}
                      </div>
                    </div>
                    <div className="w-full aspect-[8/2] p-2 rounded-lg border border-blue-200 bg-blue-100/50 bg-[#FFEFF0]">
                      <div className="inline-flex rounded-lg items-center border text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 capitalize font-medium px-2.5 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 border-blue-200 dark:border-blue-700/30">
                        Lexical Resource
                      </div>
                      <div className="text-sm">
                        {data?.path?.Lexical_Resource.comment}
                      </div>
                    </div>
                    <div className="w-full aspect-[8/2] p-2 rounded-lg border border-yellow-200 bg-yellow-100/50 bg-[#FFEFF0]">
                      <div className="inline-flex rounded-lg items-center border text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 capitalize font-medium px-2.5 py-1 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 border-yellow-200 dark:border-yellow-700/30">
                        Grammatical Range & Accuracy
                      </div>
                      <div className="text-sm">
                        {data?.path?.Grammatical_Range_and_Accuracy.comment}
                      </div>
                    </div>
                    <div className="w-full aspect-[8/2] p-2 rounded-lg border border-green-200 bg-green-100/50 bg-[#FFEFF0]">
                      <div className="inline-flex rounded-lg items-center border text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 capitalize font-medium px-2.5 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 border-green-200 dark:border-green-700/30">
                        Coherence & Cohesion
                      </div>
                      <div className="text-sm">
                        {data?.path?.Coherence_and_Cohesion.comment}
                      </div>
                    </div>
                    <div className="w-full aspect-[8/2] p-2 rounded-lg border border-purple-200 bg-purple-100/50 bg-[#FFEFF0]">
                      <div className="inline-flex rounded-lg items-center border text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 capitalize font-medium px-2.5 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 border-purple-200 dark:border-purple-700/30">
                        FeedBack
                      </div>
                      <div className="text-sm">{data?.path?.Feedback}</div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      <Review/>
      {popUpTeacher && (
        <PopUpTeacher dataEssay={data} setShowModel={setPopupTeacher} />
      )}
      {showRequest && (
        <>
          <PopUpRequest
            data={stateUser.user.EssaysId}
            showRequest={showRequest}
            setShowRequest={setShowRequest}
          />
        </>
      )}
    </>
  );
};

export default Writing;
