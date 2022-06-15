import {configureStore} from '@reduxjs/toolkit' 
// importamos los slice y los usamos como reducers
// import userReducer from '../features/user/userSlice'
import userSlice from '../features/user/userSlice'

const store = configureStore({
    reducer:{
        user:userSlice,
    }
})

export default store