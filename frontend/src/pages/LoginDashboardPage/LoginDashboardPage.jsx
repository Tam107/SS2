import React, { useEffect } from "react";
import { Form, Input, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { loginAdminAction } from "../../redux/actions/AdminAction";
import { loginAdminApi } from "../../api/client/api";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";

const LoginDashboardPage = () => {
 
  const dispatch = useDispatch();
  const stateAdmin = useSelector((state) => state.AdminReducer);
  
  
  const navigation = useNavigate();
  useEffect(() => {
    console.log(stateAdmin);
    
    if (stateAdmin.isAuthenticated) {

      navigation("/dashboard");
    }
  }, [dispatch, stateAdmin]);

  const onFinish = async (e) => {
    const res = await loginAdminApi(e);
    // console.log(res);
    
    if (res.success) {
      toast.success(res.message);
    //   console.log(res);
      dispatch(loginAdminAction(res.data));
      navigation("/dashboard");
    } else {
      toast.error(res.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">
          Admin Login
        </h2>
        <Form name="login" layout="vertical" onFinish={onFinish}>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Please input your email!" },
              { type: "email", message: "Please enter a valid email!" },
            ]}
            validateTrigger="onBlur"
          >
            <Input type="email" placeholder="Enter your email" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password placeholder="Enter your password" />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="w-full  "
            >
              Login
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default LoginDashboardPage;
