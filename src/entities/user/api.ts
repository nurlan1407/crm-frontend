import { createAsyncThunk } from '@reduxjs/toolkit'
import { LoginFormParams, LoginResponse } from './User'
import makeRequest from 'baseApi'


export const login = createAsyncThunk(
    'user/sendNumber',
    async (params: LoginFormParams, { rejectWithValue }) => {
        try {
            const response = await makeRequest('POST', '/auth/admin/login', { email: params.email, password: params.password },{})
            return response.data
        } catch (e: any) {
            return rejectWithValue(e.msg)
        }
    }
)
