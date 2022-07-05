export const API_KEY = "AIzaSyCKqBTCe1dsf0iEsfGG4ayMYps2z4c2AZY"

export type BookState = {
    image:string
    name:string
    categories:string[]
}

export type OptionsUrl = {
    inputText:string
    categories:string
    relevance:string
    setOptions?:(params:OptionsUrl)=>void
}