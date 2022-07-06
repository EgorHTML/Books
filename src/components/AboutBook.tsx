import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getUrlForSingleVolume } from "../reducers/constsAndTypes";
import SearchBar from "./SearchBar";

type AboutSingleVolume={title:string,urlImg:string,authors:string[],description:string,categories:string[]}

export default function AboutBook(){
    const {id} = useParams()
    const [info,setInfo] = useState<AboutSingleVolume>()

    useEffect(()=>{
        if(id!==undefined){
            fetch(getUrlForSingleVolume(id)).then(async data=>{
                const book = await data.json()
                setInfo({
                    title:book.volumeInfo.title,
                    urlImg:book.volumeInfo.imageLinks.medium || "",
                    authors:book.volumeInfo.authors,
                    description:book.volumeInfo.description || "",
                    categories:book.volumeInfo.categories
                })
            })
        }
    },[])
    
    return <div>
            <SearchBar/>
            <div className="about__book">
                <img src={info?.urlImg} alt="" />
                <div className="info__book">
                    <h2>{info?.title}</h2>
                    <p>{info?.description}</p>
                </div>
            </div>

            {Array.isArray(info?.authors) && <p>authors:{info?.authors.join(", ")}</p>}
            {Array.isArray(info?.categories) && <p>categories:{info?.categories.join(", ")}</p>}
            <Link to="/" style={{marginLeft:"50%"}}><button>Go back</button></Link>
        </div>
}