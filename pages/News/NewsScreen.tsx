import React, { useContext, FC, useState } from "react";
import { AppContext } from "../../context/Context";
import { NewsCard } from "../../components/index";
import { NewsViewModel } from '../../types/news';
import { ViewScroll } from "../../GlobalStyles";

type NewsScreenProps = {
    navigation: any; 
};

export const NewsScreen: FC<NewsScreenProps> = ({ navigation }: any) => {
    const { user } = useContext(AppContext);
    const test = [
        { creatorId: 0, 
            title: "Lorem ipsum dolor sit amet, consectetuer adipiscing", 
            description: "agnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim." 
        },
        { creatorId: 1, 
            title: "Lorem ipsum dolor sit amet, consectetuer adipiscing", 
            description: "agnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim." 
        },
        { creatorId: 2, 
            title: "Lorem ipsum dolor sit amet, consectetuer adipiscing", 
            description: "agnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim." 
        },
        { creatorId: 3, 
            title: "Lorem ipsum dolor sit amet, consectetuer adipiscing", 
            description: "agnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim." 
        },
        { creatorId: 4, 
            title: "Lorem ipsum dolor sit amet, consectetuer adipiscing", 
            description: "agnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim." 
        },
        { creatorId: 5, 
            title: "Lorem ipsum dolor sit amet, consectetuer adipiscing", 
            description: "agnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim." 
        },
        { creatorId: 6, 
            title: "Lorem ipsum dolor sit amet, consectetuer adipiscing", 
            description: "tagnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim.est" },
        { creatorId: 7, 
            title: "Lorem ipsum dolor sit amet, consectetuer adipiscing",
            description: "agnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim." 
        },
    ];
    const [news, setNews] = useState<NewsViewModel[]>(test);

    return (
        <ViewScroll>
            {news.map((i: NewsViewModel ) => (
                <NewsCard data={i} key={Math.random() * 100} />
            ))}
        </ViewScroll>
    );
}; 