import Img from './img/Spinner@1x-1.0s-200px-200px (3).gif'

function  Buffer(){
    return(
        <div className='buffer-box'>
            <img src={Img} alt="Loading..." style={{width:'90px' , height :'90px'}} />
        </div>
    )
}

export default Buffer