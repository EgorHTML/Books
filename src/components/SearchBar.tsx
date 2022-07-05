import store, { changeSettingsLink } from "../reducers/settingLink";

store.subscribe(()=>{
    console.log(store.getState());
    
})
function onSubmit(event:any){
    event.preventDefault()
    const inputText = event.target.elements[0].value
    const relevance = event.target.elements["relevance"].value
    const categories = event.target.elements["categories"].value
    store.dispatch(changeSettingsLink({inputText,relevance,categories}))
}

export default function SearchBar(){
 
    return <div>
             <form action="/" onSubmit={onSubmit}>
             <input type="text" placeholder="Поиск" />
             <button type="submit">Serach</button>
             <select defaultValue={"all"} name="categories">
                 <option value="all">all</option>
                 <option value="books">books</option>
                 <option value="magazines">magazines</option>
             </select>
             <select defaultValue={"relevance"} name="relevance">
                 <option value="relevance">relevance </option>
                 <option value="newest">newest</option>
             </select>
             </form>
             </div> 
}

