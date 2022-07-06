import BookShelf from "./BookShelf"
import SearchBar from "./SearchBar"
import "../styles/main.css"
import "../styles/singleVolume.css"

export default function App(){
      return  <div>
          <SearchBar/>
          <BookShelf/>
        </div>
}