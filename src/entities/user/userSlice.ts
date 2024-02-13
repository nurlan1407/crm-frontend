import { createSlice } from "@reduxjs/toolkit";
import asset1 from 'public/asset1.png'
import asset2 from 'public/asset2.jpeg'
import { UserFormData, User } from "./User";
import { login } from "./api";


interface TovarSliceState {
    user: User;
    userFormData: UserFormData
    isLoading:boolean
}
const initialState: TovarSliceState = {
    user: {
        email: ""
    },
    userFormData: {
        email: "",
        password: ""
    },
    isLoading:false
}



const userSlice = createSlice({
    name: "user",
    initialState: initialState,
    reducers: {
        setUserFormData: (state, action) => {
            state.userFormData = action.payload;
        },
    },
    extraReducers(builder) {
        builder.addCase(login.pending, (state,action)=>{
            state.isLoading = true
        })
        builder.addCase(login.fulfilled, (state,action)=>{
            state.isLoading = false
            const {accessToken} = action.payload
            if (accessToken) {
                localStorage.setItem('accessToken', accessToken);
            } else {
                
            }
        })
        builder.addCase(login.rejected, (state,action)=>{
            state.isLoading = false,
            //@ts-ignore
            state.error = action.payload
        })
    },
})


export const { setUserFormData } = userSlice.actions

export default userSlice.reducer