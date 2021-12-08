import * as Style from "./Search.styles";
import React, { useState, useEffect } from "react";
import { NewsViewModel } from "../../types/news";
import { Container, Select, Input, Button2 as Button } from "../index";
import { Regex } from "../../consts/regex";

type SearchProps = {
    state: NewsViewModel[] | undefined;
    setState: (val: NewsViewModel[] | undefined) => void;
    setClear: (val: boolean) => void;
};

export const Search = ({ state, setState, setClear }: SearchProps) => {
    const [switchData, setSwitchData] = useState<boolean>(true);
    const [date, setDate] = useState<string | undefined>();

    const confirmFilters = () => {
        if (date) {
            
        } else {
            setState(state?.filter(((i) => i.confirmed === switchData)));
        };
    };

    const handleClear = () => {
        setClear(true);
        setSwitchData(true);
        setDate(undefined);
    };

    return (
        <Style.InputContainer>
            <Container center>
                <Select 
                    array={["Confirmed", "Not confirmed"]} 
                    state={switchData} setState={setSwitchData} 
                />
                <Input 
                    placeholder={"Filter by date"} 
                    state={date} setState={setDate} 
                    pattern={Regex.date}
                />
                <Button 
                    wd="100%" 
                    onPress={confirmFilters} 
                >
                    Confirm filters
                </Button>
                <Button
                    wd="100%"  
                    onPress={handleClear} 
                >
                    Clear Filters
                </Button>
            </Container>
        </Style.InputContainer>
    );
};