import React, { useState } from "react";
import * as Style from "./DetailedNews.styles";
import { ViewScroll } from "../../GlobalStyles";
import { Text, Input, Button2 as Button } from "../../components";
import { NewsViewModel, NewsCommentModel } from "../../types/news";
import { Regex } from '../../consts/regex';

export const DetailedNews = ({ route }: any) => {
    const { id } = route.params;
    const [data, setData] = useState<NewsViewModel | undefined>({ 
        creatorId: 0, 
        confirmed: true,
        creationDate: new Date(),
        title: "Lorem ipsum dolor sit amet, consectetuer adipiscing", 
        description: "agnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim." 
    });
    const [comments, setComments] = useState<NewsCommentModel[] | undefined>([
        { nickname: "vladislav", text: "Nice post!", confirmed: true, creatorId: 0, creationDate: new Date()},
        { nickname: "vladislav", text: "Nice post!", confirmed: true, creatorId: 0, creationDate: new Date() },
        { nickname: "vladislav", text: "Nice post!", confirmed: true, creatorId: 0, creationDate: new Date() },
        { nickname: "vladislav", text: "Nice post!", confirmed: true, creatorId: 0, creationDate: new Date() },
        { nickname: "vladislav", text: "Nice post!", confirmed: true, creatorId: 0, creationDate: new Date() },
        { nickname: "vladislav", text: "Nice post!", confirmed: true, creatorId: 0, creationDate: new Date() },
        { nickname: "vladislav", text: "Nice post!", confirmed: true, creatorId: 0, creationDate: new Date() },
        { nickname: "vladislav", text: "Nice post!", confirmed: true, creatorId: 0, creationDate: new Date() },
    ]);
    const [nickname, setNickname] = useState<string | undefined>();
    const [email, setEmail] = useState<string | undefined>();
    const [comment, setComment] = useState<string | undefined>();

    const handleSend = () => {
        return undefined;
    };

    return (
        <ViewScroll>
            <Style.Block first>
                <Text title>{data && data.title}</Text>
                <Text text overflowNone>{data && data.description}</Text>
            </Style.Block>
            <Style.Block>
                <Text title>Comments</Text>
                {comments && comments.map((i) => (
                    <Style.Comment key={Math.random() * 1000}>
                        <Text fs={20} title>{i.nickname}</Text>
                        <Text text fs={16}>{i.text}</Text>
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