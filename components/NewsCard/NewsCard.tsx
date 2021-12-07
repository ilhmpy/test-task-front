import React from "react";
import { NewsViewModel } from "../../types/news";
import * as Style from "./NewsCard.styles";

type NewsCardProps = {
    data: NewsViewModel;
};

export const NewsCard = ({ data }: NewsCardProps) => {
    const { description, title, creatorId } = data;
    return (
        <Style.Card>    
            <Style.Text title>{title}</Style.Text>
            <Style.Text text>{description}</Style.Text>
        </Style.Card>
    );
}; 