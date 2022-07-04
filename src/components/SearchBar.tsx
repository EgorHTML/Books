import store, { changeCategory, changeInputText, changeRelevance } from "../reducers/settingLink";

store.subscribe(()=>{
    console.log(store.getState());
    
})
function onSubmit(event:any){
    event.preventDefault()
    console.log(event);
}

export default function SearchBar(){
 
    return <div>
             <form action="/" onSubmit={onSubmit}>
             <input type="text" placeholder="Поиск" onChange={(event)=>store.dispatch(changeInputText({text:event.target.value}))}/>
             <button type="submit">Serach</button>
             <select defaultValue={"all"} name="categories" onChange={(event)=>store.dispatch(changeCategory({category:event.target.value}))}>
                 <option value="all">all</option>
                 <option value="art">art</option>
                 <option value="biography">biography</option>
                 <option value="computers">computers</option>
                 <option value="history">history</option>
                 <option value="medical">medical</option>
                 <option value="poetry">poetry</option>
             </select>
             <select defaultValue={"relevance"} name="relevance" onChange={(event)=>store.dispatch(changeRelevance({relevance:event.target.value}))}>
                 <option value="relevance ">relevance </option>
                 <option value="newest">newest</option>
             </select>
             </form>
             </div> 
}

