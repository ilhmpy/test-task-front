import { createContext } from "react";
import { UsersViewModel } from "../types/users";

type AppContextType = {
    user: any;
    setReload: (val: boolean) => void;
    reload: boolean;
    reloadNews: boolean;
    setReloadNews: (val: boolean) => void;
    setUser: (val: UsersViewModel | null) => void;
}

export const AppContext = createContext<AppContextType>({
    user: null,
    setUser: (val: UsersViewModel | null) => undefined,
    setReload: (val: boolean) => undefined,
    reload: false,
    reloadNews: false,
    setReloadNews: (val: boolean) => undefined,
});