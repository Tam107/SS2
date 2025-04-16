import {createReducer} from "@reduxjs/toolkit"

const initialState = {
    isAuthenticated: false,
  loading: true, // Trạng thái ban đầu là đang tải
  user: null,
}
export const UserReducer = createReducer(initialState, (builder) => {
    builder
        .addCase('LoadUserRequest', (state) => {
            state.loading = true;
        })
        .addCase('LoadUserSuccess', (state, action) => {
            state.loading = false;
            state.isAuthenticated = true;
            state.user = action.payload;
        })
        .addCase('LoadUserFail', (state, action) => {
            state.loading = false;
            state.isAuthenticated = false;
            state.error = action.payload;
        })
        .addCase('ClearErrors', (state) => {
            state.error = null;
        })
        .addCase('LogoutUserSuccess', (state) => {
            state.isAuthenticated=false   
            state.loading = false;
            state.user = null
        });
});
