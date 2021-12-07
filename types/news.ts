export type NewsViewModel = {
    creatorId: number;
    title: string;
    description: string;
};

export type NewsCommentModel = {
    nickname: string;
    text: string;
    confirmed: boolean;
    creatorId: number;
};