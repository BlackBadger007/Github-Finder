import { GithubProvider } from "./components/context/github/GithubContext"
import { AlertProvider } from "./components/context/alert/AlertContext"
import { BrowserRouter as Router , Route , Routes } from "react-router-dom"
import Header from "./components/shared/Header"
import Searching from "./components/shared/Searching"
import UsersList from "./components/shared/UsersList"
import UserProfile from "./components/shared/UserProfile"
import Favourites from "./components/shared/Favourites"
import NotFound from "./components/shared/NotFound"
import Footer from "./components/shared/Footer"
import './index.css'
import SignIn from "./components/shared/SignIn"
import SignUp from "./components/shared/SignUp"
import PrivateRoute from "./components/shared/PrivateRoute"

function App(){

    return (
        <GithubProvider>
            <AlertProvider>
            <Router>
                <Header/>
                <Routes>

                    <Route path ='/' element={<PrivateRoute/>} >

                    <Route index element={
                        <>            
                            <Searching/>
                            <Favourites/>     
                        </>
                    } />
                    </Route>

                    <Route path ='/user' element={<PrivateRoute/>} >
                    <Route path="/user" element = {
                        <>
                            <Searching/>
                            <UsersList/>
                        </>
                    }></Route>
                    </Route>
                    
                    <Route path ='/user/:login' element={<PrivateRoute/>} >
                    <Route path='/user/:login' element={<UserProfile/>} ></Route>
                    </Route>
                    
                    <Route path ='/user/favourites' element={<PrivateRoute/>} >
                    <Route path ='/user/favourites' element={ <Favourites/> } ></Route>
                    </Route>

                    <Route path ='/notfound' element={<PrivateRoute/>} >
                    <Route path='/notfound' element={<NotFound/>} ></Route>
                    </Route>


                    <Route path='/signin' element={<SignIn/>} ></Route>
                    <Route path='/signup' element={<SignUp/>} ></Route>

                </Routes>
                <Footer/>
            </Router>
            </AlertProvider>
        </GithubProvider>
    )
}
export default App