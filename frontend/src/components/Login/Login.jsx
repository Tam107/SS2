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
        window.location.href = import.meta.env.VITE_GOOGLE_LOGIN_URL + "/login";
    };

    const handleFinish = async (e) => {
        const res = await loginApi(e);
        if (!res.success) {
            toast.error(res.message, { style: { maxWidth: 500 } });
        } else {
            toast.success("Login successfully!");
            fetchApi(res.data);
            navigate("/");
        }
    };

    return (
        <div className="flex flex-col lg:flex-row h-screen bg-gradient-to-br from-green-50 to-white">
            {/* Left Side - Image & Tagline */}
            <div className="hidden lg:flex h-full w-[35%] bg-green-900 items-center justify-center relative">
                <img
                    className="max-h-[80%] object-contain drop-shadow-lg"
                    src={login3Image}
                    alt="Login Illustration"
                />
                <div className="absolute bottom-8 px-6 text-center text-white text-lg font-medium">
                    <p>
                        AI-Powered IELTS Essay Scoring with instant feedback & expert tips
                        to achieve your goals.
                    </p>
                </div>
            </div>

            {/* Right Side - Form */}
            <div className="flex-1 flex items-center justify-center px-6 lg:px-16">
                <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 md:p-10">
                    {/* Logo */}
                    <div className="flex items-center gap-2 text-green-700 mb-6">
                        <p className="text-2xl font-bold">LOGO</p>
                        <h3 className="font-semibold text-xl">
                            Automated Essay Scoring System
                        </h3>
                    </div>

                    {/* Title */}
                    <h2 className="text-green-800 font-bold text-2xl md:text-3xl tracking-wide mb-4">
                        Log in to your account
                    </h2>

                    {/* Switch to sign up */}
                    <p className="text-gray-600 mb-6">
                        Don’t have an account?{" "}
                        <Link
                            to={"/register"}
                            className="text-green-700 font-medium hover:underline"
                        >
                            Sign up
                        </Link>
                    </p>

                    {/* Google Login */}
                    <button
                        onClick={handleGoogleLogin}
                        className="w-full border rounded-lg py-2 flex items-center justify-center gap-3 shadow-sm hover:shadow-md transition"
                    >
                        <FcGoogle size={26} />
                        <span className="text-gray-700 font-medium">Login with Google</span>
                    </button>

                    {/* Divider */}
                    <div className="flex items-center my-6">
                        <div className="flex-grow border-t border-gray-300"></div>
                        <span className="mx-4 text-gray-400 text-sm">or</span>
                        <div className="flex-grow border-t border-gray-300"></div>
                    </div>

                    {/* Form */}
                    <Form layout="vertical" autoComplete="on" onFinish={handleFinish}>
                        <Form.Item
                            label="Email Address"
                            name="email"
                            hasFeedback
                            validateTrigger="onBlur"
                        >
                            <Input
                                type="email"
                                className="rounded-lg py-2"
                                placeholder="Enter your email"
                            />
                        </Form.Item>

                        <Form.Item label="Password" name="password" hasFeedback>
                            <Input.Password
                                autoComplete="off"
                                className="rounded-lg py-2"
                                placeholder="Enter your password"
                            />
                        </Form.Item>

                        <Button
                            type="primary"
                            className="!bg-green-700 hover:!bg-green-800 !text-white w-full h-11 mt-2 rounded-lg shadow-md transition"
                            htmlType="submit"
                        >
                            <span className="text-lg font-semibold">Login</span>
                        </Button>
                    </Form>
                </div>
            </div>
        </div>
    );
};

export default Login;
