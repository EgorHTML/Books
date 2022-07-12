import { useEffect, useState, useReducer, lazy, Suspense } from "react"
import { getBooks, getDataBooks, getMoreBooks } from "../features/network/bookRequests"
import { putBooksInState } from "../store/reducers/booksStateReducer"
import { useAppSelector } from "../store/store"
const Books = lazy(()=> import("./Books"))

export default function BookShelf(){
    const urlSettings = useAppSelector((store)=>store.urlParams)
    const [startIndex,setPagination] = useState(0)
    const [books,dispatchBooks] = useReducer(putBooksInState,[])
    const [totalItems,setTotalItems] = useState(-1)
    const [isFetching,setFetching] = useState(false)
   
    useEffect(()=>{
            const {inputText,relevance,categories} = urlSettings
            if(inputText.trim()!==""){
                getBooks({input:inputText,relevance,categories},startIndex)
                        .then(async data=>{
                            if(data.ok === false) throw new Error(`${data.status}`)                            
                            const dataJson = await data.json()
                            setTotalItems(dataJson.totalItems)
                            dispatchBooks({type:"load",data:getDataBooks(dataJson)})
                            setPagination(30)
                    }).catch((error:Error)=>{
                        dispatchBooks({type:"load",data:[]})
                        setTotalItems(0)
                        setPagination(0)
                        console.error(error.message)
                    })
            }
    },[urlSettings])
    
        return <Suspense fallback={ <div>Загрузка...</div> }> <div>
                {(urlSettings.inputText.length>0 && totalItems!==-1) && <p style={{textAlign:"center"}}>Найдено ответов:{totalItems}</p>}
                
                {(urlSettings.inputText.length>0 && books.length===0 &&(totalItems>0 || totalItems===-1) )  && <p style={{fontSize:"40px",textAlign:"center"}}>Loading...</p>} 
                
                <Books books = {books}/>  
                
                {isFetching && <p style={{fontSize:"40px",textAlign:"center"}}>Loading...</p>} 
                
                <div className="books__load">
                {(isFetching === false &&(totalItems-startIndex>0))&& <button  onClick={()=>{
                        setFetching(true)
                        setPagination(startIndex+30)
                        getMoreBooks(startIndex,urlSettings).then(async data=>{
                        dispatchBooks({type:"add",data:getDataBooks(await data.json())})
                        setFetching(false)
                })
                }}>Load more</button>}
              </div> 
            </div>
            </Suspense>
}