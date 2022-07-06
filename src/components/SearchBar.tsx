import store, { changeSettingsLink } from "../reducers/settingLink";

function onSubmit(event:any){
    event.preventDefault()
    const inputText = event.target.elements[0].value
    const relevance = event.target.elements["relevance"].value
    const categories = event.target.elements["categories"].value
    if(inputText.trim()!==""){
        store.dispatch(changeSettingsLink({inputText,relevance,categories}))
    }
}

export default function SearchBar(){
 
    return <div >
            <h1 style={{textAlign:"center"}}>Search for books</h1>
             <form  action="/" onSubmit={onSubmit}>
                <div className="search__field">
                    <input className="input__text" type="text" placeholder="Поиск" />
                    <button type="submit">Serach</button>
                </div>
             <div className="navBar">
             <label>
             Categories:
             <select defaultValue={"all"} name="categories">
                 <option value="all">all</option>
                 <option value="books">books</option>
                 <option value="magazines">magazines</option>
             </select>
             </label>
             <label>
                Sorting by:
             <select defaultValue={"relevance"} name="relevance">
                 <option value="relevance">relevance </option>
                 <option value="newest">newest</option>
             </select>
             </label>
             </div>
             </form>
             </div> 
}

