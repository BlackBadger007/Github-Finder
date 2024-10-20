import { useContext } from "react"
import AlertContext from "../context/alert/AlertContext"
import { FaTimesCircle } from "react-icons/fa"

function Alert(){

    const{alert}=useContext(AlertContext)

    return alert !==null && (

        <p className="p-alert" style={{color:'white'}} ><FaTimesCircle style={{color:'white'}} /> {alert.msg}</p>
    )
    
}
export default Alert