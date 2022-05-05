import { writable, readable } from "svelte/store";

// DEV mode
export const devMode = readable({ paused: false, wordLimitOverride: 1 });
export const wordLimitOverride = readable(1);

// NON PERSISTENT
export const ticks = readable(60);

export const gameLoaded = writable(false);
export const gameLoaderWordId = writable(0);
export const gameWordLimit = writable(30);
export const exp = writable(0);
export const expObj = writable({
  min: 5,
  value: 5,
  increment: 10,
  max: 35,
  correct: true,
}); // use objects so GSAP an animate the values
export const combo = writable(0);
export const comboTimer = writable(0);
export const currentWordProgress = writable(0);
export const expMultiplier = writable(10);
export const eventTrigger = writable({
  save: 0,
  incorrectLetter: 0,
  correctLetter: 0,
});
export const timerEnd = writable(false);

export const wordExp = writable({ increment: 1, max: 48 });
export const gameState = writable(0);

// UPDATED FROM LOCALSTORAGE
export const gamePoints = writable({ points: 0 });
export const gameStars = writable({ stars: 0 });

// CVC WORD LIST
export let cvcObject = writable({});
