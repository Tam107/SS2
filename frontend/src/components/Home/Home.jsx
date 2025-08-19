import { Button, Dropdown, Input, Menu, Tag } from "antd";
import TextArea from "antd/es/input/TextArea";
import React, { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { LuCircleChevronRight } from "react-icons/lu";
import { useDispatch, useSelector } from "react-redux";
import {
  createPostTitleTaskTwoApi,
  createTitleTaskTwoApi,
  getDocumentByUserApi,
  submitTask2,
  userRegisterTeacherApi,
} from "../../api/client/api";
import { useNavigate } from "react-router";
import MenuRight from "../MenuRight/MenuRight";
import PopUpRequest from "../PopUpRequest/PopUpRequest";
import PopUpList from "../PopUpList/PopUpList";
import AiChatBot from "../AIChatBot/AiChatBot";


const Home = ({
  title,
  setTitle,
  full,
  setFull,
  content,
  setContent,
  showRequest,
  setShowRequest,
  showList,
  setShowList,
}) => {
  const { isAuthenticated, loading, user } = useSelector(
    (state) => state.UserReducer
  );
  // count request
  const [count, setCount] = useState(0);
  const [documentById, setDocumentById] = useState([]);
  const getCount = async() => {
    const tmp = user.EssaysId.filter((i) => i.isAccepted === false);

    setCount(tmp?.length || 0);
    const tmpDocument = await getDocumentByUserApi(user._id);
    if (tmpDocument.success) {
      setDocumentById(tmpDocument.data);
    } else {
      toast.error("Error in BE");
    }
  };
  useEffect(() => {
    getCount();
  }, [user]);
  const navigate = useNavigate();

  const [disableButton, setDisableButton] = useState(false);
  const [disableSubmitButton, setDisableSubmitButton] = useState(false);
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

  //handle create writing
  const handleCreateWriting = async () => {
    setDisableButton(true);
    const res = await createTitleTaskTwoApi();
    if (res.success) {
      setTitle(res.data);
      setDisableButton(false);
    }
    setDisableButton(false);
  };
  const handleCreateWriting2 = async () => {
    setDisableButton(true);
    if (title) {
      const res = await createPostTitleTaskTwoApi({ topic: title });
      if (res.success) {
        setTitle(res.data);
        setDisableButton(false);
      } else {
        console.log(res);

        toast.error("Error in BE");
      }
    }

    setDisableButton(false);
  };

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

  const handleSubmit = async () => {
    setDisableSubmitButton(true);
    if (title === "" || content === "") {
      toast.error("Vui lòng nhập đề bài và nội dung");
      setDisableSubmitButton(false);
      return;
    }
    const res = await submitTask2({ title, content, _id: user._id });
    console.log(res);

    if (res.success) {
      // setTitle(res.data);
      setDisableSubmitButton(false);
      navigate(`/writing/${res.doc._id}`);
    } else {
      setDisableSubmitButton(false);
      toast.error(res.message);
    }
    setDisableSubmitButton(false);
  };
  const menu = (
    <Menu>
      <Menu.Item key="1" onClick={handleCreateWriting}>
        Generate random topic
      </Menu.Item>
      <Menu.Item key="2" onClick={handleCreateWriting2}>
        Generate by your topic
      </Menu.Item>
    </Menu>
  );

  

  return (
    <>
      <div className="relative w-full h-screen pl-28 pr-10 py-4 bg-[#F6F5F1]">
        <div className="logo fixed top-4 left-4">
          <MenuRight
            setShowRequest={setShowRequest}
            user={user}
            count={count}
            setShowList={setShowList}
          />
          
        </div>

        <div className="flex h-full  gap-1">
          <div
            className={`${
              full ? "w-full" : "w-[65%]"
            } duration-300 transition-all flex flex-col  h-full bg-white shadow-md  rounded-xl`}
          >
            <div
              className={`w-full  py-3 px-8 flex items-center justify-between border-b-[1px] border-gray-200 `}
            >
              <Input.TextArea
                ref={inputRef}
                className="font-[400] text-lg w-[50%] border-none focus:ring-0 outline-none border-gray-300 rounded-md"
                placeholder="Enter title"
                value={title}
                autoSize={{ minRows: 1, maxRows: 7 }} // Tự động điều chỉnh số dòng từ 2 đến 5
                onChange={(e) => setTitle(e.target.value)}
              />{" "}
              <div className="flex  items-center gap-1">
                <Dropdown overlay={menu} trigger={["click"]}>
                  <div
                    className={`relative  px-6 py-2 rounded-3xl text-black transition-all duration-300 ${
                      disableButton
                        ? "bg-gray-300 cursor-not-allowed"
                        : "bg-[#F7F7F7] hover:bg-gray-200 cursor-pointer"
                    }`}
                    style={{ position: "relative" }}
                  >
                    {disableButton ? (
                      <div className="flex items-center justify-center gap-2">
                        <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                        <span>Đang tạo...</span>
                      </div>
                    ) : (
                      "Generate Topic"
                    )}
                  </div>
                </Dropdown>
                <div
                  onClick={hanldeFocusInput}
                  className="px-4 py-2 bg-[#F7F7F7] cursor-pointer rounded-3xl"
                >
                  Change Topic
                </div>
                <div
                  onClick={() => setFull(!full)}
                  className={`p-2 cursor-pointer rounded-full bg-[#F7F7F7]`}
                >
                  <LuCircleChevronRight size={22} />
                </div>
              </div>
            </div>
            <div className="flex-1 flex h-full overflow-hidden">
              <TextArea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="pt-6 px-6 h-full w-full  border-none focus:ring-0 outline-none resize-none"
                placeholder="Paste your test"
              />
            </div>
          </div>
          <div
            className={`${
              full ? "w-0" : "w-[30%]"
            }  bg-[#FDFDFC] h-full rounded-xl duration-300 transition-all`}
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
                    disabled={disableSubmitButton}
                    onClick={handleSubmit}
                    className={`px-6 py-2 text-white text-sm font-medium rounded-lg transition ${
                      disableSubmitButton
                        ? "bg-gray-300 cursor-not-allowed"
                        : "bg-blue-500 hover:bg-blue-600"
                    }`}
                  >
                    Submit for Review
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {showRequest && (
        <>
          <PopUpRequest
            data={user.EssaysId}
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

export default Home;
