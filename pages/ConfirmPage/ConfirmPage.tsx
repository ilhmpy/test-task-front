import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Container } from "../../components";

export const ConfirmPage = ({ navigation }: any) => {
    return (
        <ConfirmContainer>
            <Text>
                Now you need waiting while admin to confirm your account
            </Text>
        </ConfirmContainer>
    );
};

const ConfirmContainer = styled.View`
    width: 100%;
`;

const Text = styled.Text`
    text-align: center;
    padding-top: 120px;
    max-width: 80%;
    margin: 0 auto;
    font-size: 20px;
`;