import { useEffect, useState } from "react"
import store from "../reducers/settingLink"

const API_KEY = "AIzaSyCKqBTCe1dsf0iEsfGG4ayMYps2z4c2AZY"

function getBooks(params:{input:string,relevance:string},startIndex:number = 1,maxResults:number = 30){
    return fetch(`https://www.googleapis.com/books/v1/volumes?q=${params.input}&printType=all&orderBy=${params.relevance}&key=`+API_KEY+"&startIndex="+startIndex+"&maxResults="+maxResults)
}

type BookState = {
    image:string
    name:string
}

export default function Books(){
    const [pagination,setPagination] = useState({startIndex:0,maxResults:30})
    const [books,setBooks] = useState<BookState[]>([])
    const [flag,setFlag] = useState(0)

    useEffect(()=>{
        store.subscribe(async()=>{
            const {inputText,relevance} = store.getState()
            getBooks({input:inputText,relevance},pagination.startIndex,pagination.maxResults).then(async data=>{
                const dataJson = await data.json()
                console.log(dataJson);
                
                const dataBooks:BookState[] = dataJson.items.map((book:any)=>{
                    if(book.volumeInfo.readingModes.image){
                        return {
                            image:book.volumeInfo.imageLinks.smallThumbnail,
                            name:book.volumeInfo.title
                            }
                    }else{
                        return {
                            name:book.volumeInfo.title
                            }
                    }
                   
                })
                setBooks(dataBooks)
            })
            
        })
    },[flag])
    
  
    return <div>
        {books.map((book:BookState,i:number)=>{
        return <img key={i} src={book.image} alt="" />
    })}
    </div>
   
}