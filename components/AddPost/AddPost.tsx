import React, { useContext, useState } from "react";
import * as Style from "./AddPost.styles";
import { Container, Input, Button2 as Button } from "../index";
import axios from "axios";
import { URL } from "../../consts/port";
import * as SecureStore from 'expo-secure-store';
import { AppContext } from "../../context/Context";

export const AddPost = (props: any) => {
    const [title, setTitle] = useState<string | null>(null);
    const [description, setDescription] = useState<string | null>(null);
    const { user } = useContext(AppContext);

    async function handleSend() {
       if (description && title && description.length > 0 && title.length > 0) {
            const token = await SecureStore.getItemAsync("token") || null;
            axios.post(`${URL}InsertPost`, 
                { token, post: { 
                        title, description, creatorId: user.id, creatorName: user.nickname 
                    } 
                }).then((res) => {
                    console.log(res);
                    props?.setReload(true);
                }).catch((e) => {
                    console.log(e);
                }); 
       };
    };

    return (
        <Style.Block>
            <Container center>
                <Input 
                    placeholder="Title"
                    state={title}
                    setState={setTitle}
                />
                <Input 
                    editable
                    placeholder="Text"
                    state={description}
                    setState={setDescription}
                    props={{
                        multiline: true,
                        numberOfLines: 5,
                        maxLength: 200,
                    }}
                />
                <Button wd="100%" onPress={handleSend}>Add post</Button>
            </Container>
        </Style.Block>
    );
};