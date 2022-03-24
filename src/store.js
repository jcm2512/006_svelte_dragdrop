import { writable } from "svelte/store";

export const gameLoaded = writable(false);
export const gameLoaderWordId = writable(0);
export const gameWordLimit = writable(5);

// TODO: #11 store auto subscription using $
