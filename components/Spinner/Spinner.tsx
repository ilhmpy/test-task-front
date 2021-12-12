import styled from "styled-components";
import React from "react";
import { StyleSheet, ActivityIndicator } from "react-native";

export const Spinner = () => {
    return (
        <SpinnerContainer style={[styles.container, styles.horizontal]}>
            <ActivityIndicator size="large" color="#002f34" />
        </SpinnerContainer>
    );
};

const SpinnerContainer = styled.View`
    width: 100%;
    height: 1200px;
    background: #fff;
`;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center"
    },
    horizontal: {
      flexDirection: "row",
      justifyContent: "space-around",
      padding: 10
    }
});

const SpinnerLoader = styled.ActivityIndicator``;

