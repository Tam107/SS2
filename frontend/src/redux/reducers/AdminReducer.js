import {createReducer} from "@reduxjs/toolkit"

const initialState = {
    isAuthenticated: false,
    loading: true, // Trạng thái ban đầu là đang tải
    data: null,
}
export const AdminReducer = createReducer(initialState, (builder) => {
    builder
        .addCase('LoadAdminRequest', (state) => {
            state.loading = true;
        })
        .addCase('LoadAdminSuccess', (state, action) => {
            state.loading = false;
            state.isAuthenticated = true;
            state.data = action.payload;
        })
        .addCase('LoadAdminFail', (state, action) => {
            state.loading = false;
            state.isAuthenticated = false;
            state.error = action.payload;
        })
        // .addCase('ClearErrors', (state) => {
        //     state.error = null;
        // })
        .addCase('LogoutAdminSuccess', (state) => {
            state.isAuthenticated=false   
            state.loading = false;
            state.user = null
        });
});
