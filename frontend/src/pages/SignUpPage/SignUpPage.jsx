import { Button, Form, Input, Spin } from "antd";
import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router";
import { registerUserApi } from "../../api/client/api";
import toast from "react-hot-toast";
import login3Image from "../../assets/main.png";

const SignUpPage = ({ setOtp, setEmailErrol }) => {
    const [pending, setPending] = useState(false);
    const navigate = useNavigate();

    const handleGoogleLogin = () => {
        window.location.href = import.meta.env.VITE_GOOGLE_LOGIN_URL + "/login";
    };

    const onFinish = async (value) => {
        setPending(true);
        const { email, username, password } = value;

        if (!email) return toast.error("Email is not empty!");
        if (!username) return toast.error("User name is not empty!");
        if (!password) return toast.error("Password is not empty!");

        const res = await registerUserApi({ email, username, password });

        if (res.success) {
            setPending(false);
            setOtp(res.token);
            setEmailErrol(res.data.email);
            navigate(`/confirmOtp`);
        } else {
            setPending(false);
            toast.error(res.message);
        }
    };

    return (
        <div className="flex flex-col lg:flex-row h-screen bg-gradient-to-br from-green-50 to-white">
            {/* Left Side - Image */}
            <div className="hidden lg:flex h-full w-[35%] bg-green-900 items-center justify-center relative">
                <img
                    className="max-h-[80%] object-contain drop-shadow-lg"
                    src={login3Image}
                    alt="Signup Illustration"
                />
                <div className="absolute bottom-8 px-6 text-center text-white text-lg font-medium">
                    <p>
                        Boost your IELTS Writing with AI-powered essay scoring, instant
                        feedback & expert tips.
                    </p>
                </div>
            </div>

            {/* Right Side - Form */}
            <div className="flex-1 flex items-center justify-center lg:px-16">
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
                        Create your account
                    </h2>

                    {/* Switch to login */}
                    <p className="text-gray-600 mb-6">
                        Already have an account?{" "}
                        <Link
                            to={"/login"}
                            className="text-green-700 font-medium hover:underline"
                        >
                            Log in
                        </Link>
                    </p>

                    {/* Google Sign Up */}
                    <button
                        onClick={handleGoogleLogin}
                        className="w-full border rounded-lg py-2 flex items-center justify-center gap-3 shadow-sm hover:shadow-md transition"
                    >
                        <FcGoogle size={26} />
                        <span className="text-gray-700 font-medium">Sign up with Google</span>
                    </button>

                    {/* Divider */}
                    <div className="flex items-center my-6">
                        <div className="flex-grow border-t border-gray-300"></div>
                        <span className="mx-4 text-gray-400 text-sm">or</span>
                        <div className="flex-grow border-t border-gray-300"></div>
                    </div>

                    {/* Form */}
                    <Form onFinish={onFinish} layout="vertical" autoComplete="off">
                        <Form.Item
                            label="Email Address"
                            name="email"
                            hasFeedback
                            validateTrigger="onBlur"
                            rules={[
                                { required: true, message: "Email is not empty!" },
                                { type: "email", message: "Invalid Email!" },
                            ]}
                        >
                            <Input
                                type="email"
                                className="rounded-lg py-2"
                                placeholder="Enter your email"
                            />
                        </Form.Item>

                        <Form.Item
                            label="Username"
                            name="username"
                            hasFeedback
                            validateTrigger="onBlur"
                            rules={[{ required: true, message: "User name is not empty!" }]}
                        >
                            <Input
                                className="rounded-lg py-2"
                                placeholder="Choose a username"
                            />
                        </Form.Item>

                        <Form.Item
                            label="Password"
                            name="password"
                            hasFeedback
                            rules={[{ required: true, message: "Password is not empty!" }]}
                        >
                            <Input.Password
                                className="rounded-lg py-2"
                                placeholder="Create a password"
                            />
                        </Form.Item>

                        <Button
                            type="primary"
                            className={`!bg-green-700 hover:!bg-green-800 !text-white w-full h-11 mt-2 rounded-lg shadow-md transition ${
                                pending && "!cursor-not-allowed !bg-green-400"
                            }`}
                            htmlType="submit"
                            disabled={pending}
                        >
              <span className="text-lg font-semibold flex items-center justify-center">
                Sign up
                  {pending && <Spin className="pl-2" size="small" />}
              </span>
                        </Button>
                    </Form>
                </div>
            </div>
        </div>
    );
};

export default SignUpPage;
