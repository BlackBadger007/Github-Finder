import { useContext , useEffect ,useState } from "react" 
import GithubContext from "../context/github/GithubContext"
import Buffer from './Buffer'
import { Link , useNavigate , useLocation } from "react-router-dom"
import { FaMinusCircle } from "react-icons/fa"
import { ToastContainer, toast } from "react-toastify"
import Swal from 'sweetalert2';
import 'react-toastify/dist/ReactToastify.css'

const Favourites = () => {

    const {credentials  } = useContext(GithubContext)

    const navigate = useNavigate()
    const location = useLocation()
    const url = location.pathname
     
    const [file,setFile]=useState([])

    const [fileLoad,setFileLoad]=useState(true)


    const apple = async () => {
        let itemfromstorage;
        let filee;
        if(localStorage.getItem('User')){

            if(localStorage.getItem('User')=== 'null'){
                itemfromstorage=[];
            }else{
                itemfromstorage=JSON.parse(localStorage.getItem('User'));
                
                await itemfromstorage.filter((x) => x.user.email === credentials.email&& (filee = x.favourites))
                setFile (filee)
            }
        }else{
            itemfromstorage=[];

        }
        
        setFileLoad(false)
    }

    useEffect(()=>{
        apple()
    
    },[])
    

    const handleBack = () => {
        navigate('/')
    }

    let vara='no'
    if(url === '/user/favourites'){
        vara='fav'
    }else if(url === '/'){
        vara='home'
    }

    const remover = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes',
            cancelButtonText: 'No',
        }).then( async (result) =>  {
            if (result.isConfirmed) {

                let iteminStorage;

                if(localStorage.getItem('User')===null){

                }else{
                    iteminStorage = JSON.parse(localStorage.getItem('User'))
                }

                iteminStorage =await  iteminStorage.filter((x) => x.user.email !== credentials.email )
            
                const itemss = file.filter ((x) => x.id !== id)

                const data = {
                    user : credentials,
                    favourites : itemss
                }

                iteminStorage.push(data)

                localStorage.setItem('User' , JSON.stringify(iteminStorage))
                setFile(itemss)
                toast('Profile Removed') 
            }
        });
    };
    
    if(fileLoad){
        return <Buffer/>
    }else{

     if(file.length === 0 && vara ==='home'){
        return(
            <div className="favv" style={{width:'fit-content' , margin:'auto' , marginTop:'50px'}} >

                <h1 style={{fontSize:'30px' , fontWeight:'300' , color:'white', width:'fit-content', margin:'auto' }} >Let's get started</h1>
                <h2 style={{fontSize:'20px' , fontWeight:'300' , color:'white', width:'fit-content', margin:'auto'}}>  </h2>
            </div>
        )
    }else if(file.length === 0 && vara ==='fav'){
        return(
            <div className="favv" style={{width:'fit-content' , margin:'auto' , marginTop:'50px' , marginBottom:'123px' }} >

                <h1 style={{fontSize:'30px' , fontWeight:'300' , color:'white', width:'fit-content', margin:'auto' }} >Your favourites will be shown here </h1>
                <h2 style={{fontSize:'20px' , fontWeight:'300' , color:'white', width:'fit-content', margin:'auto'}}>No favourites added yet !</h2>
            </div>
        )
    }else if(file.length > 0 && vara === 'fav'){
        return(
            <div className="big-container" style={{minHeight:'660px'}} >
                <ToastContainer style={{fontSize : '20px' , fontWeight:'400'}}  />
                        {file.length > 0 && 
                    <div className="bar"  >
                        <p style={{fontSize:'22px' , fontWeight:'400'  , color:'white' }}>Favourites</p>
                    <p style={{fontSize:'22px' , fontWeight:'400'  , color:'white' }} >{file.length} Result's</ p>
                    </div>
                     }
                    <div className="container">
                    {
                        file.map((item) => (
                            <div className="card" key={item.id}>
                                <div className="sub-card">
                                    <div className="sub1" style={{display:'flex'}} >
                                    <img src={item.avatar_url} alt="" className="list-img"/>
                                    <h2 className="user-head" >{item.login}</h2>
    
                                    </div>
                                    <div className="sub2" style={{display:'flex' , justifyContent:'end'}}>
    
                                    <button className="rem-btn" style={{ fontSize : '22px'}} onClick={() => remover(item.id)} ><FaMinusCircle/></button>
                                    </div>
                                </div>
                                <Link to={`/user/${item.login}`} className="link-to-profile" >Show Profile</Link>
                            </div>
                        ))
                    }  
                </div>
                </div>
        )
    }else{

    return(
        <div className="big-container" style={{minHeight:'567px'}} >
            <ToastContainer style={{fontSize : '20px' , fontWeight:'400'}}  />
                    {file.length > 0 && 
                <div className="bar"  >
                    <p style={{fontSize:'22px' , fontWeight:'400'  , color:'white' }}>Favourites</p>
                <p style={{fontSize:'22px' , fontWeight:'400'  , color:'white' }} >{file.length} Result's</ p>
                </div>
                 }
                <div className="container">
                {
                    file.map((item) => (
                        
                        <div className="card" key={item.id}>
                            <div className="sub-card">
                                <div className="sub1" style={{display:'flex'}} >
                                <img src={item.avatar_url} alt="" className="list-img"/>
                                <h2 className="user-head" >{item.login}</h2>

                                </div>
                                <div className="sub2" style={{display:'flex' , justifyContent:'end'}}>

                                <button className="rem-btn" style={{ fontSize : '22px'}} onClick={() => remover(item.id)} ><FaMinusCircle/></button>
                                </div>
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
}
export default Favourites