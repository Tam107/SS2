import { Button, Dropdown, Input, Menu, Tag, Drawer } from "antd";
import TextArea from "antd/es/input/TextArea";
import React, { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { LuCircleChevronRight, LuMenu } from "react-icons/lu";
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
    const { user } = useSelector((state) => state.UserReducer);
    const [count, setCount] = useState(0);
    const [documentById, setDocumentById] = useState([]);
    const [disableButton, setDisableButton] = useState(false);
    const [disableSubmitButton, setDisableSubmitButton] = useState(false);
    const [disable, setDisable] = useState(false);
    const [openMenu, setOpenMenu] = useState(false);

    const navigate = useNavigate();
    const inputRef = useRef(null);

    // Count + fetch docs
    const getCount = async () => {
        const tmp = user?.EssaysId?.filter((i) => i.isAccepted === false);
        setCount(tmp?.length || 0);
        const tmpDocument = await getDocumentByUserApi(user._id);
        if (tmpDocument.success) {
            setDocumentById(tmpDocument.data);
        } else {
            toast.error("Error in BE");
        }
    };

    useEffect(() => {
        if (user) getCount();
    }, [user]);

    const hanldeFocusInput = () => {
        inputRef.current?.focus();
    };

    // Generate topic
    const handleCreateWriting = async () => {
        setDisableButton(true);
        const res = await createTitleTaskTwoApi();
        if (res.success) setTitle(res.data);
        setDisableButton(false);
    };
    const handleCreateWriting2 = async () => {
        setDisableButton(true);
        if (title) {
            const res = await createPostTitleTaskTwoApi({ topic: title });
            if (res.success) setTitle(res.data);
            else toast.error("Error in BE");
        }
        setDisableButton(false);
    };

    // Register teacher
    const handleRegister = async () => {
        setDisable(true);
        if (user.isRegister) {
            toast.error("Vui lòng chờ phản hồi");
            setDisable(false);
        } else {
            const res = await userRegisterTeacherApi(user._id);
            if (res.success) {
                toast.success("Registered");
                setDisable(true);
            } else {
                toast.error("Registered failed");
                setDisable(false);
            }
        }
    };

    // Submit
    const handleSubmit = async () => {
        setDisableSubmitButton(true);
        if (title === "" || content === "") {
            toast.error("Vui lòng nhập đề bài và nội dung");
            setDisableSubmitButton(false);
            return;
        }
        const res = await submitTask2({ title, content, _id: user._id });
        if (res.success) {
            navigate(`/writing/${res.doc._id}`);
        } else {
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
            <div className="relative w-full h-screen bg-[#F6F5F1] flex flex-col">
                {/* Top bar for mobile */}
                <div className="w-full flex items-center justify-between px-4 py-3 bg-white shadow-sm lg:hidden">
                    <div className="text-xl font-bold text-green-700">LOGO</div>
                    <LuMenu
                        size={26}
                        onClick={() => setOpenMenu(true)}
                        className="cursor-pointer text-gray-700"
                    />
                </div>

                {/* Sidebar for desktop */}
                <div className="hidden lg:block fixed top-6 left-6 z-20">
                    <MenuRight
                        setShowRequest={setShowRequest}
                        user={user}
                        count={count}
                        setShowList={setShowList}
                    />
                </div>

                {/* Main Content */}
                <div className="flex flex-1 flex-col lg:flex-row lg:ml-7 gap-6 px-4 lg:pl-32 py-6">
                    {/* Left Editor */}
                    <div
                        className={`${
                            full ? "w-full" : "lg:w-2/3"
                        } flex flex-col h-full bg-white shadow-lg rounded-2xl overflow-hidden transition-all duration-300`}
                    >
                        {/* Header */}
                        <div className="w-full py-3 px-4 flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between border-b border-gray-200">
                            <Input.TextArea
                                ref={inputRef}
                                className="font-medium text-base w-full sm:w-1/2 border-none focus:ring-0 outline-none rounded-md resize-none"
                                placeholder="Enter title"
                                value={title}
                                autoSize={{ minRows: 1, maxRows: 3 }}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                            <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                                <Dropdown overlay={menu} trigger={["click"]}>
                                    <Button
                                        className="rounded-xl !px-5"
                                        disabled={disableButton}
                                        loading={disableButton}
                                    >
                                        Generate Topic
                                    </Button>
                                </Dropdown>
                                <Button onClick={hanldeFocusInput} className="rounded-xl !px-5">
                                    Change Topic
                                </Button>
                                <div
                                    onClick={() => setFull(!full)}
                                    className="p-2 cursor-pointer rounded-full bg-gray-100 hover:bg-gray-200 transition"
                                >
                                    <LuCircleChevronRight size={20} />
                                </div>
                            </div>
                        </div>

                        {/* Text Area */}
                        <div className="flex-1 overflow-y-auto">
                            <TextArea
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                className="p-4 h-full w-full border-none focus:ring-0 outline-none resize-none"
                                placeholder="Write your essay here..."
                            />
                        </div>
                    </div>

                    {/* Right Panel */}
                    {!full && (
                        <div className="lg:w-1/4  bg-white rounded-2xl shadow-lg flex flex-col h-fit">
                            <div className="w-full py-5 px-5 lg:flex-row-reverse flex  items-center gap-3 justify-between border-b border-gray-200">
                                {user?.role === "teacher" ? (
                                    <Tag color="green" className="text-base font-medium px-4 py-2 rounded-lg">
                                        Teacher
                                    </Tag>
                                ) : (
                                    <Button
                                        onClick={handleRegister}
                                        type="primary"
                                        className="!bg-green-700 font-medium w-full sm:w-auto rounded-xl"
                                        disabled={user?.isRegister || disable}
                                    >
                                        Register Teacher
                                    </Button>
                                )}
                                <Button
                                    disabled={disableSubmitButton}
                                    onClick={handleSubmit}
                                    className="w-full max-w-3xl sm:w-auto px-6 py-2 text-white font-medium rounded-xl transition bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300"
                                >
                                    Submit for Review
                                </Button>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Drawer Menu for mobile */}
            <Drawer
                placement="left"
                onClose={() => setOpenMenu(false)}
                open={openMenu}
                bodyStyle={{ padding: 0 }}
            >
                <MenuRight
                    setShowRequest={setShowRequest}
                    user={user}
                    count={count}
                    setShowList={setShowList}
                />
            </Drawer>

            {/* Popups */}
            {showRequest && (
                <PopUpRequest
                    data={user?.EssaysId}
                    showRequest={showRequest}
                    setShowRequest={setShowRequest}
                />
            )}
            {showList && (
                <PopUpList
                    data={documentById}
                    showRequest={showList}
                    setShowRequest={setShowList}
                />
            )}
            <AiChatBot />
        </>
    );
};

export default Home;
