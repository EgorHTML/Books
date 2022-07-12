import { BookState } from "../../features/constsAndTypes"

export function putBooksInState(state:BookState[],action:{type:string,data:BookState[]}):BookState[]{
    switch(action.type){
        case "load":
            return state = [...action.data]
        case "add":
            return [...state,...action.data]
        default:
            return []
    }
}