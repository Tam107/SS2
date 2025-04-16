import { getAdminApi } from "../../api/client/api"

export const loadAdminAction = ()=>async(dispatch)=>{
    try {
        dispatch({
            type:"LoadAdminRequest",

        })
        const data = await getAdminApi()
        console.log(data)
        if(data.success){
            // console.log(1);
            dispatch({
                type:"LoadAdminSuccess",
                payload:data.data
    
            })
        } 
       else{
        dispatch({
            type:"LoadAdminFail",
            payload:"Login to continue",

        })
       }
        
    } catch (error) {
        dispatch({
            type:"LoadAdminFail",
            payload:error?.response?.data?.message||"Error in axios",

        })
    }
}



export const loginAdminAction = (data) => async (dispatch) => {
    try {
        dispatch({
            type: "LoadAdminSuccess",
            payload: data,
        });

    } catch (error) {
        dispatch({
            type: "LoadAdminFail",
            payload: error?.response?.data?.message || "Error in axios",
        });
    }
};


export const logoutAdminAction = (data) => async (dispatch) => {
    try {
        dispatch({
            type: "LogoutAdminSuccess"
        });

    } catch (error) {
        dispatch({
            type: "LoadAdminFail",
            payload: error?.response?.data?.message || "Error in axios",
        });
    }
};