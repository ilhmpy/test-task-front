import React, { useContext, useState, useEffect } from "react";
import { AppContext } from "../../context/Context";
import { NewsCard, Container, Search, AddPost, Spinner as SpinnerComponent, NoItems } from "../../components";
import { ViewScroll } from "../../GlobalStyles";
import { UsersRoles, NewsViewModel } from "../../types";
import axios from "axios";
import { URL } from "../../consts/port";
import { sortByDate, getConfirmed } from "../../utils";
 
export const NewsScreen = ({ navigation }: any) => {
    const { user, setReloadNews } = useContext(AppContext);
    const [defaultNews, setDefaultNews] = useState<NewsViewModel[] | null>(null);
    const [news, setNews] = useState<NewsViewModel[] | null>(null);
    const [clear, setClear] = useState<boolean>(false);  
    const [isFocused, setIsFocused] = useState(true);
 
    const GetNews = async () => {
        try {
            const req = await axios.get(`${URL}GetNews`);
            const res = await req.data;
            console.log("GetNews", res);
            const sort = sortByDate(res)
            let filter = sort;
            if (user?.role === UsersRoles.Editor) {
                filter = filter.filter((i) => i.creatorId === user.id);
            };  
            console.log(filter, user);
            setNews(filter);
            setDefaultNews(filter);
        } catch(e) {
            console.log(e);
        } finally {
            setIsFocused(false);
        };
    }; 

    useEffect(() => {
        if (isFocused) {
            GetNews();
        };
    }, [isFocused]);

    useEffect(() => {
        const focus = navigation.addListener("focus", (focus: any) => {
            setIsFocused(true);
            // setReload(true);
            console.log("Focus", focus);
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
                    <AddPost setState={setIsFocused} setReload={setReloadNews} />
                )}
                {news?.length === 0 && news != null ? <NoItems /> : (
                    <>
                         {news?.map((item) => (
                            <NewsCard 
                               confirmed={getConfirmed(item.confirmed, user)} 
                               pressHandler={pressHandler} data={item} 
                               key={Math.random() * 100} 
                               newsConfirmed={item.confirmed}
                            />
                        ))}
                    </>
                )}
            </Container>
        </ViewScroll>
    );
}; 