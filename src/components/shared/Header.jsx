import { FaGithub } from "react-icons/fa6"
import { Link , useLocation , useNavigate } from "react-router-dom"
import { FaHeart ,FaArrowLeft , FaUser} from "react-icons/fa6"
import {  useContext, useState } from "react"
import GithubContext from "../context/github/GithubContext"

function Header(){

    const {credentials , setCredentials} = useContext(GithubContext)

    const navigate = useNavigate()
    const location = useLocation()
    const url = location.pathname

    const [color , setColor] = useState('white')

    const [show , setShow] = useState(false)

    let value;
    if(url === '/user/favourites'){
        value = 'fav';
    } else if(url === '/' ){
        value='home'
    } else if(url ==='/signin' || url ==='/signup'){
        value='logs'
    }
    else {
        value= 'pro' 
    }

    const handleBack = () => {
        navigate('/')
    }

    const signout = () => {
        setShow(false)
        const item ={}
        localStorage.setItem('CurrUser', JSON.stringify(item))
        setCredentials(item)
    }
    

    return (

        <div className="mango">


        <header>
            <div className="can" style={{display:'flex' , justifyContent:'space-between'}} >
                <div className="s1" style={{display:'flex'}} >
            <FaGithub style={{color:'white' , margin:'auto 10px', fontSize:'40px' }} />
            <h2 className="h1-head" onClick={() => navigate('/')} style={{cursor:'pointer'}} > Github Finder</h2>

                </div>
                <div className="s2" style={{display:'flex'}} >
                    {value ==='fav' ? <>
                    <button className="btnn"  onClick={handleBack} ><FaArrowLeft style={{fontSize:'25px' }}  /></button>
                    <Link to='/user/favourites' className="fav-link" >
                    <FaHeart style={{color: 'rgb(19, 111, 111)' , fontSize:'25px' }}  className="ip" title="Favourites"/>
                    </Link>
                    <button className="user" onClick={() => setShow(!show)}><FaUser/></button>

                    </> : value==='pro' ? <>
                    <button className="btnn"  onClick={handleBack} ><FaArrowLeft style={{fontSize:'25px' }}  /></button>
                    <Link to='/user/favourites' className="fav-link" >
                    <FaHeart style={{color: color , fontSize:'25px' }} onMouseOver={() => setColor('rgb(19, 111, 111)')} onMouseOut={() => setColor('white')} className="ip" title="Favourites"/>
                    </Link>
                    <button className="user" onClick={() => setShow(!show)}><FaUser/></button>

                    </> : value ==='home' ? <>
                    <button className="user" onClick={() => setShow(!show)} ><FaUser/></button>
                    
                    </> : value === 'logs' ? <>
                    
                    </> : <>
                    <Link to='/user/favourites' className="fav-link" >
                    <FaHeart style={{color: color , fontSize:'25px' }} onMouseOver={() => setColor('rgb(19, 111, 111)')} onMouseOut={() => setColor('white')} className="ip" title="Favourites"/>
                    <button className="user" onClick={() => setShow(!show)}><FaUser/></button>
                    </Link>
                    </>}
                </div>
            </div>
        </header>
        <div className="pro-cont">

        <div className={show ? "pro-true" : "pro-false"}>
            <h1>{credentials.name}</h1>
            <h1>{credentials.email}</h1>
            <h1 onClick={signout} className="s-out" >SignOut</h1>
            
        </div>
        </div>
        </div>
    )
}
export default Header