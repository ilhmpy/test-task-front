import styled from "styled-components"
import { Link as LinkComponent } from "@react-navigation/native";

export const Header = styled.View`
    width: 100%;
    height: 120px;
    background: #002f34;
    display: flex;
    justify-content: center;
    padding-top: 25px;
    align-items: center;
    flex-direction: row;
`;

export const Link = styled(LinkComponent)`
    margin-right: 15px;
    font-size: 16px;
    color: #fff;
    text-transform: uppercase;
    font-weight: 700;
`;

export const Nickname = styled.Text`
    color: #fff;
    text-transform: uppercase;
    position: absolute;
    top: 35px;
    font-size: 13px;
`;

export const LogOut = styled.Text`
    color: #fff;
    text-transform: uppercase;
    position: absolute; 
    bottom: 15px;
    right: 15px;
    font-size: 13px;
`;