import { BiSearch } from "react-icons/bi"
import { useContext } from "react"
import GithubContext from "../context/github/GithubContext"
import { useNavigate } from "react-router-dom"
import { ToastContainer,toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'

function Searching(){

    const { text , setText , fetchUsers , setLoading }=useContext(GithubContext) 

    const navigate= useNavigate()
    
    const handleClick=(e)=>{
        e.preventDefault()

        if(text === ''){
            toast('Please enter something')
            
        }else{
            setLoading(true)
            fetchUsers()
            navigate('/user')
            
        }
    }

    const handleKey=(e)=>{
        setText(e.target.value)
    }

    return (
        <div className="search-box">
            <ToastContainer style={{fontSize : '20px' , fontWeight:'400'}}  />
            <form onSubmit={handleClick}>
                <input type="text" onChange={handleKey} placeholder="Search for a user" value={text} />     
                <button type="submit"  ><BiSearch style={{fontSize :'27px' , color:'white'}} /></button>
            </form>
        </div> 
    )
}
export default Searching