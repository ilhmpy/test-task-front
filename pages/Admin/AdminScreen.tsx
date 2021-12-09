import React, { useState, useEffect } from "react";
import { Container, Text, Button2 as Button } from "../../components";
import { UsersViewModel, UsersRoles } from "../../types/users";
import { ViewScroll } from "../../GlobalStyles";
import { sortByDate } from "../../utils/sortByDate";
import * as Style from "./AdminScreen.styles";
import moment from "moment";

export const AdminScreen = () => {
    const [editors, setEditors] = useState<UsersViewModel[] | undefined>();

    useEffect(() => {
        const sort = sortByDate([
            { id: 0, nickname: "vladislav", creationDate: new Date(), confirmed: false, role: UsersRoles.Editor, blocked: false },
            { id: 0, nickname: "vladislav", creationDate: new Date(), confirmed: true, role: UsersRoles.Editor, blocked: false },
            { id: 0, nickname: "vladislav", creationDate: new Date(), confirmed: false, role: UsersRoles.Editor, blocked: false},
            { id: 0, nickname: "vladislav", creationDate: new Date(), confirmed: true, role: UsersRoles.Editor, blocked: false },
            { id: 0, nickname: "vladislav", creationDate: new Date(), confirmed: false, role: UsersRoles.Editor, blocked: false },
            { id: 0, nickname: "vladislav", creationDate: new Date(), confirmed: true, role: UsersRoles.Editor, blocked: false },
            { id: 0, nickname: "vladislav", creationDate: new Date(), confirmed: false, role: UsersRoles.Editor, blocked: false },
            { id: 0, nickname: "vladislav", creationDate: new Date(), confirmed: true, role: UsersRoles.Editor, blocked: false },
        ]);
        setEditors(sort);
    }, []);

    const roles = [
        "User",
        "Editor",
        "Admin"
    ];

    return (
        <ViewScroll>
            <Container center pt={20}>
                {editors && editors.map((i) => (
                    <Style.User key={Math.random() * 1000}>
                        <Style.Texts>
                            <Text title fs={17}>Nickname: {i.nickname}.</Text>
                            <Text title fs={17}>Create date: {moment(i.creationDate).format("DD.MM.YYYY HH:MM")}.</Text>
                            <Text title fs={17}>Confirmed: {i.confirmed ? "Yes" : "No"}.</Text>
                            <Text title fs={17}>Role: {roles[i.role]}.</Text>
                            <Text title fs={17}>Blocked: {i.blocked ? "Yes" : "No"}.</Text>
                        </Style.Texts>
                        <Button 
                            wd={180} bg={i.blocked ? "green" : "red"}
                           
                        >
                            {i.blocked ? "Un blocked" : "Blocked"}
                        </Button>
                        <Button
                            wd={180} bg={i.confirmed ? "red" : "green"}
                        >{i.confirmed ? "Un Confirmed" : "Confirmed"}</Button>
                    </Style.User>
                ))}
            </Container>
        </ViewScroll>
    );
};