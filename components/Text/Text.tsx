import styled from "styled-components";

type TextProps = {
    title?: boolean;
    text?: boolean; 
    overflowNone?: boolean; 
    fs?: number;
};

export const Text = styled.Text<TextProps>`
    font-weight: 400;
    ${({ title, text, overflowNone, fs }) => {
        if (title) {
            return `
                font-size: ${fs ? fs : 24}px;
                margin-bottom: 10px;
            `;
        };
        if (text) {
            return `
                font-size: ${fs ? fs : 15}px;
                ${!overflowNone && `
                    overflow: hidden; 
                    max-height: 40px;
                `}
            `;
        };
    }}
`;