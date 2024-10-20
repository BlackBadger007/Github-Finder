import { useState } from "react"
import { FaEye } from "react-icons/fa"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import { ToastContainer ,toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'

const SignUp = () => {

    const navigate = useNavigate()
    const [show , setShow] = useState(false)

    const [info , setInfo] = useState({
        name:'',
        email:'',
        password:'',
        confirmPassword:''
    })

    const onChange = (e) => {
        setInfo((prevState) => ({
            ...prevState,
            [e.target.id] : e.target.value,
        }))
    }

    const create = () => {
  
        if(info.name.trim().length === 0 || info.email.trim().length === 0 || info.password.trim().length === 0 || info.confirmPassword.trim().length === 0 ){
            toast('Missing field')
            return;
        }

        if(info.password === info.confirmPassword){

            let exist = false;

            const item ={
                name : info.name.trim(),
                email : info.email.trim(),
                password : info.password.trim()
            }
            
            const data = {
                user: item,
                favourites : []
            }

            let iteminStorage;
            if(localStorage.getItem('User')===null){
                iteminStorage=[];
            }else{
                iteminStorage=JSON.parse(localStorage.getItem('User'));
            }

            iteminStorage.filter((x) => x.user.email === info.email && (exist=true))

            if(exist){
                toast('User already exists!')
            }else{

                
                
                iteminStorage.push(data);
                localStorage.setItem('User',JSON.stringify(iteminStorage));
                
                localStorage.setItem('CurrUser' , JSON.stringify(item) )
                
                
                navigate('/')
            }

        }else{
            toast('Password mismatch!')
        }
    }


    return(
        <div className="cont">
                    <ToastContainer style={{fontSize : '20px' , fontWeight:'400'}} />

        <div className="box-sign">
            <h1>SignUp</h1>
            <input type="text" id="name" placeholder="Name" onChange={onChange} /> <br />
            <input type="text" id="email" placeholder="Email / UserID" onChange={onChange} /> <br />
            <div className="pass" style={{display:'flex'}} >
            <input type={show ? "text" : "password"} id="password" placeholder="Password" onChange={onChange} />
            <button onClick={() => setShow(!show)} className="eye" ><FaEye/></button>
            </div>
            <div className="pass" style={{display:'flex'}} >
            <input type={show ? "text" : "password"} id="confirmPassword" placeholder="Confirm Password" onChange={onChange} />
            <button onClick={() => setShow(!show)} className="eye" ><FaEye/></button>
            </div>
            <button className="sub-btn" onClick={create} >SignUp</button>
        </div>
        <div className="istd">
        <h3>Already have an account ?</h3>
        <Link to='/signin' className="is-link" >SignIn</Link>

        </div>
        </div>
    )
}
export default SignUp