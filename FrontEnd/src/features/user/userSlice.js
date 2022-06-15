import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { post,get } from '../../api/axios.js'

export const login = createAsyncThunk('user/login',async(creadentials,thunkApi)=>{
    
    const {data} = await post('/api/auth/login',{
        email:creadentials.email,
        password:creadentials.password
    })
    // console.log(data)
    if(data.success===false){
        return thunkApi.rejectWithValue(data)
    }
    return data
})

export const logged = createAsyncThunk('user/logged',async(creadentials,thunkApi)=>{
    const {data} = await get('/api/auth/')
    // console.log(data)
    if(data.success===false){
        return thunkApi.rejectWithValue(data)
    }
    return data
})

const userSlice = createSlice({
    name:"user",
    initialState:{
        email:"",
        username:"",
        login:false,
        error:false,
        errorMessage:'',
        loading:false

    },
    reducers:{

    },
    extraReducers(builder){
        builder.addCase(login.fulfilled,(state,action)=>{
            state.email = action.payload.data.email
            state.username = action.payload.data.name
            state.login = true
            state.loading = false
            
        })
        builder.addCase(login.pending,(state,action)=>{
            state.loading = true
        })
        builder.addCase(login.rejected,(state,action)=>{
            state.email = ""
            state.username = ""
            state.login = false
            state.loading = false
        })

        builder.addCase(logged.fulfilled,(state,action)=>{
            state.email = action.payload.data.email
            state.username = action.payload.data.name
            state.login = true
            state.loading = false
            
        })
        builder.addCase(logged.pending,(state,action)=>{
            state.loading = true
        })
        builder.addCase(logged.rejected,(state,action)=>{
            state.email = ""
            state.username = ""
            state.login = false
            state.loading = false
        })

        
    }
})

export default userSlice.reducer