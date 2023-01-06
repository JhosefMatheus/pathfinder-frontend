import { useState, createContext, useEffect } from "react";

export const UserContext = createContext([]);

export default function UserProvider({ children }) {
    const [user, setUser] = useState(null);

    useEffect(() => {
        if (!user && localStorage.getItem("user")) {
            const { id, name, login } = JSON.parse(localStorage.getItem("user"));

            setUser({ id, name, login });
        }
    }, []);

    return (
        <UserContext.Provider
            value={{
                user,
                setUser
            }}
        >
            {children}
        </UserContext.Provider>
    );
}