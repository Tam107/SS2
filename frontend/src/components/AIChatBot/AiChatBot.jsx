import { message } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { IoIosSend } from "react-icons/io";
import { addChatApi, getChatsByUserIdApi } from "../../api/client/api";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

const AiChatBot = ({}) => {
  const [chatboxHover, setChatboxHover] = useState(false);
  const stateUser = useSelector((state) => state.UserReducer);
  const [showChat, setShowChat] = useState(false);
  const messagesEndRef = useRef(null);
  const [data, setData] = useState([]);
  const [message, setMessage] = useState("");
  const [disableButton, setDisableButton] = useState(false);
  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView();
    }
  };
  useEffect(() => {
    const fetchApi = async () => {
      const tmp = await getChatsByUserIdApi(stateUser.user._id);
      if (tmp.success) {
        setData(tmp.data);
      }
    };
    fetchApi();
  }, []);
  useEffect(() => {
    scrollToBottom();
  }, [showChat, data]);
  const handleSendChat = async () => {
    setDisableButton(true);
    const dataUser = {
      AI: false,
      message: message,
      userId: stateUser.user._id,
    };
    setData([...data, dataUser]);
    setMessage("");
    const res = await addChatApi(dataUser);
    if (res.success) {
        setDisableButton(false);
      setData([...data, dataUser, res.dataAI]);
      
    } else {
      toast.error("Error in BE, please try again later");
      setDisableButton(false);
    }
  };
  return (
    <>
      <div className="fixed bottom-4 right-4 z-50 ">
        <button
          onMouseEnter={() => setChatboxHover(true)}
          onMouseLeave={() => setChatboxHover(false)}
          onClick={() => setShowChat(!showChat)}
          className="w-24 h-16 cursor-pointer bg-none outline-none"
        >
          <img className="h-full w-full " src="/vcb-logo.png" alt="" />
        </button>
      </div>

      <div
        className={` px-3 rounded-3xl items-center flex fixed bottom-6 right-10 z-50 overflow-hidden ease-in-out transition duration-300 whitespace-nowral ${
          chatboxHover
            ? "max-w-96 h-9 right-32 text-white bg-[#074C31FF]"
            : "max-w-0 h-0  "
        }`}
      >
        Hello, I am assitant. How can I help you?
      </div>
      <div
        className={`
                w-[386px] h-[501px] fixed z-50 right-4 bottom-28 shadow-lg bg-white rounded-xl border overflow-x-hidden overflow-y-hidden
                ${showChat ? "block" : "hidden"}
            `}
      >
        <div
          onClick={() => setShowChat(false)}
          className="text-white justify-between z-10 w-full absolute top-0 px-4 flex items-center overflow-hidden h-12 cursor-pointer"
          style={{
            background:
              "linear-gradient(86.7deg, #074C31FF 0.85%, #A1C038FF 98.94%)",
          }}
        >
          <p className="font-bold">Chat with AI Assistant</p>
          <div className=" flex items-center justify-end">
            <RxCross1
              className="cursor-pointer font-bold"
              onClick={() => setShowChat(false)}
              size={20}
            />
          </div>
        </div>
        {/* div chat */}
        <div className="w-full h-[453px] relative top-[48px] ">
          <div className="absolute h-[400px] w-full py-2 px-4 overflow-y-auto overflow-x-hidden">
            {data.map((item, index) => (
              <div
                key={index}
                className={`flex items-start gap-2 mb-4 ${
                  item.AI ? "justify-start" : "justify-end"
                }`}
              >
                <div
                  className={`p-3 rounded-lg max-w-[70%] ${
                    item.AI
                      ? "bg-[#074C31FF] text-white"
                      : "bg-[#F7F7F7] text-black"
                  }`}
                >
                  {item.message}
                </div>
              </div>
            ))}
            {disableButton && (
              <div className="flex items-start gap-2 mb-4 justify-start">
                <div className="p-3 rounded-lg w-[80%] bg-gray-200 animate-pulse">
                  <div className="h-2 w-full bg-gray-300 rounded"></div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          <div className="absolute bottom-0 w-full h-[50px] flex items-center">
            <input
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  if (disableButton) return;
                  handleSendChat();
                }
              }}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              type="text"
              placeholder="Type your message..."
              className="w-full h-full px-4 border-none outline-none rounded-l-lg"
            />
            <IoIosSend
              onClick={handleSendChat}
              className="text-[#074C31FF] mr-4 transition duration-300 cursor-pointer rounded-full hover:bg-[#ECF1EF]"
              size={30}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default AiChatBot;
