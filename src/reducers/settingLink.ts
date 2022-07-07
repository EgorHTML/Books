import { createSlice, configureStore } from "@reduxjs/toolkit"
import { OptionsUrl } from "./constsAndTypes"

const urlSlice = createSlice({
    name:"urlParams",
    initialState:{
        inputText:"",
        categories:"all",
        relevance:"relevance"
    }as OptionsUrl,
    reducers:{
        changeSettingsLink(state:OptionsUrl,action:{payload:{inputText:string,categories:string,relevance:string},type:string}){
            state.inputText = action.payload.inputText
            state.categories = action.payload.categories
            state.relevance = action.payload.relevance
        }
    }
})

const store = configureStore({
    reducer:urlSlice.reducer
})

export const {changeSettingsLink} = urlSlice.actions
export default store
