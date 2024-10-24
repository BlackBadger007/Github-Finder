import { createContext , useState , useEffect ,useReducer } from "react"
import githubReducer from "./GithubReducers"

const GithubContext= createContext()

export const GithubProvider = ({children}) => {
    const [text, setText]= useState('')

    const initialState = {
        result : [],
        user: {},
        repos: [],
        credentials: {},
        loading : false,
    }

    const [state,dispatch] = useReducer(githubReducer,initialState)

    const setCredentials = (user) => {
        dispatch({
            type:'SET_CRED',
            payload : user,
        })
    }

    const fetchUsers= async () => {

        const token = process.env.REACT_APP_GITHUB_BEARER_TOKEN
 
        const params = new URLSearchParams({
            q:text,
        })

        
        const response= await fetch (`https://api.github.com/search/users?${params}` , {
            headers : {
                Authorization : `token ${token}`
            }
        })

        const data=await response.json()

        dispatch({
            type:'GET_LIST',
            payload: data.items,
        })

        setText('')

    }

    const userProfile= async (login) => {
        setLoading()

            const token = process.env.REACT_APP_GITHUB_BEARER_TOKEN
            const response= await fetch (`https://api.github.com/users/${login}` , {
                headers : {
                    Authorization: `token ${token}` 
                }
            })

            if(response.status === 404){
                window.location = '/notfound'
                
            }else{
                const userdata=await response.json()
               
                dispatch({
                    type:'GET_USER',
                    payload: userdata,
                })

                userRepos(userdata.repos_url)
                
            }

            
    
    }

    const userRepos = async (repos ) => {
        
        const token = process.env.REACT_APP_GITHUB_BEARER_TOKEN
        const response= await fetch (repos , {
            headers : {
                Authorization : `token ${token}`
            }
        })
        const repo = await response.json()
       
        dispatch({
            type: 'GET_REPOS',
            payload: repo,
        })
       
    }

    const setLoading = () => {
        dispatch({
            type:'SET_LOADING',
        })
    }

    const handleClear = () => {
        dispatch({
            type:'CLEAR_LIST'
        })
    }


    return(
        <GithubContext.Provider value={{
            text,
            loading : state.loading,
            result:state.result,
            user:state.user,
            repos:state.repos,
            credentials:state.credentials,
         
            setText,
            setLoading,
            fetchUsers,
            handleClear,
            userProfile,
            setCredentials
        }} >{children}</GithubContext.Provider>
    )

}

export default GithubContext