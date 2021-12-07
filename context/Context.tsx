import { createContext } from "react";

type AppContextType = {
    user: any;
}

export const AppContext = createContext<AppContextType>({
    user: null,
});