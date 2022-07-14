import { useEffect, useState, useReducer, lazy, Suspense, useCallback, useMemo } from "react"
import { BookState } from "../features/constsAndTypes"
import { getBooks, getDataBooks, getMoreBooks } from "../features/network/bookRequests"
import { putBooksInState } from "../store/reducers/booksStateReducer"
import { addBooksToSlice, putBooksInSlice } from "../store/slices/booksSlice"
import store, { useAppDispatch, useAppSelector } from "../store/store"
const Books = lazy(()=> import("./Books"))


export default function BookShelf(){
        const dispatch = useAppDispatch()
        const urlSettings = useAppSelector((store)=>store.urlParams)
        const booksSlice = useAppSelector((store)=>store.booksSlice)
        const [error,setError] = useState(false)
        const [startIndex,setPagination] = useState(0)
        // const [books,dispatchBooks] = useReducer(putBooksInState,[])
        const [totalItems,setTotalItems] = useState(-1)
        const [isFetching,setFetching] = useState(false)
    


    useEffect(()=>{
            const {inputText,relevance,categories} = urlSettings
            if(inputText.trim()!==""){
                getBooks({input:inputText,relevance,categories},startIndex)
                .then(async data=>{
                        if(data.ok === false) throw new Error(`${data.status}`)   
                        setError(false)                         
                        const dataJson = await data.json()
                        setTotalItems(dataJson.totalItems)

                        if((getDataBooks(dataJson).every((elem:BookState,i:number)=>booksSlice[i]?.id === elem?.id))===false){
                                dispatch(putBooksInSlice({books:getDataBooks(dataJson)}))
                        }
                        setPagination(30)
                }).catch((error:Error)=>{
                        setError(true)
                        setTotalItems(0)
                        setPagination(0)
                        console.error(error.message)
                })
            }
    },[urlSettings])
    
        return <Suspense fallback={ <div>Загрузка...</div> }> <div>
                {(urlSettings.inputText.length>0 && totalItems!==-1) && <div><p style={{textAlign:"center"}}>Найдено ответов:{totalItems}</p> {error&& <p>Попробуйте позже</p> }</div>}
                
                {(urlSettings.inputText.length>0 && booksSlice.length===0 &&(totalItems>0 || totalItems===-1) )  && <p style={{fontSize:"40px",textAlign:"center"}}>Loading...</p>} 
                
                <Books books = {booksSlice}/>  
                
                {isFetching && <p style={{fontSize:"40px",textAlign:"center"}}>Loading...</p>} 
                
                <div className="books__load">
                {(isFetching === false &&(totalItems-startIndex>0))&& <button  onClick={()=>{
                        setFetching(true)
                        setPagination(startIndex+30)
                        getMoreBooks(startIndex,urlSettings).then(async data=>{
                        let dataJson = await data.json()
                        dispatch(addBooksToSlice({books:getDataBooks(dataJson)}))
                        setFetching(false)
                })
                }}>Load more</button>}
              </div> 
            </div>
            </Suspense>
}