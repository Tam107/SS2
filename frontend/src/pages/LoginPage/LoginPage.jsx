import React, { useEffect } from "react";
import Login from "../../components/Login/Login";
import { useNavigate } from "react-router";
import { useSelector } from 'react-redux';
import toast from "react-hot-toast";


const LoginPage = () => {

  const StateUser= useSelector(state=>state.UserReducer)
  const navigate = useNavigate()
  

  const check = ()=>{
      if(StateUser.isAuthenticated){
        // toast.error("Đã đăng nhập")
          navigate("/")
      }
  }
  useEffect(()=>{check()},[StateUser])
  

  return <>
    <Login/>
  </>
};

export default LoginPage;
