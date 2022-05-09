import { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export function UserWrapper({ children }) {
    const [User, setUser] = useState(null)
    const [posts, setPosts] = useState([])

    return (
        <UserContext.Provider value={{ User, setUser, posts, setPosts }}>
            {children}
        </UserContext.Provider>
    );
}

export function useUserContext() {
    return useContext(UserContext);
}