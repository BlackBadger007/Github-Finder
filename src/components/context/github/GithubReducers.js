const githubReducer = (state,action) => {
    switch(action.type) {
        case 'GET_LIST': {
            return {
                ...state,
                result:action.payload,
                loading:false,
            }
        }

        case 'SET_LOADING' : {
            return {
                ...state,
                result: [],
                loading:true,
            }
        }

        case 'SET_CRED' : {
            return {
                ...state,
                credentials : action.payload,
                loading : false
            }
        }

        case 'CLEAR_LIST' : {
            return {
                ...state,
                result: [],
                loading :false,
            }
        }

        case 'GET_USER' : {
            return {
                ...state,
                user: action.payload,
                loading:false,
            }
        }

        case 'GET_REPOS' : {
            return {
                ...state,
                repos: action.payload,
                loading: false,
            }
        }
        
        default:
            return state
        
    }
}
export default githubReducer