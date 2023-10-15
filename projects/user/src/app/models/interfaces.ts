export interface login {
  email: string;
  password: string;
  role: string;
}
export interface signup {
  username: string;
  email: string;
  password: string;
  role: string;
}
export interface createTask {
  title: string;
  userId: string;
  image: object;
  description: string;
  deadline: string;
}
