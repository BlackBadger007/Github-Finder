import { useState } from "react"
import { FaEye } from "react-icons/fa"
import { Link } from "react-router-dom"
import GithubContext from "../context/github/GithubContext"
import { useNavigate } from "react-router-dom"
import { useContext } from "react"
import { ToastContainer ,toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'



const SignIn = () => {

    const { setCredentials   } = useContext(GithubContext)

    const navigate = useNavigate()


    const [show , setShow] = useState(false)

    const [data  , setData] = useState({
        email:'',
        password : '',
    })

    const onChange = (e) => {
        setData((prevState) => ({
            ...prevState,
            [e.target.id] : e.target.value
        }))
    }

    const signin = async () =>{


        if(data.email.trim().length === 0 || data.password.trim().length === 0 ){
            toast('Missing field')
            return;
        }

        let iteminStorage;
        let user = null;
        if(localStorage.getItem('User') === null){
            toast('Not found')
            return;
        }else{
            iteminStorage = JSON.parse(localStorage.getItem('User'))
        }

        await iteminStorage.filter((x) => x.user.email === data.email.trim() && (user = x.user))

        if(user === null){
            toast('Not found')
            return;
        }else{

            if(user.password !== data.password.trim()){
                toast('Incorrect credentials')
                return
            }

            
            localStorage.setItem('CurrUser' , JSON.stringify(user) )
            
            await setCredentials(user)
            
            navigate('/')
            
        }
        
    }


    return(
        <div className="cont">
                    <ToastContainer style={{fontSize : '20px' , fontWeight:'400'}} />

        <div className="box-sign">
            <h1>SignIn</h1>
            <input type="text" id="email" placeholder="Email / UserID" onChange={onChange} /> <br />
            <div className="pass" style={{display:'flex'}} >
            <input type={show ? "text" : "password"} id="password" placeholder="Password" onChange={onChange} />
            <button onClick={() => setShow(!show)} className="eye" ><FaEye/></button>
            </div>
            <button className="sub-btn" onClick={signin} >SignIn</button>
        </div>
        <div className="istd">
        <h3>New to Github Finder ?</h3>
        <Link to='/signup' className="is-link">SignUp</Link>

        </div>
        </div>
    )
}
export default SignIn