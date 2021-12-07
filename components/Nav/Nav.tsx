import React, { useState } from "react";
import * as Style from "./Nav.styles";

export const Nav = () => {
    return (
        <Style.Header>
            <Style.Link to={{ screen: 'News' }}>News</Style.Link>
            <Style.Link to={{ screen: 'Auth' }}>Sign In</Style.Link>
            <Style.Link to={{ screen: "Reg" }}>Sign Up</Style.Link>
            <Style.Link to={{ screen: "Admin" }}>Admin</Style.Link>
        </Style.Header>
    );
};