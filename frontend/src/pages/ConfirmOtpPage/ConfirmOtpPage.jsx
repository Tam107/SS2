import React, { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import { styles } from "../../styles/style";
import { TbMessageCheck } from "react-icons/tb";
import { checkTokenOtp } from "../../api/client/api";

const ConfirmOtpPage = ({ emailErrol,setOtp, otp }) => {
  const navigate = useNavigate();
  const [otpValues, setOtpValues] = useState(new Array(6).fill(""));
  const inputRefs = useRef([]);

  useEffect(() => {
    if (!otp) {
      toast.error("Please register first", {
        style: {
          maxWidth: 500,
        },
        duration: 3000,
      });
      navigate(`/register`);
    }
  }, [otp,emailErrol]);
  const handleChange = (value, index) => {
    if (isNaN(value)) return; // Chỉ cho phép nhập số

    const newOtpValues = [...otpValues];
    newOtpValues[index] = value;
    setOtpValues(newOtpValues);

    // Tự động chuyển sang ô tiếp theo nếu có
    if (value && index < 5) {
      inputRefs.current[index + 1].focus();
    }

    // Gửi OTP đầy đủ khi đã nhập xong
    if (newOtpValues.every((digit) => digit !== "")) {
      setOtp(newOtpValues.join(""));
      finish(newOtpValues.join("")); // Gọi hàm finish khi nhập xong
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otpValues[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const finish = async(otp) => {
    // Hàm xử lý khi nhập xong OTP
    console.log("OTP hoàn thành:", otp);
    const res =await checkTokenOtp({otp:otp})
     if(res.success){   
        toast.success(res.message)
        navigate(`/login`)
     }
     else{
        toast.error(res.message)
        if(res.code === 401){
            navigate(`/register`)
        }
      
     }
    
  };
  return (
    <>
      <div className="flex h-screen">
        <div className="h-full  w-[20%] bg-green-700  "></div>
        <div className="pt-16 px-8 w-[50%] flex flex-col gap-8 mx-auto overflow-y-scroll">
          
            <div className="flex logo-1 w-[80%] text-green-600 items-center gap-2">
            {/* <h3 className="font-[600] text-green-600 text-xl">Automated Scoreing Essay System</h3> */}
              
            </div>
            <div className="mx-auto w-[65%]">
           
            <h3 className="font-[600] text-xl">Great, now verify your email</h3>
            </div>
            <div className="mx-auto w-[45%]">
              <TbMessageCheck size={100} color="green"/>
            </div>

            <div className="mx-auto w-[85%]">
            <p className="font-[500] text-[#3E4E58] text-lg">Check your inbox at <span className="text-black">{emailErrol}</span> and fill the code to complete your registration.Verify soon!</p>
            </div>
            <div className="mx-auto w-[85%]">
            <p className="font-[500] text-lg text-[#3E4E58]"><span className="text-black">Don't see an email?</span> Check your spam folder.

</p>
            </div>
            <div className="mx-auto w-[75%]">
            <div className="flex items-center gap-2">
            {otpValues.map((value, index) => (
              <input
                key={index}
                type="text"
                maxLength="1"
                value={value}
                onChange={(e) => handleChange(e.target.value, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                ref={(el) => (inputRefs.current[index] = el)}
                className="w-12 h-12 text-center border border-gray-300 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            ))}
          </div>
            </div>
            
        </div>
      </div>
    </>
  );
};

export default ConfirmOtpPage;
