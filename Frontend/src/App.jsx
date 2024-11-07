import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Login from "./pages/login/Login.jsx"
import SignUp from './pages/signup/SignUp.jsx'
import Sidebar from './components/sidebar/Sidebar.jsx'
import Home from './pages/home/Home.jsx'
import { Navigate ,Routes,Route} from 'react-router-dom'
import { useAuthContext } from './context/AuthContext.jsx'
import { ToastContainer } from 'react-toastify'


function App() {
	const { authUser } = useAuthContext();
  
  return (<>
    <ToastContainer/>
    <div className='p-4 h-screen flex items-center '>
    <Routes>
    <Route path='/' element={authUser ? <Home /> : <Navigate to={"/login"} />} />
				<Route path='/login' element={authUser ? <Navigate to='/' /> : <Login />} />
				<Route path='/signup' element={authUser ? <Navigate to='/' /> : <SignUp />} />  
          </Routes>
   {/* <Home/> */}
      {/* <SignUp/> */}
      {/* <Login/> */}
    
    </div>
    </>
  )
}

export default App
