import { useEffect, useState } from "react";

import LoginPage from "./pages/LoginPage/LoginPage";
import { Route, Routes } from "react-router";
import { Toaster } from "react-hot-toast";
import SignUpPage from "./pages/SignUpPage/SignUpPage";
import ConfirmOtpPage from "./pages/ConfirmOtpPage/ConfirmOtpPage";
import { loadUserAction } from "./redux/actions/UserAction";
import Store from "./redux/store";
import HomePage from "./pages/HomePage/HomePage";
import PrivateRoute from "./pages/PrivateRoute/PrivateRoute";
import DashboardPage from "./pages/DashboardPage/DashboardPage";
import LoginDashboardPage from "./pages/LoginDashboardPage/LoginDashboardPage";
import { loadAdminAction } from "./redux/actions/AdminAction";
import PrivateRouteAdmin from "./pages/PrivateRouteAdmin/PrivateRouteAdmin";
import DashboardTeacherRequestPage from "./pages/DashboardTeacherRequestPage/DashboardTeacherRequestPage";
import WritingPage from "./pages/WritingPage/WritingPage";

function App() {
  // const [count, setCount] = useState(0)
  const [otp, setOtp] = useState("");
  const [emailErrol, setEmailErrol] = useState();
  useEffect(() => {
    const fetchApi = async () => {
      Store.dispatch(loadUserAction());
      Store.dispatch(loadAdminAction());
    };
    fetchApi();
  }, []);
  return (
    <>
      <Toaster />
      <Routes>
        <Route path="/" element={ <PrivateRoute>
              <HomePage />
            </PrivateRoute>} />

            <Route path="/writing/:id" element={ <PrivateRoute>
              <WritingPage />
            </PrivateRoute>} />

        <Route
          path="/login"
          element={
           <LoginPage/>
          }
        />
        <Route
          path="/register"
          element={<SignUpPage setEmailErrol={setEmailErrol} setOtp={setOtp} />}
        />
        <Route
          path="/confirmOtp"
          element={
            <ConfirmOtpPage emailErrol={emailErrol} otp={otp} setOtp={setOtp} />
          }
        />

        <Route path="/dashboard-login" element={<LoginDashboardPage />} />
        <Route path="/dashboard" element={<PrivateRouteAdmin><DashboardPage /></PrivateRouteAdmin>} />
        
        <Route path="/dashboard-teacher-request" element={<PrivateRouteAdmin><DashboardTeacherRequestPage/></PrivateRouteAdmin>} />



      

      </Routes>
    </>
  );
}

export default App;
