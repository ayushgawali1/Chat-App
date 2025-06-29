import { createContext, useEffect, useState } from 'react';
import { io } from "socket.io-client";

export const Context = createContext({
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

    // const [isLogin, setIsLogin] = useState(false);
    const [userData, setUserData] = useState(null);
    const [onlineUserSocketId, setOnlineUserSocketId] = useState([]);
    const [chatMessages, setChatMessages] = useState([]);


    const connectSocket = () => {

        socket.connect();

        socket.on("connect", () => {
            console.log("Socket Id:", socket.id);
        });

        socket.emit("get-all-sockets");
        socket.on("all-sockets", (socketList) => {
            const userId = localStorage.getItem('id');
            const hashSocket = socketList;
            delete hashSocket[userId];
            setOnlineUserSocketId(hashSocket);
            console.log("🧾 All Connected Sockets:", hashSocket);
        });
    }

    const disconnectSocket = (data) => {
        return (
            socket.disconnect()
        );
    }

    const sendReceiveMsg = () => {
        socket.on("send-message", (data) => {
            setChatMessages((prev) => [...prev,data]);
        })
    }


    useEffect(() => {
        sendReceiveMsg();
    }, [])

    const value = {
        Backend_URL, userData, setUserData,
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