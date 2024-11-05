import { createContext, useContext, useState } from "react";

export const AppContext = createContext();

const useAppContextValue = () => {
    const [registerform, setRegisterForm] = useState(false);
    return { registerform, setRegisterForm };
};

export const AppProvider = ({ children }) => {
    const value = useAppContextValue();

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    );

};

export const useApp = () => {
    return useContext(AppContext);
};
