export const API_KEY = "AIzaSyAfxYf5Tze3WSnXx6IFVp4nU-l1MMCjbss"

export function getUrlForSingleVolume(id:string,API_KEY = "AIzaSyAfxYf5Tze3WSnXx6IFVp4nU-l1MMCjbss"):string{
    return `https://www.googleapis.com/books/v1/volumes/${id}?projection=lite&key=${API_KEY}`
}

export type BookState = {
    image:string
    name:string
    categories:string[]
    id:string
    authors:string[]
}

export type OptionsUrl = {
    inputText:string
    categories:string
    relevance:string
    setOptions?:(params:OptionsUrl)=>void
}


