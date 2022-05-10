export interface IAuthenticationPayload {
  id: number;
  code: string;
  secret?: string
}