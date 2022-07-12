import { createSlice } from "@reduxjs/toolkit"
import { OptionsUrl } from "../../features/constsAndTypes"

export default createSlice({
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