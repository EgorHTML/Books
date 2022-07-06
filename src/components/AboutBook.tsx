import { useParams } from "react-router-dom";

export default function AboutBook(){
    const {bookTitle} = useParams()
    
    return <div>{bookTitle}</div>
}