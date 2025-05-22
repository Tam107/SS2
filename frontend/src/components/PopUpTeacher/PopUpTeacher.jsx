import { Button, Table } from "antd";
import React, { useEffect, useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { getTeacher, inviteTeacherApi } from "../../api/client/api";
import toast from "react-hot-toast";

const PopUpTeacher = ({dataEssay,setShowModel}) => {
    const [data,setData]= useState([])
    const [loading,setLoading] = useState(false)
    const inviteTeacher = async(idTeacher,email)=>{
        setLoading(true)
        const tmp = await inviteTeacherApi(dataEssay._id,{idTeacher,email})
        console.log(tmp);
        
        if(tmp.success){   
            toast.success("Invited success fully!")
            setShowModel(false)
        }
        else{
            toast.error("Error when invited")
            setShowModel(false)
        }
        setLoading(false)
    }
    const columns = [
        {
          title: "Email",
          dataIndex: "email",
          key: "email",
        },
        {
          title: "Teacher Name",
          dataIndex: "username",
          key: "username",
        },
        {
            title:"Number of Graded Essays",
            dataIndex: "gradedCount",
            key:'gradedCount',
            render: (gradedCount) => gradedCount || 0,
        },
        {
          title: "Action",
          key: "action",
          
          render: (record) => (
            <div className="flex gap-2">
                <Button 
                 disabled={!!dataEssay.teacherGrade || loading} 
                onClick={()=>inviteTeacher(record._id,record.email)} type="primary">
                    Invited to grade
                </Button>
            </div>
          ),
        },
      ];
      const api = async()=>{
        const tmp = await getTeacher()
        if(tmp.success) setData(tmp.users)
      }
      useEffect(()=>{
        api()
      },[])
    
  return (
    <>
      <div className="w-full fixed top-0 left-0 h-screen z-50 bg-[#00000042] ">
        <div className="bg-white w-[60%] p-6 relative rounded-3xl  mx-auto top-[25%]">
          <div className="w-full flex items-center justify-end">
            <RxCross1
              className="cursor-pointer"
              onClick={() => setShowModel(false)}
              size={20}
            />
          </div>
          <div>
            <h1 className="text-2xl font-semibold">List teacher you can choose</h1>
            <Table
                columns={columns}
                dataSource={data}
                pagination={{pageSize:5}}
            />
          </div>
          
        </div>
      </div>
    </>
  );
};

export default PopUpTeacher;
