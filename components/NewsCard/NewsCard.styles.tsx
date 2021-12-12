import styled from "styled-components";

export const Card = styled.TouchableOpacity<{ confirmed: boolean; }>`
    width: 100%;
    max-height: 300px; 
    max-width: 300px;
    margin: 0 auto;
    margin-bottom: 20px;
    background: #fff;
    border-radius: 3px;
    padding: 20px;
    display: none;
    ${({ confirmed }) => confirmed && `
        display: flex;
    `}
`;   

export const Date = styled.Text`
    margin-top: 10px;
    font-size: 13px;
    color: #ccc;
`;

export const Confirmed = styled.Text<{ confirm: boolean; }>`
    font-size: 13px;
    position: absolute;
    right: 20px;
    top: 20px;
    font-weight: 600;
    color: ${({ confirm }) => confirm ? "green" : "red"};
`;