import Books from "./Books"
import SearchBar from "./SearchBar"

export type OptionsUrl = {
    inputText:string
    categories:string
    relevance:string
    setOptions?:(params:OptionsUrl)=>void
}

export default function App(){
   
      return  <div>
        <SearchBar/>
        <Books/>
        </div>
}