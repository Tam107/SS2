import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();


export const createActiveToken = (data)=>{
    return jwt.sign(data,process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_EXPIRE
    })
}

export const sendToken = (data,statusCode,res)=>{


    data.password = "";
    const token = data.getJwtToken()
    // Options for cookies
    const options = {
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
      httpOnly: true,
      sameSite: "none",
      secure: true,
    };
  
    res.status(statusCode).cookie("token", token, options).json({
      success: true,
      data,
      token,
    });
}


export const sendOtpToken = (data,statusCode,res)=>{

  const token = data.getJwtToken()
  // Options for cookies
  const options = {
    expires: new Date(Date.now() + 3*60 * 1000),
    httpOnly: true,
    sameSite: "none",
    secure: true,
  };

  res.status(statusCode).cookie("tokenOtp", token, options).json({
    success: true,
    data,
    token,
  });
}



export const sendAdminToken = (data,statusCode,res)=>{


  data.password = "";
  const token = data.getJwtToken()
  // Options for cookies
  const options = {
    expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
    httpOnly: true,
    sameSite: "none",
    secure: true,
  };

  res.status(statusCode).cookie("tokenAdmin", token, options).json({
    success: true,
    data,
    token,
    message:"Admin login successfully"
  });
}