import { Button, Form, Input, Spin } from 'antd'
import React, { useState } from 'react'
import { FcGoogle } from 'react-icons/fc'
import { Link, useNavigate } from 'react-router'
import { registerUserApi } from '../../api/client/api'
import toast from 'react-hot-toast'
import login3Image from "../../assets/main.png";
 
const SignUpPage = ({setOtp,setEmailErrol}) => {
  const [pending,setPending] = useState(false)
  const navigate = useNavigate()
    const handleGoogleLogin = () => {
        console.log(123);
        
        window.location.href = import.meta.env.VITE_GOOGLE_LOGIN_URL + "/login";
    };
    const onFinish = async(value) => {
      setPending(true)
      const {email,username,password} = value
      if(!email){
          return toast.error("Email is not empty!")
      }
      if(!username){
          return toast.error("User name is not empty!")
      }
      if(!password){
          return toast.error("Password is not empty!")
      }

      const res = await registerUserApi({email,username,password});
      console.log(res);
      if(res.success){
        setPending(false)  

        setOtp(res.token)
        setEmailErrol(res.data.email)
        navigate(`/confirmOtp`)
      }else{
        setPending(false)
        toast.error(res.message)
      }
      

      // 
      

    };
  return (
    <div className="flex h-screen">
    <div className="h-full flex items-start justify-center  w-[20%] bg-green-950  ">
      <img className="h-full object-contain flex-1" src={login3Image} alt="" />
    </div>
    <div className="flex-1 pt-16 px-8 overflow-y-scroll">
      <div className="flex w-[40%] flex-col gap-6">
        <div className="flex logo-1 text-green-600 items-center gap-2">
          <p className="text-xl">LOGO</p>
          <h3 className="font-[600] text-xl">Automated Scoreing Essay System</h3>
        </div>
        <div className="text-green-600 font-[600] text-2xl tracking-wider">
          Create your account
        </div>
        <div className=" font-[600] text-xl tracking-wider">
          Have an account?{" "}
          <Link to={"/login"} className="text-blue-700 cursor-pointer">Log in now</Link>
        </div>
        <div>
          <button
            onClick={() => handleGoogleLogin()}
            className="w-full cursor-pointer transition duration-200 hover:shadow hover:shadow-slate-200 border py-2 flex items-center justify-center"
          >
            <FcGoogle className='cursor-pointer' size={30} />
            <p className="cursor-pointer text-slate-600 text-xl pl-4"> Google</p>
          </button>
        </div>
        <div className="">
          <div className="flex  items-center mt-5 divider">
          <div className="flex-grow border-t border-gray-300"></div>
  <span className="mx-4 text-gray-500">Or with email and password</span>
  <div className="flex-grow border-t border-gray-300"></div>
          </div>
        </div>
        <div className="">
          <Form onFinish={onFinish} layout="vertical" autoComplete="off">
            <Form.Item
              hasFeedback
              label="Email Address"
              name="email"
              validateTrigger="onBlur"

              rules={[
                {
                  required: true,
                  message: 'Email is not empty!',
                },
                {
                  type: 'email',
                  message: 'Invalid Email!',
                },
              ]}
              // rules={[{ max: 3 }]}
            >
              <Input type="email"/>
            </Form.Item>
            <Form.Item
              hasFeedback
              label="User name"
              name="username"
              validateTrigger="onBlur"
              // rules={[{ max: 3 }]}
              rules={[
                {
                  required: true,
                  message: 'User name is not empty!',
                },
                
              ]}
            >
              <Input  />
            </Form.Item>

            <Form.Item  rules={[
                {
                  required: true,
                  message: 'Password is not empty!',
                },
                
              ]} hasFeedback label="Password" name="password">
              <Input.Password />
            </Form.Item>

            <Button
              type="primary"
              className={`!bg-green-800 !text-white ${pending&& "!cursor-not-allowed !bg-green-500"}`}
              htmlType="submit"
              disabled ={pending}
            >
              <p className="text-lg font-[500]">Sign up

                {pending &&  <Spin className="!text-red pl-2" size="small">
   
      </Spin>}
              </p>
            </Button>
          </Form>
        </div>
      </div>
    </div>
  </div>
  )
}

export default SignUpPage
