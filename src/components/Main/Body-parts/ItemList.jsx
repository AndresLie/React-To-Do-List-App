import Item from "./Item/Item";
import "./styles/ItemList.css"
export default function ItemList({children}){
    return <ul className="list-group">
        {children}
    </ul>
}