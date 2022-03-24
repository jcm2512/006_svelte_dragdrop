import { writable } from "svelte/store";

export const gameLoaded = writable(false);
export const gameLoaderWordId = writable(0);
