import { useContext ,useEffect } from "react"
import { useParams } from "react-router-dom"
import GithubContext from "../context/github/GithubContext"
import { FaRegHeart , FaHeart } from "react-icons/fa6"
import { useState } from "react"
import { ToastContainer , toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'
import Buffer from "./Buffer"

function UserProfile(){

    const {userProfile , user , repos , loading , credentials , setCredentials  } = useContext(GithubContext)
    
    const [fill , setFill] = useState(false)

    const params=useParams()

    useEffect(()=>  {    
        userProfile(params.login)      
    },[])


    const start = async () => {

        let fail = false;
        let item;

        let itemfromstorage = JSON.parse(localStorage.getItem('User'))
        if(itemfromstorage){
            await itemfromstorage.filter((x) => x.user.email === credentials.email && (item=x.favourites))
            item.filter((x)=> x.id === user.id && (fail = true) )
        }
        setFill(fail)
    }

    useEffect(() => {
        start()
    },[user])
    

    const clickHandler = async () => {
        let exist = false;

        const data={
            id:user.id,
            login:user.login,
            avatar_url:user.avatar_url
        }
 
            let iteminStorage;
            let val;
            let arr ;
            
            iteminStorage=JSON.parse(localStorage.getItem('User'));
            console.log(iteminStorage);
            iteminStorage.filter((x) => x.user.email === credentials.email && (val = x))
            iteminStorage = await iteminStorage.filter((x) => x.user.email !==  credentials.email)

            arr = val.favourites

            arr.filter((x)=> x.id === user.id && (exist=true))

            if(exist){
                toast('Already in your favourites')
            }else{

                
                
                arr.push(data)
                
                const item = {
                    user: val.user,
                    favourites : arr
                    
                }
                iteminStorage.push(item)
                
                localStorage.setItem('User',JSON.stringify(iteminStorage));
                
                setFill(true)
                toast('Added to Favourites')
            }
            
    }


    if(loading){
        return (
            <div className="bid">
                <div className="cid" style={{height:'84px'}} ></div>
                <Buffer/>
            </div>
        )
    }else{

    return (
    <div className="box" style={{minHeight:'660px'}} >
        <ToastContainer style={{fontSize : '20px' , fontWeight:'400'}} />
        <div className="l1" style={{display:'flex' , justifyContent :'space-between' , maxWidth: '1390px' , margin:'auto'}}>   
            
            <div className="c1" style={{display:'flex'}}>

                <div className="b1">
                    <img src={user.avatar_url} alt="" />
                </div>

                <div className="b2">
                    <h1>{user.name}</h1>
                    <h3>{user.bio}</h3>
                    <h4>Username : {user.login}</h4>
                    <h4>From : {user.location}</h4>
                    <h4>Followers : {user.followers}</h4>
                    <h4>Following : {user.following}</h4>
                    <h4>Public Gists : {user.public_gists}</h4>
                    <h4>Public Repos : {user.public_repos}</h4>
                    <h4>Together Since : {user.created_at}</h4>
                    <h4>Updated At : {user.updated_at}</h4>
                </div>
        
            </div>

            <div className="b3"  >
                <a href={user.html_url} target="_blank" rel="noreferrer noopener">Visit {user.name}</a> <br />
                <a href={user.blog} target="_blank" rel="noreferrer noopener">Blog</a> <br />
            </div>

            <div className="b5" >
                <button  onClick={clickHandler} style={{background:'none'  }}  >{fill ? <FaHeart style={{fontSize:'30px' , color:'white' }} /> :<FaRegHeart style={{fontSize:'30px' , color:'white'}} />}</button>
            </div>

        </div>

        <div className="b4">
                <h1>User Repos</h1>
                {
                    repos.map((x) => (
                        <div className="repos-card" key={x.id} >
                            <h3>{x.name}</h3>
                            <h4 style={{marginBottom:'15px'}} >{x.description}</h4>
                            <h4 >{x.language}</h4>

                            <a href={x.clone_url} target="_blank" rel="noreferrer noopener">Explore</a>
                        </div>
                    ))
                }
        </div>
            
    </div>
    )
}
}
export default UserProfile