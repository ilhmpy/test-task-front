import React, { useState } from "react";
import styled from "styled-components";
import { Input, Button2 as Button } from "../../components";
import { Regex } from "../../consts/regex";

export const AuthScreen = ({ navigation }: any) => {
    const [nickname, setNickname] = useState<string | undefined>();
    const [password, setPassword] = useState<string | undefined>();
    const [error, setError] = useState<boolean>(false);

    const handleSend = () => {
        return undefined;
    };

    return (
        <MarginContainer>
            <Input 
                placeholder="Enter your nickname" 
                state={nickname}
                setState={setNickname}
            />
            <Input 
                placeholder="Enter your password" 
                state={password}
                setState={setPassword}  
                pattern={Regex.password}
                error={error}
                setError={setError}
            />
            <Button wd="100%" onPress={handleSend}>SIGN IN</Button>
        </MarginContainer>
    )
};

const MarginContainer = styled.View`
    width: 80%;
    max-width: 300px;
    margin: 0 auto;
    padding-top: 80px;
`;