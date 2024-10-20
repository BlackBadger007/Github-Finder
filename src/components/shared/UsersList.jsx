import { useContext , useEffect ,useState } from "react" 
import GithubContext from "../context/github/GithubContext"
import Buffer from './Buffer'
import { Link } from "react-router-dom"

function UsersList(){

    const{result , loading ,handleClear}=useContext(GithubContext)

    const [file,setFile]=useState([])
    const [fileLoad,setFileLoad]=useState()

    useEffect(()=>{setFile(result)},[result])
    useEffect(()=>{setFileLoad(loading)},[loading])

    if(fileLoad){
        return(
            <Buffer/>
        )
    }else{ 

        return(

        <div className="big-container" style={{minHeight:'566px'}} >
            {file.length > 0 && 
                <div className="bar" >
                    <p style={{fontSize:'17px' , color:'white' }} >{file.length} Result's</ p>
                    <button className="clr-btn" onClick={handleClear} >Clear</button>
                </div>
            }

            <div className="container">
                {
                    file.map((item) => (
                        <div className="card" key={item.id}>
                            <div className="sub-card">
                                <img src={item.avatar_url} alt="" className="list-img"/>
                                <h2 className="user-head" >{item.login}</h2>
                            </div>
                            <Link to={`/user/${item.login}`} className="link-to-profile" >Show Profile</Link>
                        </div>
                    ))
                }  
            </div>
        </div>
            
        )
    }

}
export default UsersList