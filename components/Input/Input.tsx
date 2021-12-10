import styled from "styled-components";
import React from "react";

type InputProps = {
    placeholder: string;
    setState: (val: string) => void;
    state: string | null;
    onChange?: () => void;
    pattern?: any;
    error?: boolean;
    setError?: (val: boolean) => void;
    editable?: boolean;
    props?: any;
};

export const Input = ({ 
    placeholder, setState, state, 
    onChange, pattern, editable, 
    error = false, setError = (val: boolean) => undefined,
    props,
}: InputProps) => {
    const changeText = (val: string) => {
        if (val.length > 0) {
            if (pattern) {
                if (val[0] === ".") {
                    return;
                };
                const current = val.match(pattern);
                setError(current == null);
            };
        };
        setState(val);
        onChange && onChange();
    };
    
    return (
        <TextInput 
            error={error}
            onChangeText={changeText} placeholder={placeholder} 
            value={state} 
            editable={editable}
            edt={editable}
            {...props}
        />
    );
};

const TextInput = styled.TextInput<{ error: boolean; edt: boolean; }>`
    width: 100%;
    height: 50px;
    display: flex;
    border-color: ${({ error }) => error ? "red" : "#000"};
    border-width: 1px;
    border-style: solid;
    margin-bottom: 15px;
    padding-left: 10px;
    border-radius: 4px;
    ${({ edt }) => edt && `
        min-height: 100px;
    `}
`;