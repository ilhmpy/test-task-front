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
import { Spinner as SpinnerComponent } from "../../components/Spinner/Spinner";
import { NoItems } from "../../components/NoItems/NoItems";

type NewsScreenProps = {
    navigation: any; 
};    
 
export const NewsScreen: FC<NewsScreenProps> = ({ navigation }: any) => {
    const { user, reloadNews, setReloadNews } = useContext(AppContext);
    const [defaultNews, setDefaultNews] = useState<NewsViewModel[] | null>(null);
    const [news, setNews] = useState<NewsViewModel[] | null>(null);
    const [clear, setClear] = useState<boolean>(false); 
    const [reload, setReload] = useState<boolean>(false);  
    const [isFocused, setIsFocused] = useState(true);
 
    function GetNews() {
        axios.get(`${URL}GetNews`)
        .then((res) => {
            console.log("GetNews", res.data);
            const sort = sortByDate(res.data)
            const filter = sort.filter((i) => i.creatorId == user.id);
            if (user?.role === UsersRoles.Editor) {
                setNews(filter);
            } else {
                setNews(sort);
            }; 
            setDefaultNews(res.data);
        })
        .catch((err) => console.log(err))
        .finally(() => {
            setIsFocused(false);
        });
    };

    useEffect(() => {
        if (isFocused) {
            GetNews();
        };
    }, [isFocused]);

    useEffect(() => {
        const focus = navigation.addListener("focus", (focus: any) => {
            setIsFocused(true);
        }); 
        return focus;
    }, [isFocused]);
    
    useEffect(() => {
        if (clear) {    
            setNews(defaultNews); 
            setClear(false);
        };
    }, [clear]); 

    const pressHandler = (id: number) => { 
        navigation.navigate("NewsDetails", { id });
    }; 

    if (news === null) {
        return <SpinnerComponent />
    };
   
    return (
        <ViewScroll>
            <Container>  
                {(user?.role === UsersRoles.Admin && user?.confirmed) && (
                    <Search 
                        defaultArray={defaultNews} setClear={setClear} 
                        state={news} setState={setNews} 
                    />
                )}
                {(user?.role === UsersRoles.Editor && user?.confirmed) && (
                    <AddPost setReload={setReloadNews} />
                )}
                {news.length === 0 && news != null ? <NoItems /> : (
                    <>
                         {news?.map((item) => (
                            <NewsCard 
                               confirmed={getConfirmed(item.confirmed, user)} 
                               pressHandler={pressHandler} data={item} key={Math.random() * 100} 
                            />
                        ))}
                    </>
                )}
            </Container>
        </ViewScroll>
    );
}; 