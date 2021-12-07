import styled from "styled-components";

export const Card = styled.View`
    width: 100%;
    background: red;
    max-height: 300px; 
    max-width: 300px;
    margin: 0 auto;
    margin-bottom: 20px;
    background: #fff;
    border-radius: 3px;
    padding: 20px;
`;   

export const Text = styled.Text<{ title?: boolean; text?: boolean; }>`
    font-weight: 400;
    ${({ title, text }) => {
        if (title) {
            return `
                font-size: 24px;
                margin-bottom: 10px;
            `;
        };
        if (text) {
            return `
                font-size: 15px;
                max-height: 40px;
                overflow: hidden; 
            `;
        };
    }}
`;