import React, { useContext, useState } from "react";
import * as Style from "./AddPost.styles";
import { Container, Input, Button2 as Button } from "../index";
import axios from "axios";
import { URL } from "../../consts";
import * as SecureStore from 'expo-secure-store';
import { AppContext } from "../../context/Context";

type AddPostProps = {
    setReload?: any;
    setState: (val: boolean) => void;
};

export const AddPost = ({ setReload, setState }: AddPostProps) => {
    const [title, setTitle] = useState<string | null>(null);
    const [description, setDescription] = useState<string | null>(null);
    const { user } = useContext(AppContext);

    const handleSend = async () => {
       if (description && title && description.length > 0 && title.length > 0) {
            const token = await SecureStore.getItemAsync("token") || null;
            const creationDate = new Date();
            const post = { 
                title, description, creatorId: user.id, creatorNickname: user.nickname,
                creationDate,
            }; 
            const req = await axios.post(`${URL}InsertNews`, { token, post });
            const res = await req.data;
            setTitle(null);
            setDescription(null);
            console.log(res);
            setReload(true);
            setState(true);
       };
    };

    return (
        <Style.Block>
            <Container center>
                <Input 
                    placeholder="Title"
                    state={title}
                    setState={setTitle}
                    withSpaces
                />
                <Input 
                    editable
                    placeholder="Text"
                    state={description}
                    setState={setDescription}
                    withSpaces
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