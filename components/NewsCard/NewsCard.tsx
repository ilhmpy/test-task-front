import React from "react";
import { NewsViewModel } from "../../types/news";
import * as Style from "./NewsCard.styles";
import { Text } from "../../components/index";
import moment from "moment";

type NewsCardProps = {
    data: NewsViewModel;
    pressHandler: (id: number) => void;
};

export const NewsCard = ({ data, pressHandler }: NewsCardProps) => {
    const { description, title, creationDate, creatorName, _id } = data;
    return (
        <Style.Card onPress={() => pressHandler(_id)}>    
            <Text title>{title}</Text>
            <Text text>{description}</Text>
            <Style.Date>{moment(creationDate).format("DD.MM.YYYY HH:MM")} Creater: {creatorName}</Style.Date>
        </Style.Card>
    );
}; 