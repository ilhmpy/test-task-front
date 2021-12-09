import * as Style from "./Search.styles";
import React, { useState, useEffect } from "react";
import { NewsViewModel } from "../../types/news";
import { Container, Select, Input, Button2 as Button } from "../index";
import { Regex } from "../../consts/regex";

type SearchProps = {
    state: NewsViewModel[] | undefined;
    setState: (val: NewsViewModel[] | undefined) => void;
    setClear: (val: boolean) => void;
    defaultArray: NewsViewModel[];
};

export const Search = ({ state, setState, setClear, defaultArray }: SearchProps) => {
    const [switchData, setSwitchData] = useState<boolean | null>(null);
    const [date, setDate] = useState<string | undefined>();
    const [notCorrect, setNotCorrect] = useState<boolean>(false);

    function filters(data: NewsViewModel[] = []) {
        let filterData = data.length > 0 ? data : state;
        if (date && !notCorrect) {
            const match = date.match(Regex.date);
            const now = match && new Date(match[3], match[2] - 1, match[1], 0, 0, 0);
            filterData = filterData?.filter((i) => {
                const totalSeconds = now?.getTime() / 1000;
                const totalSecondsI = new Date(i.creationDate).getTime() / 1000;
                if (totalSeconds === totalSecondsI) {
                    return i;
                };
            });
        };
        if (switchData != null) {
            filterData = filterData?.filter(((i) => i.confirmed === switchData));
        };
        return filterData;
    };

    const confirmFilters = () => {
        const filterData = filters();
        setState(filterData);
    };

    const handleClear = () => {
        setClear(true);
        setSwitchData(null);
        setDate(undefined);
        setNotCorrect(false);
    };

    useEffect(() => {
        if (switchData !== null) {
            const filtersData = filters(defaultArray);
            setState(filtersData);
        };
    }, [switchData]);

    return (
        <Style.InputContainer>
            <Container center>
                <Select 
                    array={["Confirmed", "Not confirmed"]} 
                    state={switchData} setState={setSwitchData} 
                />
                <Input 
                    placeholder={"Filter by date, format DD.MM.YYYY"} 
                    state={date} setState={setDate} 
                    pattern={Regex.date}
                    error={notCorrect}
                    setError={setNotCorrect}
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