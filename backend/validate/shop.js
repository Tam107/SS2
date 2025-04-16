module.exports.create = (req,res,next)=>{
    if(!req.body.name){
        res.status(400).json({
            code:400,
            message:"Name does not empyty!"
        })
        return;
    }
    if(!req.body.phoneNumber){

        res.status(400).json({
            message:"Phone number does not empyty!"
        })
        return;
    }

    if(!req.body.email){

        res.status(400).json({
            message:"Email does not empyty!"
        })
        return;
    }
    if(!req.body.address){

        res.status(400).json({
            message:"Address does not empyty!"
        })
        return;
    }

    if(!req.body.zipCode){

        res.status(400).json({
            message:"Zip Code does not empyty!"
        })
        return;
    }


    if(!req.body.password){

        res.status(400).json({
            code:400,
            message:"Password does not empyty!"
        })
        return;
    }
    if(req.body.password.length<=4){
        res.status(400).json({
            code:400,
            message:"Password should be greater than 4 characters!"
        })
        return;
    }
  
    next()
}   

module.exports.login = (req,res,next)=>{
    if(!req.body.email){
     

        res.status(400).json({
            message:"Email does not empty!"
        })
        return;
    }
    if(!req.body.password){
        res.status(400).json({
            code:400,
            message:"Password does not empty!"
        })
        return;
    }
   
  
    next()
}