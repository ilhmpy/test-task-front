import styled from "styled-components";  
import React, { ReactNode } from "react";    
import { Text as TextComponent} from "react-native";

type ButtonProps = {
    bg?: string; 
    wd?: string; 
    children?: ReactNode;
    cl?: string;
    onPress?: () => void;
};

export const Button2 = (props: ButtonProps) => {
    return (
        <Button {...props} onPress={props.onPress ? props.onPress : () => undefined}>
            <Text cl={props.cl}>
                {props.children}
            </Text>
        </Button>
    );
};

const Text = styled(TextComponent)<{ cl?: string; }>`
    color: ${({ cl }) => cl ? cl : "#fff"};
`;

const Button = styled.TouchableOpacity<ButtonProps>`
    width: ${({ wd }) => wd ? wd : "100px"};
    height: 50px;
    border-radius: 4px;
    background: ${({ bg }) => bg ? bg : "#000"};
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
    margin-bottom: 10px;
`;