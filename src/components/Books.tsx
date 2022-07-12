import { BookState } from "../features/constsAndTypes"
import {Link} from "react-router-dom"

export default function Books(props:{books:BookState[]}){
    const {books} = props
    return  <div className="books">
        {books.map((book:BookState,i:number)=>{
            return <Link className="book" key={i} to={`/${book.id}`}>
                {book.image !== undefined && <img src={book.image} alt="" />}
                <p>{book.name}</p>
                {Array.isArray(book.authors) && <p>authors:{book.authors.join(", ")}</p> }
                {Array.isArray(book.categories) && <p>categories:{book.categories[0]}</p> }
            </Link>
    })}
    </div>
}