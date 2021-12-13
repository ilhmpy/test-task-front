import React, { useContext } from "react";
import * as Style from "./Nav.styles";
import { AppContext } from "../../context/Context";
import { roles, URL } from "../../consts";
import { UsersRoles } from "../../types";
import * as SecureStore from "expo-secure-store";
import axios from "axios";

export const Nav = ({ navigation }: any) => {
    const { user, setUser } = useContext(AppContext);

    const onLogOut = async () => {
        const token = await SecureStore.getItemAsync("token");
        const req = await axios.post(`${URL}UnAuth`, { token })
        const res = await req.data;
        console.log("UnAuth", res);
        await SecureStore.deleteItemAsync("token");
        setUser(null);
        navigation.navigate("News");
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