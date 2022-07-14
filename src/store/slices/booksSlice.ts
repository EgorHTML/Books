import { createSlice } from "@reduxjs/toolkit";
import { BookState } from "../../features/constsAndTypes";

const bookSlice = createSlice({
    name:"books",
    initialState:[] as BookState[],
    reducers:{
        addBooksToSlice(state,action:{payload:{books:BookState[]}}){
            return [...state,...action.payload.books]
        },
        putBooksInSlice(state,action:{payload:{books:BookState[]}}){
            return state = [...action.payload.books]
        }
    }
})


export const {addBooksToSlice,putBooksInSlice} = bookSlice.actions
export default bookSlice.reducer