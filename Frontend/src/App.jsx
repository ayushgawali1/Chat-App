import { Routes, Route } from "react-router"
import Home from './Pages/Home'
import Navbar from './Components/Navbar'
import Login from './Pages/Login'
import SignUp from "./Pages/SignUp"
import { useContext, useEffect } from "react"
import { Context } from "./store/context"
import axios from "axios"
import Profile from "./Pages/Profile"

function App() {

  const { setIsLogin, setUserData, Backend_URL,connectSocket,socket } = useContext(Context);

  const getUser = async () => {
    const id = localStorage.getItem('id');
    try {
      const responce = await axios.post(`${Backend_URL}/auth/user`, { userId: id });
      setUserData(responce.data);
      setIsLogin(true);
      socket.auth = {userId:id}
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
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </div>
  )
}

export default App