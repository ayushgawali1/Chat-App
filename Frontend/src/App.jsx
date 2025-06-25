import { Routes, Route } from "react-router"
import Home from './Pages/Home'
import Navbar from './Components/Navbar'
import { useContext, useEffect } from "react"
import { Context } from "./store/context"
import axios from "axios"
import Profile from "./Pages/Profile"
import AddFriend from "./Pages/AddFriend"
import CreateGroup from "./Pages/createGroup"
import LoginSignup from "./Pages/LoginSignup"
import { ToastContainer } from 'react-toastify';
import { Navigate } from 'react-router-dom';

function App() {

  const { userData, setUserData, Backend_URL, connectSocket, socket } = useContext(Context);

  const getUser = async () => {
    const id = localStorage.getItem('id');
    try {
      const responce = await axios.post(`${Backend_URL}/auth/user`, { userId: id });
      setUserData(responce.data);
      socket.auth = { userId: id }
      connectSocket();
    } catch (error) {
      console.log("error in get User", error.message);
    }
  }

  useEffect(() => {
    getUser();
  }, [])

  return (
    <div>
      <ToastContainer />
      <Navbar />
      <Routes>
        <Route path='/' element={userData ? <Home /> : <Navigate to="/login-signup" />} />
        <Route path="/login-signup" element={ userData ? <Navigate to="/" />  : <LoginSignup />} />
        <Route path="/profile" element={ userData ? <Profile /> : <Navigate to="/login-signup" /> } />
        <Route path="/search" element={<AddFriend />} />
        <Route path="/create-group" element={<CreateGroup />} />
      </Routes>
    </div>
  )
}

export default App