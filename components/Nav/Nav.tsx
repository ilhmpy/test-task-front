import React, { useContext } from "react";
import * as Style from "./Nav.styles";
import { AppContext } from "../../context/Context";
import { roles } from "../../consts/viewArrays";
import { UsersRoles } from "../../types/users";

export const Nav = () => {
    const { user } = useContext(AppContext);
    return (
        <Style.Header>
            <Style.Nickname>{user && `Your nickname: ${user.nickname}, Role: ${roles[user.role]}`}</Style.Nickname>
            <Style.Link to={{ screen: 'News' }}>News</Style.Link>
            <Style.Link to={{ screen: 'Auth' }}>Sign In</Style.Link>
            <Style.Link to={{ screen: "Reg" }}>Sign Up</Style.Link>
            {user && user.role === UsersRoles.Admin && (
                <Style.Link to={{ screen: "Admin" }}>Admin</Style.Link>
            )}
        </Style.Header>
    );
};