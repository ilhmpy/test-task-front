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
    const { description, title, creatorId, creationDate } = data;
    return (
        <Style.Card onPress={() => pressHandler(creatorId)}>    
            <Text title>{title}</Text>
            <Text text>{description}</Text>
            <Style.Date>{moment(creationDate).format("DD.MM.YYYY HH:MM")}</Style.Date>
        </Style.Card>
    );
}; 