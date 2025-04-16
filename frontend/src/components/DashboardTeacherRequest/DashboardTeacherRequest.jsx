import { Button, Table, Tag } from "antd";
import React, { useEffect, useState } from "react";
import { getUsersRegisteredApi, updateUserRoleApi } from "../../api/client/api";
import toast from "react-hot-toast";

const DashboardTeacherRequest = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const callAPi = async () => {
      const res = await getUsersRegisteredApi();
      if (res.success) {
        setData(res.users);
      }
    };
    callAPi();
  }, []);
  const handleActivate = async (record) => {
    try {
      const res = await updateUserRoleApi(record._id,{ role: 'teacher' });
    //   console.log(res);
      
      if (res.success) {
        toast.success(`Activate as a teacher succefully.`);
        setData((prevData) =>
          prevData.map((item) =>
            item._id === record._id ? { ...item, role: 'teacher' } : item
          )
        );
      } else {
        toast.error('Activation failed.');
      }
    } catch (error) {
        console.log(error);
        
        toast.error('An error occurred.');
    }
  };
  const handleRevoke = async (record) => {
    try {
      const res = await updateUserRoleApi(record._id, { role: 'user' });
      if (res.success) {
        toast.success(`Teacher role has been revoked.`);
        setData((prevData) =>
          prevData.map((item) =>
            item._id === record._id ? { ...item, role: 'user' } : item
          )
        );
      } else {
        toast.error('Revocation failed.');
      }
    } catch (error) {
        toast.error('An error occurred.');
    }
  };
  const columns = [
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "User Name",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Status",
      key: "status",
      render: (record) => (
        <Tag color={record.role === "user" ? "orange" : "green"}>
          {record.role === "user" ? "Pending Activation" : "Activation"}
        </Tag>
      ),
    },
    {
      title: "Action",
      key: "action",
      width:150,
      render: (record) => (
        <div className="flex gap-2">
          <button
            onClick={() => handleActivate(record)}
            disabled={record.role === "teacher"} // Disable nếu đã là teacher
            className={`px-4 py-2 rounded-lg transition ${
              record.role === "teacher"
                ? "bg-gray-500 text-white cursor-not-allowed"
                : "bg-green-500 text-white hover:bg-green-600"
            }`}
          >
            Activate
          </button>
          <button
            onClick={() => handleRevoke(record)}
            disabled={record.role === "user"} // Disable nếu đang là user
            className={`px-4 py-2 rounded-lg transition ${
              record.role === "user"
                ? "bg-gray-500 text-white cursor-not-allowed"
                : "bg-red-500 text-white hover:bg-red-600"
            }`}
          >
            Revoke
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="px-6 py-6">
      <Table
        dataSource={data}
        columns={columns}
        rowKey={(record) => record._id}
        bordered
        className="shadow-md rounded-lg"
      />
    </div>
  );
};

export default DashboardTeacherRequest;
