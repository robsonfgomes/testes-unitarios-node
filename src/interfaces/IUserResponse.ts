import { IUser } from './IUser';

export interface IUserResponse extends IUser {
  isOfAge: boolean;
}
