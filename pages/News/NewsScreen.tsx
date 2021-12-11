import React, { useContext, FC, useState, useEffect } from "react";
import { AppContext } from "../../context/Context";
import { NewsCard, Container, Search, AddPost } from "../../components";
import { NewsViewModel } from '../../types/news';
import { ViewScroll } from "../../GlobalStyles";
import { UsersRoles } from "../../types/users";
import axios from "axios";
import { URL } from "../../consts/port";
import { sortByDate } from "../../utils/sortByDate";
import { getConfirmed } from "../../utils/getConfirmed";

type NewsScreenProps = {
    navigation: any; 
};   
 
export const NewsScreen: FC<NewsScreenProps> = ({ navigation }: any) => {
    const { user, reloadNews, setReloadNews } = useContext(AppContext);
    const [defaultNews, setDefaultNews] = useState<NewsViewModel[] | null>(null);
    const [news, setNews] = useState<NewsViewModel[] | null>(null);
    const [clear, setClear] = useState<boolean>(false); 
    const [reload, setReload] = useState<boolean>(false);  

    useEffect(() => {
        axios.get(`${URL}GetNews`)
            .then((res) => {
                console.log("GetNews", res.data);
                const sort  =sortByDate(res.data)
                if (user.role === UsersRoles.Editor) {
                    setNews(sort.filter((i) => i.creatorId == user.id));
                } else {
                    setNews(sort);
                };
                setDefaultNews(res.data);
            })
            .catch((err) => console.log(err))
            .finally(() => {
                setReloadNews(false);
            });
    }, [reloadNews]);
    
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
                {(user && user.role === UsersRoles.Admin && user.confirmed) && (
                    <Search 
                        defaultArray={defaultNews} setClear={setClear} 
                        state={news} setState={setNews} 
                    />
                )}
                {(user && user.role === UsersRoles.Editor && user.confirmed) && (
                    <AddPost setReload={setReloadNews} />
                )}
                {news && news.map((i: NewsViewModel ) => (
                    <NewsCard confirmed={getConfirmed(i.confirmed, user)} pressHandler={pressHandler} data={i} key={Math.random() * 100} />
                ))}
            </Container>
        </ViewScroll>
    );
}; 