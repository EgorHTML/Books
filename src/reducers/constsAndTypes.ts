export const API_KEY = "AIzaSyCKqBTCe1dsf0iEsfGG4ayMYps2z4c2AZY"

export function getUrlForSingleVolume(id:string,API_KEY = "AIzaSyCKqBTCe1dsf0iEsfGG4ayMYps2z4c2AZY"):string{
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

fetch(getUrlForSingleVolume("1qceEAAAQBAJ")).then(async data=>{
    console.log(await data.json());
    
})
