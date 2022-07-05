import { BookState } from "../reducers/constsAndTypes"

export default function Book(props:{books:BookState[]}){
    const {books} = props
    return <div>
        {books.map((book:BookState,i:number)=>{
            if(book.image === undefined) {
                return <div key={i}> {book.name} </div>
            }
            else {
                return <img key={i} src={book.image} alt="" />
            }
    })}
    </div>
}