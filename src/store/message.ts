import { writable } from "svelte/store";
import type { IMessage } from "../types";

export const message = writable<IMessage>({body: '', type: null});

export const setMessage = ({body, type}: IMessage) => {
  message.set({body, type});
  setTimeout(() => {
    message.set({body: '', type: null})
  }, 3000)
}