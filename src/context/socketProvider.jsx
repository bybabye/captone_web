import { createContext, useContext, useEffect } from 'react';
import io from 'socket.io-client';
import { AuthContext } from './AuthProvider';
export const SocketContext = createContext();

export default function SocketProvider({children}) {
    const socket = io.connect('http://localhost:8800');
    const { user } = useContext(AuthContext);
    const addUserToSocket = async () => {
        const resolvedUser = await user;
        socket.emit("add-user", resolvedUser.uid);
    }
    useEffect(() => {
        addUserToSocket()
  
        return () => {
            socket.disconnect();
        };
    },[])
    return (
        <SocketContext.Provider value={socket}>
                {children}
        </SocketContext.Provider>
    )
}