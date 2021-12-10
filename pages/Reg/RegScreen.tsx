import React, { useState, useContext } from "react"
import styled from "styled-components";
import { Input, Button2 as Button } from "../../components";
import { Regex } from "../../consts/regex";
import axios from "axios";
import { URL } from "../../consts/port";
import * as SecureStore from 'expo-secure-store';

export const RegScreen = () => {
    const [nickname, setNickname] = useState<string | undefined>();
    const [password, setPassword] = useState<string | undefined>();
    const [error, setError] = useState<boolean>(false);
    const [sign, setSign] = useState<boolean>(false);

    const handleSend = () => {
        if (!error) {
            axios.post(`${URL}CreateUser`, {
                nickname, password: password?.toLowerCase(), creationDate: new Date()
            }).then((res) => {
                console.log(res); 
                setSign(true);
            }).catch((e) => console.log(e));
        };
    };

    return (
        <MarginContainer>
            <Sign view={sign}>You sign up!</Sign>
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
            <Button wd="100%" onPress={handleSend}>SIGN UP</Button>
        </MarginContainer>
    )
};

const Sign = styled.Text<{ view: boolean; }>`
    font-size: 16px;
    color: green;
    margin-bottom: 10px;
    display: ${({ view }) => view ? "flex" : "none"};
`;

const MarginContainer = styled.View`
    width: 80%;
    max-width: 300px;
    margin: 0 auto;
    padding-top: 80px;
`;