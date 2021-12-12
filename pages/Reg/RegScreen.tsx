import React, { useState, useContext } from "react"
import styled from "styled-components";
import { Input, Button2 as Button } from "../../components";
import { Regex } from "../../consts/regex";
import axios from "axios";
import { URL } from "../../consts/port";
import { ViewScroll } from "../../GlobalStyles";

export const RegScreen = ({ navigation }: any) => {
    const [nickname, setNickname] = useState<string | undefined>();
    const [password, setPassword] = useState<string | undefined>();
    const [error, setError] = useState<boolean>(false);
    const [sign, setSign] = useState<boolean>(false);

    const handleSend = () => {
        if (!error) {
            axios.post(`${URL}CreateUser`, {
                nickname: nickname?.toLowerCase(), password: password?.toLowerCase(), creationDate: new Date()
            }).then((res) => {
                console.log(res); 
                setSign(true);
                navigation.navigate("Confirm");
            }).catch((e) => console.log(e));
        };
    };

    return (
        <ViewScroll>
            <MarginContainer>
                <Sign view={sign}>You sign up! (you will be redirect on news page...)</Sign>
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
        </ViewScroll>
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