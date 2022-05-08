export interface IMessage {
  body: string;
  type: 'success' | 'error' | null;
}