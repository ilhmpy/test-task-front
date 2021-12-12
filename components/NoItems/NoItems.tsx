import React from "react";
import styled from "styled-components";

export const NoItems = () => {
    return (
        <NoItemsContainer>
            <NoItemsText>
                Oops there is nothing here
            </NoItemsText>
        </NoItemsContainer>
    );
};

const NoItemsContainer = styled.View`
    width: 100%;
    min-height: 800px;
    justify-content: center;
    align-items: center;
`;

const NoItemsText = styled.Text`

`;