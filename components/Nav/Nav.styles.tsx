import styled from "styled-components"
import { Link as LinkComponent } from "@react-navigation/native";

export const Header = styled.View`
    width: 100%;
    height: 120px;
    background: #24e5db;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
`;

export const Link = styled(LinkComponent)`
    margin-right: 15px;
    font-size: 16px;
`;