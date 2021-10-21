import { createContext, useState } from "react";

const AppGlobalContext = createContext(null);

export const ContextWrapper = (props) => {
    const [AppMode, setAppMode] = useState("client");
    return (
        <AppGlobalContext.Provider value={{AppMode, setAppMode}}>
            {props.children}
        </AppGlobalContext.Provider>
    );
}

export default AppGlobalContext;