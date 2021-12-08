import styled from "styled-components";

export const Container = styled.View<{ center?: boolean; pt?: number; }>`
    width: 100%;
    padding-top: 20px;
    ${({ center }) => center && `
        margin: 0 auto;
        padding-top: 0px;
        max-width: 80%;
    `}
`;