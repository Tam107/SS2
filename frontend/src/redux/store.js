import {configureStore} from "@reduxjs/toolkit"
import { UserReducer } from "./reducers/UserReducer";
import { AdminReducer } from "./reducers/AdminReducer";



const Store = configureStore({
    reducer:{
        UserReducer:UserReducer,
        AdminReducer:AdminReducer
        
    }
})

export default Store;