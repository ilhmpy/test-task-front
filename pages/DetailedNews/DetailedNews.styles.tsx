import styled from "styled-components";

export const Block = styled.View<{ first?: boolean; }>`
    width: 86%;
    margin: 0 auto;
    margin-top: 20px;
    margin-bottom: 20px;
    border-radius: 4px;
    padding: 20px;
    background: #fff; 
    ${({ first }) => first && `
        margin-bottom: 0px;
    `}
`;

export const Comment = styled.View`
    width: 100%;
    min-height: 50px;
    padding-top: 10px;
    padding-bottom: 20px;
    border-bottom-width: 1px;
    border-style: solid;
    border-color: #000;
    margin-bottom: 10px;
`;

export const AddComment = styled.View`
    margin-top: 20px;
    width: 100%;
`;

export const Input = styled.TextInput`
    width: 100%;
    height: 50px;
    border-color: #000;
    border-width: 1px;
    border-style: solid;
    margin-bottom: 15px;
    padding-left: 10px;
    border-radius: 4px;
    &::placeholder {
        color: #000;
    }
`;

export const Button = styled.Button`
    width: 100%;
    height: 50px;
    border-width: 1px;
    border-style: solid;
    background-color: #1E6738;
    border-radius: 4px;
    margin-bottom: 15px;
`;