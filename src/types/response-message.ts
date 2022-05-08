export interface IResponseMessage {
  message: string;
  type: 'success' | 'error' | null;
}