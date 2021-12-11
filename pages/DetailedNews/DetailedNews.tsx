import React, { useState, useContext, useEffect } from "react";
import * as Style from "./DetailedNews.styles";
import { ViewScroll } from "../../GlobalStyles";
import { Text, Input, Button2 as Button, StateButton } from "../../components";
import { NewsViewModel, NewsCommentModel } from "../../types/news";
import { Regex } from '../../consts/regex';
import { AppContext } from "../../context/Context";
import { UsersRoles } from "../../types/users";
import axios from "axios";
import { URL } from "../../consts/port";
import * as SecureStore from 'expo-secure-store';
import { getLocalDate } from "../../utils/getLocalDate";
import { getConfirmed } from "../../utils/getConfirmed";

export const DetailedNews = ({ route }: any) => {
    const { id } = route.params;
    const { user } = useContext(AppContext);
    const [data, setData] = useState<NewsViewModel | null>(null);
    const [comments, setComments] = useState<NewsCommentModel[] | null>(null);
    const [nickname, setNickname] = useState<string | null>(null);
    const [email, setEmail] = useState<string | null>(null);
    const [text, setText] = useState<string | null>(null);

    const handleSend = () => {
        if ((text && text.length > 0) && (email && email.length > 0) && (nickname && nickname.length > 0)) {
            const creationDate = new Date();
            const data = { 
                text, email, nickname, newsId: id, 
                creatorId: user ? user.id : null, creationDate
            };
            axios.post(`${URL}InsertComment`, data).then((res) => {
                console.log(res);
                setComments([...comments, data]);
                setNickname(null);
                setEmail(null);
                setText(null);
            }).catch((e) => console.log(e));
        };
    };  

    useEffect(() => {
        axios.get(`${URL}GetNews?id=${id}`)
            .then((res) => {
                console.log("GetNewsById", res);
                const data: NewsViewModel = res.data[0];
                setData(data);
                setComments(data.comments);
            }).catch((err) => console.log(err));
    }, []); 

    async function changeNewsState(confirmed: boolean) {
        if (user.confirmed && user.role === UsersRoles.Admin) {
            const token = await SecureStore.getItemAsync("token");
            axios.post(`${URL}ChangeNewsState`, { id, token, confirmed })
                .then((res) => {
                    console.log(res);
                    setData({ ...data, confirmed });
                }).catch((err) => {
                    console.log(err);
                });
        };
    };

    return (
        <ViewScroll>
            <Style.Block first>
                {data && (
                  <>
                    <Text title>{data.title}</Text>
                    <Text text overflowNone>{data.description}</Text>
                    <Style.Date>{getLocalDate(data.creationDate)}. Creator: {data.creatorNickname}</Style.Date>
                    {user && user.role === UsersRoles.Admin && user.confirmed && (
                        <StateButton 
                            bool={!data.confirmed}
                            onPress={() => changeNewsState(!data.confirmed)}
                        >
                                {data.confirmed ? "Un confirm" : "Confirm"}
                       </StateButton>
                    )}
                  </>
                )}
            </Style.Block>
            <Style.Block>
                <Text title>Comments</Text>
                {comments && comments.map((i) => (
                    <Style.Comment view={getConfirmed(i.confirmed, user)} key={Math.random() * 1000}>
                        <Text fs={20} title>{i.nickname}</Text>
                        <Text text fs={16}>{i.text}</Text>
                        <Style.Date>{getLocalDate(i.creationDate)}.</Style.Date>
                        {user && user.role >= UsersRoles.Editor && user.confirmed && (                        
                            <StateButton bool={!i.confirmed}>{i.confirmed ? "Un show" : "Show"}</StateButton>
                        )}
                    </Style.Comment>
                ))}
                {(!user || user.role === UsersRoles.User || !user.confirmed) && (
                    <Style.AddComment>
                        <Input 
                            placeholder="Enter your nickname"
                            state={nickname}  
                            setState={setNickname}
                        />
                        <Input 
                            placeholder="Enter your email" 
                            state={email} 
                            setState={setEmail}
                            pattern={Regex.email}
                        />
                        <Input 
                            placeholder="Enter your comment" 
                            state={text}
                            setState={setText}
                        />
                        <Button 
                            wd={"100%"}
                            onPress={handleSend} 
                        >
                            SEND
                        </Button>
                    </Style.AddComment>
                )}
            </Style.Block>
        </ViewScroll>
    );
};