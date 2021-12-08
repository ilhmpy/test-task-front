import styled from "styled-components";
import React from "react";

type SelectProps = {
    array: string[];
    setState: (val: boolean) => void;
    state: boolean;
};

export const Select = ({ array, setState, state }: SelectProps) => {
    function handleSelect(val: string) {
        setState(val === "Confirmed");
    };

    return (
        <SelectContainer>
            <SelectVar select title fs={20} mb={50}>{state ? array[0] : array[1]}</SelectVar>
            <SelectVars>
                {array && array.map((i) => (
                    <SelectVar 
                        onPress={() => handleSelect(i)} 
                        fs={12} mb={5} title key={Math.random() * 1000}
                    >
                        {i}
                    </SelectVar>
                ))}
            </SelectVars> 
        </SelectContainer>
    );
};

const SelectContainer = styled.View`
    width: 100%;
    height: 100px;
    padding-top: 10px;
`;

const SelectVars = styled.View`
    width: 100%;
    position: absolute;
    top: 20px;
`;

const SelectVar = styled.Text<{ select: boolean; }>`
    font-size: 17px;
    line-height: 20px;
    display: flex;
    margin-top: 10px;
    font-weight: 400;
    ${({ select }) => select && `
        font-size: 20px;
        font-weight: 500;
        margin-top: 0px;
    `}
`;