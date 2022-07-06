import { BookState } from "../reducers/constsAndTypes"
import {Link} from "react-router-dom"

export default function Books(props:{books:BookState[]}){
    const {books} = props
    return  <div className="books">
        {books.map((book:BookState,i:number)=>{
            if(book.image === undefined) {
                return <Link className="book" key={i} to={`/${book.name}`}> <div> {book.name} </div></Link>
            }
            else {
                return <Link className="book" key={i} to={`/${book.name}`}><div>
                    <img src={book.image} alt="" />
                    <p>{book.name}</p>
                </div>
                </Link>
                
            }
    })}
    </div>
}