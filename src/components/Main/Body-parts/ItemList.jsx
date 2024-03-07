import Item from "./Item/Item";
import "./styles/ItemList.css"
export default function ItemList({children,enable}){
    return <ul className={`list-group ${enable?"disabled":""}`} >
        {children}
    </ul>
}