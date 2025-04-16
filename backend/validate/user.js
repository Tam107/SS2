export const registerUserValidate = (req,res,next)=>{
    if(!req.body.username){
        res.status(400).json({
            code:400,
            message:"User name is required! "
        })
        return;
    }
    if(!req.body.email){

        res.status(400).json({
            message:"Email is required!"
        })
        return;
    }
    if(!req.body.password){

        res.status(400).json({
            code:400,
            message:"Password is required!"
        })
        return;
    }
   
   
    next()
}   

export const loginUserValidate = (req,res,next)=>{
    if(!req.body.email){
        res.json({
            message:"Email does not empty!",
            success:false
        })
        return;
    }
    if(!req.body.password){
        res.json({
            success:false,
            message:"Password does not empty!"
        })
        return;
    }
   
    next()
}