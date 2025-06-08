import { Button, Table, Tag } from "antd";
import React from "react";
import { RxCross1 } from "react-icons/rx";
import { acceptedEssaysApi } from "../../api/client/api";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

const PopUpList = ({ data, showRequest, setShowRequest }) => {
  console.log(data);

  const navigate = useNavigate();
  const acceptedEssays = async (data) => {
    const response = await acceptedEssaysApi(data.id._id);
    if (response.success) {
      toast.success("Accepted request successfully!");
      setShowRequest(false);
      window.location.reload();
    } else {
      toast.error(response?.message || "Error when accepting request");
      setShowRequest(false);
    }
  };
  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Time Request",
      dataIndex: "createdAt",
      key: "username",
      render: (createdAt) => {
        const date = new Date(createdAt);
        return date.toLocaleString("en-US", {
          timeZone: "Asia/Ho_Chi_Minh",
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        });
      },
    },
    {
      title: "Status",
      key: "status",
      render: (record) => {
        return (
          <Tag color={record.teacherGrade?.Overal?.score ? "green" : "orange"}>
            {record.teacherGrade?.Overal?.score ? "Graded" : "Processing"}
          </Tag>
        )
      },
    },
    {
      title:"Email teacher",
      key: "emailTeacher",
      dataIndex:"teacherInfo",
      render:(record)=>{
        return record ? record.email : "Not graded yet";
      }
    },
    {
      title: "Action",
      key: "action",

      render: (record) => (
        <div className="flex gap-2">
          
          <Button
                onClick={() => {
                  setShowRequest(false);
                  navigate(`/writing/${record._id}`);
                }}
                type="primary"
              >
                Go to Essay
              </Button>
        </div>
      ),
    },
  ];
  return (
    <>
      <div className="fixed top-0 left-0  h-screen w-full flex items-center justify-center bg-[#00000042]">
        <div className="bg-white  w-full max-w-[80%] my-2  p-6 relative rounded-3xl mx-auto ">
          <div className="w-full flex items-center justify-end">
            <RxCross1
              className="cursor-pointer"
              onClick={() => setShowRequest(false)}
              size={20}
            />
          </div>
          <div>
            <h1 className="text-2xl font-semibold">List Submitted</h1>
            <Table
              columns={columns}
              dataSource={[...data].reverse()}
              pagination={{ pageSize: 4 }}
            
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default PopUpList;
