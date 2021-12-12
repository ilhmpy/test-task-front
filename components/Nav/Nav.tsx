import React, { useContext } from "react";
import * as Style from "./Nav.styles";
import { AppContext } from "../../context/Context";
import { roles } from "../../consts/viewArrays";
import { UsersRoles } from "../../types/users";
import * as SecureStore from "expo-secure-store";
import axios from "axios";
import { URL } from "../../consts/port";

export const Nav = () => {
    const { user, setUser } = useContext(AppContext);
    async function onLogOut() {
        const token = await SecureStore.getItemAsync("token");
        axios.post(`${URL}UnAuth`, { token })
            .then(async (res) => {
                console.log("UnAuth", res);
                setUser(null);
                await SecureStore.deleteItemAsync("token");
            }).catch((err) => console.log("UnAuthError", err));
    };
    return (
        <Style.Header>
            <Style.Nickname>{user && `Your nickname: ${user.nickname}, Role: ${roles[user.role]}`}</Style.Nickname>
            <Style.Link to={{ screen: 'News' }}>News</Style.Link>
            <Style.Link to={{ screen: 'Auth' }}>Sign In</Style.Link>
            <Style.Link to={{ screen: "Reg" }}>Sign Up</Style.Link>
            {user?.role === UsersRoles.Admin && (
                <Style.Link to={{ screen: "Admin" }}>Admin</Style.Link>
            )}
            {user && <Style.LogOut onPress={onLogOut}>Logout</Style.LogOut>}
        </Style.Header>
    );
};