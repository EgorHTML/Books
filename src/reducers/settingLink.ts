import { createSlice, configureStore } from "@reduxjs/toolkit"
import { OptionsUrl } from "./constsAndTypes"

const urlSlice = createSlice({
    name:"urlParams",
    initialState:<OptionsUrl>{
        inputText:"",
        categories:"all",
        relevance:"relevance"
    },
    reducers:{
        changeInputText(state,action:{payload:{text:string} ,type:string}){
            state.inputText = action.payload.text
        },
        changeCategory(state,action:{payload:{category:string},type:string}){
            state.categories = action.payload.category
        },
        changeRelevance(state,action:{payload:{relevance:string},type:string}){
            state.relevance = action.payload.relevance
        },
        changeSettingsLink(state,action:{payload:{inputText:string,categories:string,relevance:string},type:string}){
            state.inputText = action.payload.inputText
            state.categories = action.payload.categories
            state.relevance = action.payload.relevance
        }
    }
})

const store = configureStore({
    reducer:urlSlice.reducer
})

export const {changeInputText,changeCategory,changeRelevance,changeSettingsLink} = urlSlice.actions
export default store
