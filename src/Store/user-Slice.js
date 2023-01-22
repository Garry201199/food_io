import {createSlice} from '@reduxjs/toolkit'
import { fetchLocalStorageData } from '../Utils/fetchLocalStorage'
const userSlice = createSlice({
    name:'user',
    initialState:[]  ,
    reducers:{
        addUser(state, action){
            state.push(action.payload)
        },
        removeUser(state, action){
            state.pop()
        }
    }
})
export const  actions = userSlice.actions

export default userSlice