import { Button, Table } from "antd";
import React from "react";
import { RxCross1 } from "react-icons/rx";
import { acceptedEssaysApi } from "../../api/client/api";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

const PopUpRequest = ({ data, showRequest, setShowRequest }) => {
    const navigate = useNavigate()
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
      dataIndex: ["id", "title"],
      key: "title",
    },
    {
      title: "Time Request",
      dataIndex: ["id", "createdAt"],
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
      title: "Action",
      key: "action",

      render: (record) => (
        <div className="flex gap-2">
          <Button
            disabled={record.isAccepted}
            onClick={() => acceptedEssays(record)}
            type="primary"
          >
            {record.isAccepted ? "Accepted" : "Accept Request"}
          </Button>
          {record.isAccepted && (
            <>
              <Button
               
                onClick={() => {
                  setShowRequest(false);
                  navigate(`/writing/${record.id._id}`)
                }}
                type="primary"
              >
                Go to Essay
              </Button>
            </>
          )}
        </div>
      ),
    },
  ];
  return (
    <>
      <div className="fixed top-0 left-0 h-screen w-full bg-[#00000042] ">
        <div className="bg-white w-[60%] p-6 relative rounded-3xl  mx-auto top-[2%]">
          <div className="w-full flex items-center justify-end">
            <RxCross1
              className="cursor-pointer"
              onClick={() => setShowRequest(false)}
              size={20}
            />
          </div>
          <div>
            <h1 className="text-2xl font-semibold">Request Essays</h1>
            <Table
              columns={columns}
              dataSource={data}
              pagination={{ pageSize: 5 }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default PopUpRequest;
