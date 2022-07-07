import { API_KEY, BookState, OptionsUrl } from "./constsAndTypes"

export function getBooks(params:{input:string,relevance:string,categories:string},startIndex:number = 0,maxResults:number = 30){
    console.log(`https://www.googleapis.com/books/v1/volumes?q=${params.input}&printType=${params.categories}&orderBy=${params.relevance}&key=`+API_KEY+"&startIndex="+startIndex+"&maxResults="+maxResults);
    
    return fetch(`https://www.googleapis.com/books/v1/volumes?q=${params.input}&printType=${params.categories}&orderBy=${params.relevance}&key=`+API_KEY+"&startIndex="+startIndex+"&maxResults="+maxResults)
}

export function getMoreBooks(startIndex:number,request:OptionsUrl,maxResults = 30){
    return getBooks({input:request.inputText,relevance:request.relevance,categories:request.categories},startIndex,maxResults)
}

export function getDataBooks(dataJson:any):BookState[]{
    let dataBooks:BookState[] = []
    if(dataJson.hasOwnProperty("items")){
        dataBooks = dataJson.items.map((book:any)=>{
           if(book.volumeInfo.readingModes.image){
               return {
                   image:book.volumeInfo.imageLinks.smallThumbnail,
                   name:book.volumeInfo.title,
                   categories:book.volumeInfo.categories,
                   id:book.id,
                   authors:book.volumeInfo.authors
                   }
           }else{
               return{
                   name:book.volumeInfo.title,
                   categories:book.volumeInfo.categories,
                   image:undefined,
                   id:book.id,
                   authors:book.volumeInfo.authors
               }
           }
       })
       dataBooks = dataBooks.filter((element:BookState)=>element!==undefined)
   }
   return dataBooks
}