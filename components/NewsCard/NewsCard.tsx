import React from "react";
import { NewsViewModel } from "../../types/news";
import * as Style from "./NewsCard.styles";
import { Text } from "../../components/index";
import { getLocalDate } from "../../utils/getLocalDate";

type NewsCardProps = {
    data: NewsViewModel;
    pressHandler: (id: number) => void;
    confirmed: boolean;
};

export const NewsCard = ({ data, pressHandler, confirmed }: NewsCardProps) => {
    const { description, title, creationDate, creatorNickname, _id } = data;
 
    return (
        <Style.Card confirmed={confirmed} onPress={() => pressHandler(_id)}>    
            <Text title>{title}</Text>
            <Text text>{description}</Text>
            <Style.Date>{getLocalDate(creationDate)} Creater: {creatorNickname}</Style.Date>
        </Style.Card>
    );
}; 