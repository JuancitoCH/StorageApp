import {configureStore} from '@reduxjs/toolkit' 
import filesSlice from '../features/files/filesSlice'
// importamos los slice y los usamos como reducers
// import userReducer from '../features/user/userSlice'
import userSlice from '../features/user/userSlice'

const store = configureStore({
    reducer:{
        user:userSlice,
        files:filesSlice
    }
})

export default store