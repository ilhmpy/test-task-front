import React, { useState, useContext, useEffect } from "react";
import * as Style from "./DetailedNews.styles";
import { ViewScroll } from "../../GlobalStyles";
import { Text, Input, Button2 as Button, StateButton } from "../../components";
import { NewsViewModel, NewsCommentModel } from "../../types/news";
import { Regex } from '../../consts/regex';
import moment from "moment";
import { AppContext } from "../../context/Context";
import { UsersRoles } from "../../types/users";
import axios from "axios";
import { URL } from "../../consts/port";

export const DetailedNews = ({ route }: any) => {
    const { id } = route.params;
    const { user } = useContext(AppContext);
    const [data, setData] = useState<NewsViewModel | null>(null);
    const [comments, setComments] = useState<NewsCommentModel[] | null>(null);
    const [nickname, setNickname] = useState<string | undefined>();
    const [email, setEmail] = useState<string | undefined>();
    const [comment, setComment] = useState<string | undefined>();

    const handleSend = () => {
        return undefined;
    };  

    useEffect(() => {
        axios.get(`${URL}GetPosts?id=${id}`)
            .then((res) => {
                setData(res.data[0]);
                setComments(res.data[0].comments);
            })
            .catch((err) => console.log(err));
    }, []); 

    return (
        <ViewScroll>
            <Style.Block first>
                {data && (
                  <>
                    <Text title>{data.title}</Text>
                    <Text text overflowNone>{data.description}</Text>
                    <Style.Date>{moment(data.creationDate).format("DD.MM.YYYY HH:MM")}.</Style.Date>
                    {user && user.role >= UsersRoles.Editor && (
                        <StateButton bool={!data.confirmed}>{data.confirmed ? "Un confirmed" : "Confirmed"}</StateButton>
                    )}
                  </>
                )}
            </Style.Block>
            <Style.Block>
                <Text title>Comments</Text>
                {comments && comments.map((i) => (
                    <Style.Comment key={Math.random() * 1000}>
                        <Text fs={20} title>{i.nickname}</Text>
                        <Text text fs={16}>{i.text}</Text>
                        <Style.Date>{moment(i.creationDate).format("DD.MM.YYYY HH:MM")}.</Style.Date>
                        {user && user.role >= UsersRoles.Editor && (                        
                            <StateButton bool={!i.confirmed}>{i.confirmed ? "Un show" : "Show"}</StateButton>
                        )}
                    </Style.Comment>
                ))}
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
                        state={comment}
                        setState={setComment}
                    />
                    <Button 
                        wd={"100%"}
                        onPress={handleSend} 
                    >
                        SEND
                    </Button>
                </Style.AddComment>
            </Style.Block>
        </ViewScroll>
    );
};