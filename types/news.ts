export type NewsViewModel = {
    _id?: string;
    creatorId: number;
    creatorName: string;
    title: string;
    description: string;
    creationDate: Date;
    confirmed: boolean;
    comments: NewsCommentModel[];
};

export type NewsCommentModel = {
    nickname: string;
    text: string;
    confirmed: boolean;
    creatorId: number;
    creationDate: Date;
};