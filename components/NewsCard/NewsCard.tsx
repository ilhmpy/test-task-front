import React, { useContext } from "react";
import { NewsViewModel } from "../../types/news";
import * as Style from "./NewsCard.styles";
import { Text } from "../../components/index";
import { getLocalDate } from "../../utils/getLocalDate";
import { AppContext } from "../../context/Context";
import { UsersRoles } from "../../types/users";

type NewsCardProps = {
    data: NewsViewModel;
    pressHandler: (id: number) => void;
    confirmed: boolean;
    newsConfirmed: boolean;
};

export const NewsCard = ({ data, pressHandler, confirmed, newsConfirmed }: NewsCardProps) => {
    const { description, title, creationDate, creatorNickname, _id } = data;
    const { user } = useContext(AppContext);
 
    return (
        <Style.Card confirmed={confirmed} onPress={() => pressHandler(_id)}>    
            <Text title>{title}</Text>
            <Text text>{description}</Text>
            <Style.Date>{getLocalDate(creationDate)} Creater: {creatorNickname}</Style.Date>
            {user?.role >= UsersRoles.Editor && 
                <Style.Confirmed confirm={newsConfirmed}>
                    {newsConfirmed ? "Confirmed" : "Not confirmed"}
                </Style.Confirmed>}
        </Style.Card>
    );
}; 