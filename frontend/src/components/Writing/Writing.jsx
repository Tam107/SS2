import { Button, Dropdown, Input, Menu, Tag } from "antd";
import TextArea from "antd/es/input/TextArea";
import React, { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { loadUserAction } from "../../redux/actions/UserAction";
import { useNavigate, useParams } from "react-router";
import PopUp from "../PopUp/PopUp";
import PopUpTeacher from "../PopUpTeacher/PopUpTeacher";
import MenuRight from "../MenuRight/MenuRight";
import PopUpRequest from "../PopUpRequest/PopUpRequest";
import Review from "../Review/Review";
import PopUpList from "../PopUpList/PopUpList";
import { getDocumentByUserApi } from "../../api/client/api";
import AiChatBot from "../AIChatBot/AiChatBot";

const Writing = ({ full, setFull, data,setData }) => {
  const {id} = useParams()
  const navigate = useNavigate();

  const stateUser = useSelector((state) => state.UserReducer);
  const [disable, setDisable] = useState(false);
  const dispatch = useDispatch();
  const [popUpTeacher, setPopupTeacher] = useState(false);
  const inputRef = useRef(null);
  const [showRequest, setShowRequest] = useState(false);
  const [showList, setShowList] = useState(false);
  const [count, setCount] = useState(0);
  const [showReview, setShowReview] = useState(false);
  const [documentById, setDocumentById] = useState([]);
  const getCount = async() => {
    const tmp = stateUser.user.EssaysId.filter((i) => i.isAccepted === false);
    const tmpReview = stateUser?.user?.EssaysId?.find(
      (i) => i.isAccepted === true && i.id._id === data._id
    );
    const tmpDocument = await getDocumentByUserApi(stateUser.user._id);
    console.log(tmpDocument);
    
    if (tmpDocument.success) {
      setDocumentById(tmpDocument.data);
    } else {
      toast.error("Error in BE");
    }
    setDocumentById(tmpDocument.data);

    setShowReview(!!tmpReview);
    


    setCount(tmp?.length || 0);
  };


  useEffect(() => {
    getCount();
  }, [stateUser.user,data,id]);
  const scrollDown = ()=>{
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: "smooth"
    })
  }
  

  return (
    <>
      <div className="relative w-full min-h-screen pl-28 pr-10 py-4 bg-[#F6F5F1]">
        <div className="logo fixed h-full  top-4 left-4">
          <MenuRight
            setShowRequest={setShowRequest}
            count={count}
            user={stateUser.user}
            setShowList={setShowList}
          />
        </div>
        {stateUser.user.role !== "teacher" && (
          <PopUp
            popUpTeacher={popUpTeacher}
            setPopupTeacher={setPopupTeacher}
          />
        )}

        <div className="flex h-full gap-1">
          <div
            className={`${
              full ? "w-full" : "w-[65%]"
            } duration-300 transition-all  h-full bg-white shadow-md  rounded-xl`}
          >
            <div
              className={`w-full py-3 px-8 flex items-center justify-between border-b-[1px] border-gray-200 `}
            >
              <Input.TextArea
                ref={inputRef}
                className="font-[400] text-lg  border-none focus:ring-0 outline-none border-gray-300 rounded-md"
                placeholder="Enter title"
                value={data.title}
                autoSize={{ minRows: 1, maxRows: 7 }} // Tự động điều chỉnh số dòng từ 2 đến 5
              />
            </div>
            <div className="flex-1 flex h-full overflow-hidden">
            <TextArea
              value={data.content}
              className="pt-6 h-full overflow-y-scroll  px-6 border-none rounded-tr-none rounded-tl-none focus:ring-0 outline-none"
              rows={30}
              placeholder="Paste your test"
            />
            </div>
          </div>
          <div
            className={`${
              full ? "w-0" : "w-[35%]"
            }  bg-[#FDFDFC] h-full rounded-xl duration-300 transition-all`}
          >
            
              <div
                className={`w-full duration-300 flex flex-col  transition-all px-2 py-2 `}
              >
                 <div onClick={scrollDown} className="w-full mb-2 flex items-center justify-between rounded-lg border bg-red-500 px-4 py-2">
                  <p className="text-lg font-medium text-[white]">Teacher grade</p>
                  <p className="text-sm font-medium text-white">
                    {data?.teacherGrade?.Overal?.score||"0.0 The teacher does not grade yet"}
                  </p>
                </div>
                <div className="w-full mb-2 flex items-center justify-between rounded-lg border bg-[#17A34A] px-4 py-2">
                  <p className="text-lg font-medium text-[white]">AI overall</p>
                  <p className="text-sm font-medium text-white">
                    {data.path?.total_score}
                  </p>
                </div>
               
                <div className="grid grid-cols-2 h-full gap-2 mb-2">
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
                
                <div className="w-full flex-1  flex flex-col gap-2 overflow-y-scroll ">
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
           
          </div>
        </div>
      </div>
      {
        (showReview || data.isGraded) && (
          <Review setData={setData} data={data}/>
        )
      }
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
      {showList && (
        <>
          <PopUpList
            data={documentById}
            showRequest={showList}
            setShowRequest={setShowList}
          />
        </>
      )}

      <AiChatBot/>
    </>
  );
};

export default Writing;
