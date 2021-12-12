import React, { useState, useEffect, useContext } from "react";
import { Container, Text, StateButton } from "../../components";
import { UsersViewModel, UsersRoles } from "../../types/users";
import { ViewScroll } from "../../GlobalStyles";
import { sortByDate } from "../../utils/sortByDate";
import * as Style from "./AdminScreen.styles";
import moment from "moment";
import { roles } from "../../consts/viewArrays";
import axios from "axios";
import { URL } from "../../consts/port";
import * as SecureStore from 'expo-secure-store';
import { AppContext } from "../../context/Context";
import { Spinner as SpinnerComponent } from "../../components/Spinner/Spinner";

export const AdminScreen = ({ navigation }: any) => {
    const [editors, setEditors] = useState<UsersViewModel[] | null>(null);
    const { user, setReload } = useContext(AppContext);
    const [isFocused, setIsFocused] = useState(true);

    async function GetEditors() {
        const token = await SecureStore.getItemAsync("token");
        if (token) {
            axios.get(`${URL}GetEditors?token=${token}`)
                .then((res) => { 
                    console.log("GetEditors", res.data, token);
                    setEditors((sortByDate(res.data)).filter((i) => i.nickname != user.nickname));
                }).catch((err) => console.log(err))
                .finally(() => setIsFocused(false));
        };  
    };

    useEffect(() => {
        if (isFocused) {
            GetEditors();
        };
    }, [isFocused]);

    useEffect(() => {
        const focus = navigation.addListener("focus", (focus: any) => {
            setIsFocused(true);
        }); 
        return focus;
    }, [isFocused]);

    function changeEditorsState(bool: boolean, id: string, type: string, idx: number, data = {}) {
        editors?.forEach((i: any, idx: number) => {
            if (i._id === id) {
                editors[idx] = type === "block" ? 
                    { ...editors[idx], blocked: bool } : { ...editors[idx], confirmed: bool, ...data} ;
                setEditors([...editors]); 
            }; 
        });
    }; 

    async function changeEditorBlocked(type: "block" | "confirm", bool: boolean, id: string, idx: number) {
        const token = await SecureStore.getItemAsync("token");
        if ((user?.role === UsersRoles.Admin) && token) {
            axios.post(`${URL}ChangeEditorBlocked`, { type, bool, id, token })
            .then(() => {
                changeEditorsState(bool, id, type, idx);
            }).catch((err) => {
                console.log(err);
            });
        };
    };

    async function changeEditorConfirmed(type: "block" | "confirm", bool: boolean, id: string, idx: number) {
        console.log(bool);
        const token = await SecureStore.getItemAsync("token");
        if ((user?.role === UsersRoles.Admin) && token) {
            axios.post(`${URL}ChangeEditorConfirmed`, { type, bool, id, token })
            .then(() => {
                changeEditorsState(bool, id, type, idx, { role: bool ? UsersRoles.Editor : UsersRoles.User });
            }).catch((err) => {
                console.log(err);
            }); 
        };
    };

    if (editors === null) {
        return <SpinnerComponent />
    };

    return (
        <ViewScroll>
            <Container center pt={20}>
                {editors?.map((i: any, idx) => (
                    <Style.User key={Math.random() * 1000}>
                        <Style.Texts>
                            <Text title fs={17}>Nickname: {i.nickname}.</Text>
                            <Text title fs={17}>Create date: {moment(i.creationDate).format("DD.MM.YYYY HH:MM")}.</Text>
                            <Text title fs={17}>Confirmed: {i.confirmed ? "Yes" : "No"}.</Text>
                            <Text title fs={17}>Role: {roles[i.role]}.</Text>
                            <Text title fs={17}>Blocked: {i.blocked ? "Yes" : "No"}.</Text>
                        </Style.Texts>
                        <StateButton 
                            bool={i.blocked}
                            onPress={() => changeEditorBlocked("block", !i.blocked, i._id, idx)}
                        >
                            {i.blocked ? "Un block" : "Block"}
                        </StateButton>
                        <StateButton
                            bool={!i.confirmed}
                            onPress={() => changeEditorConfirmed("confirm", !i.confirmed, i._id, idx)}
                        >
                            {i.confirmed ? "Un Confirm" : "Confirm"}
                        </StateButton>
                    </Style.User>
                ))}
            </Container>
        </ViewScroll>
    );
};