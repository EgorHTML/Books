import { useEffect, useState, useReducer, lazy, Suspense } from "react"
import { getBooks, getDataBooks, getMoreBooks } from "../reducers/bookRequests"
import { putBooksInState } from "../reducers/booksStateReducer"
import store from "../reducers/settingLink"
const Book = lazy(()=> import("./Books"))

export default function BookShelf(){
    const [startIndex,setPagination] = useState(0)
    const [books,dispatchBooks] = useReducer(putBooksInState,[])
    const [totalItems,setTotalItems] = useState(-1)
    const [isFetching,setFetching] = useState(false)
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
                    console.log(dataJson);
                    
                    setTotalItems(dataJson.totalItems)
                    setFetching(true)
                        dispatchBooks({type:"load",data:getDataBooks(dataJson)})
                        setFetching(false)
                        setPagination(30)
                })
            }else{
                dispatchBooks({type:"load",data:[]})
                setPagination(30)
            }
        })
    },[])

    if(totalItems-startIndex>0){
        return <Suspense fallback={ <div>Загрузка...</div> }> <div>
                {(currentStateUrl.inputText.length>0 && totalItems!==-1) && <p style={{textAlign:"center"}}>Найдено ответов:{totalItems}</p>}
                {(currentStateUrl.inputText.length>0 && books.length===0) && <p style={{fontSize:"40px",textAlign:"center"}}>Loading...</p>} 
                <Book books = {books}/>  
                
                {isFetching && <p style={{fontSize:"40px",textAlign:"center"}}>Loading...</p>} 
                
                <div className="books__load">
                {!isFetching && <button  onClick={()=>{
                        setFetching(true)
                        setPagination(startIndex+30)
                        getMoreBooks(startIndex,currentStateUrl).then(async data=>{
                        dispatchBooks({type:"add",data:getDataBooks(await data.json())})
                        setFetching(false)
                })
                }}>Load more</button>}
              </div> 
              
            </div>
            </Suspense>
    }else{
           return <Suspense fallback={ <div>Загрузка...</div> }>
            <div>
            {(currentStateUrl.inputText.length>0 && totalItems!==-1) && <p style={{textAlign:"center"}}>Найдено ответов:{totalItems}</p>}
            {(currentStateUrl.inputText.length>0 && books.length===0 &&(totalItems>0 || totalItems===-1) ) && <p style={{fontSize:"40px",textAlign:"center"}}>Loading...</p>} 
            <Book books = {books}/>
            </div>
            </Suspense>
    }
}