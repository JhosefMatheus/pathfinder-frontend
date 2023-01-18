import { useState, createContext, useEffect } from "react";
import PathfinderModel from "../models/PathfinderModel";

export const UserContext = createContext([]);

export default function UserProvider({ children }) {
    const [user, setUser] = useState(null);
    const [pathfinders, setPathfinders] = useState([]);

    useEffect(() => {
        if (!user && localStorage.getItem("user")) {
            const { id, name, login } = JSON.parse(localStorage.getItem("user"));

            setUser({ id, name, login });
        }

        if (pathfinders.length === 0 && localStorage.getItem("pathfinders")) {
            const tempPathfinders = JSON.parse(localStorage.getItem("pathfinders"));

            setPathfinders(tempPathfinders.map(e => new PathfinderModel({ id: e.id, name: e.name, userId: e.userId })));
        }
    }, []);

    return (
        <UserContext.Provider
            value={{
                user,
                setUser,
                pathfinders,
                setPathfinders
            }}
        >
            {children}
        </UserContext.Provider>
    );
}