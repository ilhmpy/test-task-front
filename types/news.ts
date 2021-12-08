export type NewsViewModel = {
    creatorId: number;
    title: string;
    description: string;
    creationDate: Date;
    confirmed: boolean;
};

export type NewsCommentModel = {
    nickname: string;
    text: string;
    confirmed: boolean;
    creatorId: number;
    creationDate: Date;
};