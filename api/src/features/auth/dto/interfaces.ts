export interface AuthToken {
  accessToken: string;
  refreshToken: string;
}
export interface TokenPayload {
  name: string;
  email: string;
  userId: number;
}
