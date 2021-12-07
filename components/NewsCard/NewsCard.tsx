import React from "react";
import { NewsViewModel } from "../../types/news";
import * as Style from "./NewsCard.styles";
import { Text } from "../../components/index";

type NewsCardProps = {
    data: NewsViewModel;
    pressHandler: (id: number) => void;
};

export const NewsCard = ({ data, pressHandler }: NewsCardProps) => {
    const { description, title, creatorId } = data;
    return (
        <Style.Card onPress={() => pressHandler(creatorId)}>    
            <Text title>{title}</Text>
            <Text text>{description}</Text>
        </Style.Card>
    );
}; 