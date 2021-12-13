import axios from "axios";
import React, { useState, useContext } from "react";
import styled from "styled-components";
import { Input, Button2 as Button } from "../../components";
import { URL, Regex } from "../../consts";
import { AppContext } from "../../context/Context";
import * as SecureStore from 'expo-secure-store';
import { ViewScroll } from "../../GlobalStyles";

export const AuthScreen = ({ navigation }: any) => {
    const [nickname, setNickname] = useState<string | null>(null);
    const [password, setPassword] = useState<string | null>(null);
    const [error, setError] = useState<boolean>(false);
    const { setReload, setReloadNews } = useContext(AppContext);

    const handleSend = async () => {
        if (!error) {
            try {
                const req = await axios.post(`${URL}AuthUser`, { nickname: nickname?.toLowerCase(), password: password?.toLowerCase() })
                const res = await req.data;
                if (!res.data.hasOwnProperty("error")) {
                    await SecureStore.setItemAsync("token", res.data.token);
                    navigation.navigate("News");
                    setReload(true); 
                    setReloadNews(true);
                };
            } catch(e) {
                console.log(e);
            };
        };
    };

    return (
        <ViewScroll>
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
        </ViewScroll>
    )
};

const MarginContainer = styled.View`
    width: 80%;
    max-width: 300px;
    margin: 0 auto;
    padding-top: 80px;
`;