import { createContext, useEffect, useState } from 'react';
import { io } from "socket.io-client";

export const Context = createContext({
    isLogin: false,
    setIsLogin: () => { },
    Backend_URL: "http://localhost:5000",
    userData: {},
    setUserData: () => { },
    socket: '',
    connectSocket: () => { },
    disconnectSocket: () => { },
    onlineUserSocketId: [],
    chatMessages:[],
    setChatMessages:()=>{},
});

const Backend_URL = "http://localhost:5000";

const socket = io(Backend_URL, {
    autoConnect: false,
    // query: {
    //     userId: localStorage.getItem("id"),
    // }
});

const ContextProvider = ({ children }) => {

    const [isLogin, setIsLogin] = useState(false);
    const [userData, setUserData] = useState(null);
    const [onlineUserSocketId, setOnlineUserSocketId] = useState([]);
    // const [realTimeChat,setRealTimeChat] = useState([]);
    const [chatMessages, setChatMessages] = useState([]);


    const connectSocket = () => {

        socket.connect();

        socket.on("connect", () => {
            console.log("Socket Id:", socket.id);
        });

        socket.emit("get-all-sockets");
        socket.on("all-sockets", (socketList) => {
            const arr = socketList.filter((item) => {
                if (Object.values(item)[0] != socket.id) {
                    return item
                }
            })
            setOnlineUserSocketId(arr);
            console.log("🧾 All Connected Sockets:", arr);
        });
    }

    const disconnectSocket = () => {
        return (
            socket.disconnect()
        );
    }

    const sendReceiveMsg = () => {
        socket.on("send-message", (data) => {
            console.log(data);
            // setRealTimeChat(data);
            setChatMessages((prev) => [...prev,data]);
        })
    }


    useEffect(() => {
        sendReceiveMsg();
    }, [])

    const value = {
        isLogin, setIsLogin, Backend_URL, userData, setUserData,
        socket, connectSocket, sendReceiveMsg, disconnectSocket, onlineUserSocketId ,
        chatMessages, setChatMessages
    }

    return (
        <Context.Provider value={value}>
            {children}
        </Context.Provider>
    )
}

export default ContextProvider