import { createContext } from "react";

type AppContextType = {
    user: any;
    setReload: (val: boolean) => void;
    reload: boolean;
    reloadNews: boolean;
    setReloadNews: (val: boolean) => void;
}

export const AppContext = createContext<AppContextType>({
    user: null,
    setReload: (val: boolean) => undefined,
    reload: false,
    reloadNews: false,
    setReloadNews: (val: boolean) => undefined,
});