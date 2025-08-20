import { Table, Tag } from "antd";
import React, { useEffect, useState } from "react";
import { getUsersRegisteredApi, updateUserRoleApi } from "../../api/client/api";
import toast from "react-hot-toast";

const DashboardTeacherRequest = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const callAPI = async () => {
            const res = await getUsersRegisteredApi();
            if (res.success) setData(res.users);
        };
        callAPI();
    }, []);

    const handleActivate = async (record) => {
        try {
            const res = await updateUserRoleApi(record._id, { role: "teacher" });
            if (res.success) {
                toast.success("Activated as a teacher successfully.");
                setData((prev) =>
                    prev.map((item) =>
                        item._id === record._id ? { ...item, role: "teacher" } : item
                    )
                );
            } else {
                toast.error("Activation failed.");
            }
        } catch {
            toast.error("An error occurred.");
        }
    };

    const handleRevoke = async (record) => {
        try {
            const res = await updateUserRoleApi(record._id, { role: "user" });
            if (res.success) {
                toast.success("Teacher role revoked.");
                setData((prev) =>
                    prev.map((item) =>
                        item._id === record._id ? { ...item, role: "user" } : item
                    )
                );
            } else {
                toast.error("Revocation failed.");
            }
        } catch {
            toast.error("An error occurred.");
        }
    };

    const columns = [
        {
            title: "Email",
            dataIndex: "email",
            key: "email",
            responsive: ["xs", "sm", "md", "lg"],
        },
        {
            title: "User Name",
            dataIndex: "username",
            key: "username",
            responsive: ["sm", "md", "lg"],
        },
        {
            title: "Status",
            key: "status",
            render: (record) => (
                <Tag color={record.role === "user" ? "orange" : "green"}>
                    {record.role === "user" ? "Pending Activation" : "Activated"}
                </Tag>
            ),
        },
        {
            title: "Action",
            key: "action",
            width: 180,
            render: (record) => (
                <div className="flex flex-wrap gap-2">
                    <button
                        onClick={() => handleActivate(record)}
                        disabled={record.role === "teacher"}
                        className={`px-3 py-1 rounded-lg text-sm transition ${
                            record.role === "teacher"
                                ? "bg-gray-400 text-white cursor-not-allowed"
                                : "bg-green-500 text-white hover:bg-green-600"
                        }`}
                    >
                        Activate
                    </button>
                    <button
                        onClick={() => handleRevoke(record)}
                        disabled={record.role === "user"}
                        className={`px-3 py-1 rounded-lg text-sm transition ${
                            record.role === "user"
                                ? "bg-gray-400 text-white cursor-not-allowed"
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
        <div className="px-4 py-6 ">
            <div className="bg-white shadow rounded-xl p-4 min-h-screen">
                <h2 className="text-lg font-semibold mb-4">Teacher Requests</h2>
                <Table
                    dataSource={data}
                    columns={columns}
                    rowKey={(record) => record._id}
                    bordered
                    pagination={{ pageSize: 6 }}
                    scroll={{ x: "100%" }}
                />
            </div>
        </div>
    );
};

export default DashboardTeacherRequest;
