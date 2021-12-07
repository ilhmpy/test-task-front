import React, { useState } from "react";
import * as Style from "./DetailedNews.styles";
import { ViewScroll } from "../../GlobalStyles";
import { Text } from "../../components";
import { NewsViewModel, NewsCommentModel } from "../../types/news";

export const DetailedNews = ({ route }: any) => {
    const { id } = route.params;
    const [data, setData] = useState<NewsViewModel | undefined>({ 
        creatorId: 0, 
        title: "Lorem ipsum dolor sit amet, consectetuer adipiscing", 
        description: "agnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim." 
    });
    const [comments, setComments] = useState<NewsCommentModel[] | undefined>([
        { nickname: "vladislav", text: "Nice post!", confirmed: true, creatorId: 0 },
        { nickname: "vladislav", text: "Nice post!", confirmed: true, creatorId: 0 },
        { nickname: "vladislav", text: "Nice post!", confirmed: true, creatorId: 0 },
        { nickname: "vladislav", text: "Nice post!", confirmed: true, creatorId: 0 },
        { nickname: "vladislav", text: "Nice post!", confirmed: true, creatorId: 0 },
        { nickname: "vladislav", text: "Nice post!", confirmed: true, creatorId: 0 },
        { nickname: "vladislav", text: "Nice post!", confirmed: true, creatorId: 0 },
        { nickname: "vladislav", text: "Nice post!", confirmed: true, creatorId: 0 },
    ]);
    const [nickname, setNickname] = useState<string | undefined>();
    const [email, setEmail] = useState<string | undefined>();
    const [comment, setComment] = useState<string | undefined>();

    const handleSend = () => {
        return undefined;
    };

    const changeText = (val: string, setState: (val: string) => void) => {
        setState(val);
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
                    <Style.Input 
                        value={nickname}
                        placeholder="Enter your nickname" 
                        onChangeText={(e: string) => changeText(e, setNickname)} 
                    />
                    <Style.Input 
                        value={email} 
                        placeholder="Enter your email" 
                        onChangeText={(e: string) => changeText(e, setNickname)} 
                    />
                    <Style.Input 
                        value={comment} 
                        placeholder="Enter your comment" 
                        onChangeText={(e: string) => changeText(e, setNickname)} 
                    />
                    <Style.Button 
                        title="Send" color="#000" 
                        onPress={handleSend} 
                    />
                </Style.AddComment>
            </Style.Block>
        </ViewScroll>
    );
};