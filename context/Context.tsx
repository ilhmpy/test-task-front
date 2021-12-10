import { createContext } from "react";

type AppContextType = {
    user: any;
    setReload: (val: boolean) => void;
}

export const AppContext = createContext<AppContextType>({
    user: null,
    setReload: (val: boolean) => undefined,
});