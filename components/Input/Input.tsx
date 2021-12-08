import styled from "styled-components";
import React from "react";

type InputProps = {
    placeholder: string;
    setState: (val: string) => void;
    state: string | undefined;
    onChange?: () => void;
    pattern?: any;
};

export const Input = ({ placeholder, setState, state, onChange, pattern }: InputProps) => {
    const changeText = (val: string) => {
        if (pattern) {
            if (val[0] === ".") {
                return;
            };
            const current = val.replace(pattern, "");
            console.log(current);
            setState(current);
        } else {
            setState(val);
        };
        onChange && onChange();
    };
    return (
        <TextInput 
            onChangeText={changeText} placeholder={placeholder} 
            value={state} 
        />
    );
};

const TextInput = styled.TextInput`
    width: 100%;
    height: 50px;
    display: flex;
    border-color: #000;
    border-width: 1px;
    border-style: solid;
    margin-bottom: 15px;
    padding-left: 10px;
    border-radius: 4px;
    &::placeholder {
        color: #000;
    }
`;