import { Button, Form, Input } from "antd";
import React from "react";
import { FcGoogle } from "react-icons/fc";
import Store from "../../redux/store";
import { Link, useNavigate } from "react-router";
import { loginApi } from "../../api/client/api";
import toast from "react-hot-toast";
import { loginUserAction } from "../../redux/actions/UserAction";
import login3Image from "../../assets/main.png";

const Login = () => {
  const navigate = useNavigate();
  const fetchApi = async (data) => {
    Store.dispatch(loginUserAction(data));
  };
  const handleGoogleLogin = () => {
    console.log(123);

    window.location.href = import.meta.env.VITE_GOOGLE_LOGIN_URL+"/login";
  };
  const handleFinish = async (e) => {
    console.log(e);

    const res = await loginApi(e);
    if (!res.success) {
      toast.error(res.message, {
        style: {
          maxWidth: 500,
        },
      });
    } else {
      toast.success("Login successfully!");
      fetchApi(res.data);
      navigate("/");
    }
  };
  return (
    <>
      <div className="flex h-screen overflow-hidden">
        <div className="h-full mt-10 w-[28%] px-6 py-10 ">
          {/* Logo */}
          <div className="flex items-center gap-2 logo">
            <h3 className="font-[600] text-md underline">
              {/* AI-Powered IELTS Essay Scoring Platform with Instant Feedback and
              Expert Reviews to Help You Improve Your Writing Skills and Achieve
              Your Goals. */}
            </h3>
          </div>
          {/* End Logo */}

          <h4 className="text-green-700 font-[600] text-2xl mt-4 leading-8 tracking-wider">
            Log in to your account
          </h4>
          <div className=" font-[600] text-xl my-6">
            Don't have an account?{" "}
            <Link to={"/register"} className="text-blue-700 cursor-pointer">
              Sign up
            </Link>
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
              <span className="mx-4 text-gray-500">
                Or with email and password
              </span>
              <div className="flex-grow border-t border-gray-300"></div>
            </div>
          </div>
          <div className="pr-8 mt-6">
            <Form layout="vertical" autoComplete="on" onFinish={handleFinish}>
              <Form.Item
                hasFeedback
                label="Email Address"
                name="email"
                validateTrigger="onBlur"
                // rules={[{ max: 3 }]}
              >
                <Input />
              </Form.Item>

              <Form.Item hasFeedback label="Password" name="password">
                <Input.Password autoComplete="off" />
              </Form.Item>

              <Button
                type="primary"
                className="!bg-green-800"
                htmlType="submit"
              >
                <p className="text-lg font-[500]">Login</p>
              </Button>
            </Form>
          </div>
        </div>
        <div className="bg-green-950 h-screen  flex-1">
          <h1 className="text-white text-4xl text-center mt-8">
            Automated Essays Scoring System{" "}
          </h1>
          {/* <div className="mt-4 h-full  w-full ">
            <div className="w-full h-full gap-2 flex-col flex">
              <div className="flex w-full h-[50%] justify-end">
                <img
                  className="w-[70%] h-full object-cover"
                  src={loginImage}
                  alt=""
                />
              </div>
              <div className="flex w-full  h-[48%] justify-end">
                <img
                  className="w-[70%] h-[90%] object-cover"
                  src={login2Image}
                  alt=""
                />
              </div>
            </div>
          </div> */}
          <div className=" h-full  w-full flex items-start justify-between">
            <div className="w-[40%] mt-8 p-8"><h3 className="font-[400] text-white text-md underline">
              AI-Powered IELTS Essay Scoring Platform with Instant Feedback and
              Expert Reviews to Help You Improve Your Writing Skills and Achieve
              Your Goals.
            </h3></div>
            <img className="h-full object-contain flex-1" src={login3Image} alt="" />
          </div>

          {/* <div className="flex flex-col justify-between">
            <div className="my-6  px-8 w-full flex justify-end">
              <img
                className="w-[50%]"
                src="https://www.imda.gov.sg/-/media/imda/images/content/news-and-events/impact-news-2024/04/ai-governance/ai-governance.webp"
                alt=""
              />
            </div>
            <div className="my-6  px-8 w-full flex justify-start">
              <img
                className="w-[50%]"
                src="https://www.imda.gov.sg/-/media/imda/images/content/news-and-events/impact-news-2024/04/ai-governance/ai-governance.webp"
                alt=""
              />
            </div>
          </div> */}
        </div>
      </div>
    </>
  );
};

export default Login;
