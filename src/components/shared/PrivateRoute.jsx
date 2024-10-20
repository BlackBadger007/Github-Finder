import { useEffect, useState , useContext } from "react"
import Buffer from "./Buffer"
import { Navigate } from "react-router-dom"
import GithubContext from "../context/github/GithubContext"
import { Outlet } from "react-router-dom"


const PrivateRoute = () => {

    const { setLoading , setCredentials , credentials  } = useContext(GithubContext)

    const [load , setLoad] = useState(true)


    useEffect(() => {

        const fetchUser = () => {
            
            setLoading()
            if(localStorage.getItem('CurrUser')){

                let currAcc = JSON.parse(localStorage.getItem('CurrUser'))
                // console.log(currAcc);
                if(currAcc){
                    setCredentials(currAcc)
                }else{
                    setCredentials(null)   
                }
            }else{
                setLoad(false)
            }
        }
        fetchUser()
        setLoad(false)

    },[])

        
    if(load){
        return <Buffer/>
    }else{
        return  credentials.email ? <Outlet/> : <Navigate to='/signin'/>
    }
}

export default PrivateRoute