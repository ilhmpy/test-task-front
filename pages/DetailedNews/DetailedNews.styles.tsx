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
    margin-bottom: 200px;
`;

export const Date = styled.Text`
    margin-top: 10px;
    font-size: 13px;
    color: #ccc;
    margin-bottom: 10px;
`;