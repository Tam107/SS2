import { Button, Form, Input } from 'antd'
import React from 'react'
import { FcGoogle } from 'react-icons/fc'
import Store from '../../redux/store';
import { Link, useNavigate } from 'react-router';
import { loginApi } from '../../api/client/api';
import toast from 'react-hot-toast';
import { loginUserAction } from '../../redux/actions/UserAction';

const Login = () => {
    const navigate = useNavigate()
    const fetchApi = async (data) => {
        Store.dispatch(loginUserAction(data));
      };
    const handleGoogleLogin = () => {
        console.log(123);
        
        window.location.href = "http://localhost:8080/api/auth/login";
    };
    const handleFinish = async(e)=>{
        console.log(e);
    
            const res = await loginApi(e);
            if (!res.success) {
                toast.error(res.message, {
                    style: {
                        maxWidth: 500
                    }
                })
            } else {
                toast.success("Login successfully!")
                fetchApi(res.data)
                navigate("/")
            }
        
      }
  return (
    <>
    
    <div className="flex h-screen overflow-hidden">
          <div className="h-full mt-10 w-[25%] px-6 py-10 ">
            {/* Logo */}
            <div className="flex text-green-700 items-center gap-4 logo mb-4">
              <p className="text-xl">LOGO</p>
              <h3 className="font-[600] text-xl">Ten Du An</h3>
            </div>
            {/* End Logo */}
    
            <h4 className="text-green-700 font-[600] text-2xl mt-8 leading-8 tracking-wider">
              Log in to your account
            </h4>
            <div className=" font-[600] text-xl my-6">
            Don't have an account?{" "}
                <Link to={"/register"} className="text-blue-700 cursor-pointer">Sign up</Link>
              </div>
    
            <div className="w-full mb-6 pr-8">
              {/* Custom Google Login Button */}
              <button
                onClick={() => handleGoogleLogin()}
                className="w-full cursor-pointer transition duration-200 hover:shadow hover:shadow-slate-200 border py-2 flex items-center justify-center"
              >
                <FcGoogle size={30} />
                <p className="text-slate-600 text-xl pl-4">Google</p>
              </button>
            </div>
            <div className="pr-8">
              <div className="flex items-center mt-5 divider">
              <div className="flex-grow border-t border-gray-300"></div>
      <span className="mx-4 text-gray-500">Or with email and password</span>
      <div className="flex-grow border-t border-gray-300"></div>
              </div>
            </div>
            <div className="pr-8 mt-6">
              <Form
               
                layout="vertical"
                autoComplete="on"
                onFinish={handleFinish}
              >
              
    
                <Form.Item
                  hasFeedback
                  label="Email Address"
                  name="email"
                  validateTrigger="onBlur"
                  // rules={[{ max: 3 }]}
                >
                  <Input  />
                </Form.Item>
    
                <Form.Item
                  hasFeedback
                  label="Password"
                  name="password"
                 
                >
                  <Input.Password autoComplete="off" />
                </Form.Item>
    
                <Button type="primary" className="!bg-green-800" htmlType="submit">
            <p className="text-lg font-[500]">Login</p>
          </Button>
    
             
              </Form>
            </div>
          </div>
          <div className="bg-green-700 h-screen flex-1"></div>
        </div></>
  )
}

export default Login
