import { writable, readable } from "svelte/store";

// NON PERSISTENT
export const ticks = readable(60);

export const gameLoaded = writable(false);
export const gameLoaderWordId = writable(0);
export const gameWordLimit = writable(30);
export const exp = writable(0);
export const expObj = writable({ value: 5 }); // use objects so GSAP an animate the values
export const combo = writable(0);
export const comboTimer = writable(0);
export const currentWordProgress = writable(0);
export const expMultiplier = writable(10);
export const maxExp = readable(35);
export const bonustime = writable(false);
export const trigger = writable(0);
export const eventTrigger = writable({ save: 0 });
export const timerEnd = writable(false);

export const wordExp = writable(1);
export const wordExpBonus = writable(3);
export const gameState = writable(0);

// UPDATED FROM LOCALSTORAGE
export const gamePoints = writable({ points: 0 });

// CVC WORD LIST
export let cvcObject = writable({});
