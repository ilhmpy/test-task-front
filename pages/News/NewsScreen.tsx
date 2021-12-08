import React, { useContext, FC, useState, useEffect } from "react";
import { AppContext } from "../../context/Context";
import { NewsCard, Container, Search } from "../../components";
import { NewsViewModel } from '../../types/news';
import { ViewScroll } from "../../GlobalStyles";

type NewsScreenProps = {
    navigation: any; 
};

export const NewsScreen: FC<NewsScreenProps> = ({ navigation }: any) => {
    const { user } = useContext(AppContext);
    const test = [
        { creatorId: 0,
            creationDate: new Date(), 
            confirmed: false,
            title: "0Lorem ipsum dolor sit amet, consectetuer adipiscing", 
            description: "agnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim." 
        },
        { creatorId: 1, 
            creationDate: new Date(),
            confirmed: true,
            title: "1Lorem ipsum dolor sit amet, consectetuer adipiscing", 
            description: "agnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim." 
        },
        { creatorId: 2, 
            creationDate: new Date(),
            confirmed: false,
            title: "2Lorem ipsum dolor sit amet, consectetuer adipiscing", 
            description: "agnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim." 
        },
        { creatorId: 3, 
            creationDate: new Date(),
            confirmed: true,
            title: "3Lorem ipsum dolor sit amet, consectetuer adipiscing", 
            description: "agnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim." 
        },
        { creatorId: 4, 
            creationDate: new Date(),
            confirmed: true,
            title: "4Lorem ipsum dolor sit amet, consectetuer adipiscing", 
            description: "agnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim." 
        },
        { creatorId: 5, 
            creationDate: new Date(),
            confirmed: true,
            title: "5Lorem ipsum dolor sit amet, consectetuer adipiscing", 
            description: "agnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim." 
        },
        { creatorId: 6, 
            creationDate: new Date(),
            confirmed: true,
            title: "6Lorem ipsum dolor sit amet, consectetuer adipiscing", 
            description: "tagnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim.est" },
        { creatorId: 7, 
            creationDate: new Date(),
            confirmed: false,
            title: "7Lorem ipsum dolor sit amet, consectetuer adipiscing",
            description: "agnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim." 
        },
    ];
    const [defaultNews, setDefaultNews] = useState<NewsViewModel[] | undefined>(test);
    const [news, setNews] = useState<NewsViewModel[] | undefined>(test);
    const [clear, setClear] = useState<boolean>(false);
 
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
                <Search setClear={setClear} state={news} setState={setNews} />
                {news && news.map((i: NewsViewModel ) => (
                    <NewsCard pressHandler={pressHandler} data={i} key={Math.random() * 100} />
                ))}
            </Container>
        </ViewScroll>
    );
}; 