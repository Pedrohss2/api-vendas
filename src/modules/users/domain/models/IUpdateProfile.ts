export interface IUpdateProfile {
  userId: string;
  name: string;
  email: string;
  password?: string;
  oldPassword?: string;
}
