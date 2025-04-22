import { getUserApi } from "../../api/client/api";

export const loadUserAction = ()=>async(dispatch)=>{
    try {
        dispatch({
            type:"LoadUserRequest",

        })
        const data = await getUserApi()
        console.log(data,1);
        
        if(data.success){
            dispatch({
                type:"LoadUserSuccess",
                payload:data.user
    
            })
        } 
       else{
        dispatch({
            type:"LoadUserFail",
            payload:"Login to continue",

        })
       }
        
    } catch (error) {
        dispatch({
            type:"LoadUserFail",
            payload:error?.response?.data?.message||"Error in axios",

        })
    }
}



export const loginUserAction = (data) => async (dispatch) => {
    try {
       

        dispatch({
            type: "LoadUserSuccess",
            payload: data,
        });

    } catch (error) {
        dispatch({
            type: "LoadUserFail",
            payload: error?.response?.data?.message || "Error in axios",
        });
    }
};

export const logoutUserAction = (data) => async (dispatch) => {
    try {
        dispatch({
            type: "LogoutUserSuccess"
        });

    } catch (error) {
        dispatch({
            type: "LoadUserFail",
            payload: error?.response?.data?.message || "Error in axios",
        });
    }
};