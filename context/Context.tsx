import { createContext } from "react";
import { UsersViewModel } from "../types/users";

type AppContextType = {
    user: any;
    reloadNews: boolean;
    setReloadNews: (val: boolean) => void;
    setReload: (val: boolean) => void,
    setUser: (val: UsersViewModel | null) => void;
}

export const AppContext = createContext<AppContextType>({
    user: null,
    setUser: (val: UsersViewModel | null) => undefined,
    reloadNews: false,
    setReload: (val: boolean) => undefined,
    setReloadNews: (val: boolean) => undefined,
});