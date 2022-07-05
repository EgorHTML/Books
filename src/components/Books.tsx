import { useEffect, useState, useReducer } from "react"
import { getBooks, getDataBooks, getMoreBooks } from "../reducers/bookRequests"
import { putBooksInState } from "../reducers/booksStateReducer"
import store from "../reducers/settingLink"
import Book from "./Book"

export default function Books(){
    const [startIndex,setPagination] = useState(0)
    const [books,dispatchBooks] = useReducer(putBooksInState,[])
    const [totalItems,setTotalItems] = useState<number>(0)
    const [currentStateUrl,setCurrentStateUrl] = useState({
        inputText:"",
        categories:"all",
        relevance:"relevance"
    })
    
    useEffect(()=>{
        store.subscribe(async()=>{
            const {inputText,relevance,categories} = store.getState()
            setCurrentStateUrl(store.getState())
            const fetchData = getBooks({input:inputText,relevance,categories},startIndex)
            if((await fetchData).status<399){
                fetchData.then(async data=>{
                    const dataJson = await data.json()
                    setTotalItems(dataJson.totalItems)
                        dispatchBooks({type:"load",data:getDataBooks(dataJson)})
                        setPagination(30)
                })
            }else{
                dispatchBooks({type:"load",data:[]})
                setPagination(30)
            }
            
        })
    },[])


    if(totalItems-startIndex>0){
        return <div>
        <Book books = {books}/>
        <button onClick={()=>{
        setPagination(startIndex+30)
            getMoreBooks(startIndex,currentStateUrl).then(async data=>{
                dispatchBooks({type:"add",data:getDataBooks(await data.json())})
            })
        }}>Загрузить еще</button>
        </div>
    }else{
        return <div>
        <Book books = {books}/>
        </div>
    }
}