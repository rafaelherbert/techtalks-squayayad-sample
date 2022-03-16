export interface IUser {
    id: number;
    title:string;
    name?: string;
    email: string;
    manager?: IUser;
}

