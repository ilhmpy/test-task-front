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
import { Spinner as SpinnerComponent } from "../../components/Spinner/Spinner";

export const DetailedNews = ({ route, navigation }: any) => {
    const { id } = route.params;
    const { user, setReloadNews } = useContext(AppContext);
    const [data, setData] = useState<NewsViewModel | null>(null);
    const [comments, setComments] = useState<NewsCommentModel[] | null>(null);
    const [nickname, setNickname] = useState<string | null>(null);
    const [email, setEmail] = useState<string | null>(null);
    const [text, setText] = useState<string | null>(null);
    const [view, setView] = useState<boolean>(false);

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
                setView(true);
                setReloadNews(true);
            }).catch((e) => console.log(e));
        };
    };  

    useEffect(() => {
        axios.get(`${URL}GetNews?id=${id}`)
            .then((res) => {
                console.log("GetNewsById", res);
                if (res.data.length > 0) {      
                    const data: NewsViewModel = res.data[0];          
                    setData(data);
                    setComments(data.comments);
                } else {
                    navigation.navigate("News");
                };
            }).catch((err) => {
                console.log(err);
                navigation.navigate("News");
            });
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

    async function handleDelete() {
        if (user.confirmed && user.role >= UsersRoles.Editor) {
            const token = await SecureStore.getItemAsync("token");
            axios.post(`${URL}DeleteNews`, { token, id })
                .then((res) => {
                    console.log(res);
                    navigation.navigate("News");
                }).catch((err) => {
                    console.log(err);
                });
        };                                                                                                                                     
    };

    async function handleCommentState(idx: number) {
        if ((user && user.confirmed) && (user.role >= UsersRoles.Editor)) {
            console.log("yes");
            const token = await SecureStore.getItemAsync("token");
            axios.post(`${URL}ChangeCommentState`, { token, id, idx, confirmed: !(comments[idx].confirmed) })
                .then((res) => {
                    console.log(res);
                    if (res.data) {
                        console.log(res.data.comments[idx]);
                        comments[idx] = res.data.comments[idx];
                        setComments([...comments]);
                    }; 
                }).catch((err) => {
                    console.log(err);
                });
        };  
    };

    
    if (data === null) {
        return <SpinnerComponent />
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
                    {(user && user.role >= UsersRoles.Editor && user.confirmed) && (
                        <StateButton bool={false} onPress={handleDelete}>
                            Delete
                        </StateButton>
                    )}
                  </>
                )}
            </Style.Block>
            <Style.Block>
                <Text title>Comments</Text>
                {comments && comments.map((i, idx) => (
                    <Style.Comment 
                        view={getConfirmed(i.confirmed, user)} key={Math.random() * 1000}
                    >
                        <Text fs={20} title>{i.nickname}</Text>
                        <Text text fs={16}>{i.text}</Text>
                        <Style.Date>{getLocalDate(i.creationDate)}.</Style.Date>
                        {user && user.role >= UsersRoles.Editor && user.confirmed && (                        
                            <StateButton 
                                onPress={() => handleCommentState(idx)}
                                bool={!i.confirmed}
                            >
                                {i.confirmed ? "Un show" : "Show"}
                            </StateButton>
                        )}
                    </Style.Comment>
                ))}
                {(!user || user.role === UsersRoles.User || !user.confirmed) && (
                    <Style.AddComment>
                        <Style.View view={view}>Your comment under consideration by the admin</Style.View>
                        <Input 
                            placeholder="Enter your nickname"
                            state={nickname}  
                            setState={setNickname}
                            withSpaces
                        />
                        <Input 
                            placeholder="Enter your email" 
                            state={email} 
                            setState={setEmail}
                            pattern={Regex.email}
                            withSpaces
                        />
                        <Input 
                            placeholder="Enter your comment" 
                            state={text}
                            setState={setText}
                            withSpaces
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