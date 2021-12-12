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
`;

const NoItemsText = styled.Text`
    text-align: center;
    margin-top: 40px;
    font-size: 16px;
    color: red;
`;