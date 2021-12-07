export type NewsViewModel = {
    creatorId: number;
    title: string;
    description: string;
};

export type NewsCommentModel = {
    text: string;
    confirmed: boolean;
    creatorId: number;
};