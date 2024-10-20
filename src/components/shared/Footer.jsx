import { FaCopyright , FaGithub } from "react-icons/fa"

const Footer = () => {

    return(
        <div className="foot" >

            <div className="s1" style={{display:'flex' ,width:'fit-content', margin:'auto'}} >
                <FaGithub style={{color:'white' , margin:'auto 10px', fontSize:'20px' }} />
                <h2 className="h1-head" style={{fontSize:'20px'}} > Github Finder</h2>
            </div>

            <h4 style={{ width:'fit-content', margin:'auto' , fontWeight:'400'}}>Copyright <FaCopyright/> 2024 Github Finder</h4>
            <h4 style={{width:'fit-content' ,margin: '10px auto', paddingBottom:'20px' }}><a href="/" style={{ fontWeight:'400'}} rel="noreferrer noopener">Privacy Policy</a> | <a href="/" style={{ fontWeight:'400'}} rel="noreferrer noopener">Legal Stuff</a></h4>
        </div>
    )
}
export default Footer