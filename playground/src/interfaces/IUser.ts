export interface IUser {
  id: number;
  email: string;
  password: string;
  role: string;
  recoveryToken: string;
  createdAt: Date;
}
