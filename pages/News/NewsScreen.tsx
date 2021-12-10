import React, { useContext, FC, useState, useEffect } from "react";
import { AppContext } from "../../context/Context";
import { NewsCard, Container, Search, AddPost } from "../../components";
import { NewsViewModel } from '../../types/news';
import { ViewScroll } from "../../GlobalStyles";
import { UsersRoles } from "../../types/users";
import axios from "axios";
import { URL } from "../../consts/port";

type NewsScreenProps = {
    navigation: any; 
};

export const NewsScreen: FC<NewsScreenProps> = ({ navigation }: any) => {
    const { user } = useContext(AppContext);
    const testDate = new Date(2021, 11, 9);
    const [defaultNews, setDefaultNews] = useState<NewsViewModel[] | null>(null);
    const [news, setNews] = useState<NewsViewModel[] | null>(null);
    const [clear, setClear] = useState<boolean>(false);
    const [reload, setReload] = useState<boolean>(false);

    useEffect(() => {
        axios.get(`${URL}GetPosts`)
            .then((res) => {
                console.log("GetPosts", res.data);
                setNews(res.data);  
                setDefaultNews(res.data);
            })
            .catch((err) => console.log(err))
            .finally(() => setReload(false));
    }, [reload]);
    
    useEffect(() => {
        if (clear) {  
            setNews(defaultNews);
            setClear(false);
        };
    }, [clear]); 

    const pressHandler = (id: number) => {
        navigation.navigate("NewsDetails", { id });
    }; 

    return (
        <ViewScroll>
            <Container>
                {user && user.role === UsersRoles.Admin && (
                    <Search defaultArray={defaultNews} setClear={setClear} state={news} setState={setNews} />
                )}
                {user && user.role >= UsersRoles.Editor && (
                    <AddPost setReload={setReload} />
                )}
                {news && news.map((i: NewsViewModel ) => (
                    <NewsCard pressHandler={pressHandler} data={i} key={Math.random() * 100} />
                ))}
            </Container>
        </ViewScroll>
    );
}; 