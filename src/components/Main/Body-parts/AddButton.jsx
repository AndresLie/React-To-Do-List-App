import './styles/Button.css'
export default function AddButton({onClick,children}){
    return(
        <button className="btn btn-outline-dark" onClick={onClick}>{children}</button>
    )
}