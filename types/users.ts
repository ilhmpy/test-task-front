export enum UsersRoles {
    User,
    Editor,
    Admin
};

export type UsersViewModel = {
    id: number;
    nickname: string;
    creationDate: Date;
    confirmed: boolean;
    role: UsersRoles;
    blocked: boolean;
};