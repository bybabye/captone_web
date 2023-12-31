import { createContext, useCallback, useContext, useEffect } from "react";
import io from "socket.io-client";
import { AuthContext } from "./AuthProvider";
export const SocketContext = createContext();

// eslint-disable-next-line react/prop-types
export default function SocketProvider({ children }) {
  const socket = io.connect("http://localhost:8800");
  const { user } = useContext(AuthContext);
  const addUserToSocket = useCallback(async () => {
    const resolvedUser = await user;
    socket.emit("add-user", resolvedUser.uid);
  }, [socket, user]);
  useEffect(() => {
    if (user) {
      addUserToSocket();
    }
    return () => {
      socket.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addUserToSocket]);
  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
}
