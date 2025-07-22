import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
    id: string;
    name: string;
    email: string;
    // Add other user fields as needed
}

interface UserValidationContextType {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
    validateToken: (token: string) => Promise<boolean>;
    setUser: (user: User | null) => void;
    setToken: (token: string | null) => void;
    logout: () => void;
}

const UserValidationContext = createContext<UserValidationContextType | undefined>(undefined);

export const useUserValidation = () => {
    const context = useContext(UserValidationContext);
    if (!context) {
        throw new Error('useUserValidation must be used within a UserValidationProvider');
    }
    return context;
};

interface Props {
    children: ReactNode;
}

export const UserValidationProvider: React.FC<Props> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        if (token) {
            validateToken(token).then(valid => {
                setIsAuthenticated(valid);
                if (!valid) {
                    setUser(null);
                    setToken(null);
                }
            });
        } else {
            setIsAuthenticated(false);
        }
    }, [token]);

    const validateToken = async (token: string): Promise<boolean> => {
        // Replace this with your real token validation logic (e.g., API call)
        // Example: return fetch('/api/validate', { headers: { Authorization: `Bearer ${token}` } })
        //   .then(res => res.ok);
        return !!token; // Dummy validation: token exists
    };

    const logout = () => {
        setUser(null);
        setToken(null);
        setIsAuthenticated(false);
    };

    return (
        <UserValidationContext.Provider
            value={{
                user,
                token,
                isAuthenticated,
                validateToken,
                setUser,
                setToken,
                logout,
            }}
        >
            {children}
        </UserValidationContext.Provider>
    );
};