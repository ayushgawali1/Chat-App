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
    chatMessages: [],
    setChatMessages: () => { },
    newMessage: [],
    setNewMessage: () => { },
    chats:[],
    setChats:() => { },
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
    const [newMessage, setNewMessage] = useState([]);
    const [chats, setChats] = useState([]);


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
            // setNewMessage((prev) => {
            //     const exists = prev.find((item) => item.sender == data.sender && item.receiver == data.receiver);
            //     if (exists) {
            //         // Replace the existing message with the updated one
            //         return prev.map((item) =>
            //             item.sender == data.sender && item.receiver == data.receiver ? data : item
            //         );
            //     }
            //     return [...prev, data]
            // });
            setChatMessages((prev) => [...prev, data]);
        })
    }

    const getSidebarUser = () => {
        socket.on("get-newly-added-sidebar-user",(chatData)=>{
            setChats((prev) => ([...prev,chatData]));
        });
    }


    useEffect(() => {
        getSidebarUser();
        sendReceiveMsg();
    }, [])

    const value = {
        Backend_URL, userData, setUserData,
        socket, connectSocket, sendReceiveMsg, disconnectSocket, onlineUserSocketId,
        chatMessages, setChatMessages,
        newMessage, setNewMessage,
        chats, setChats
    }

    return (
        <Context.Provider value={value}>
            {children}
        </Context.Provider>
    )
}

export default ContextProvider