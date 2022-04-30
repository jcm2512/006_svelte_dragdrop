import { writable, readable } from "svelte/store";
import { localData } from "./functions/localstorage.svelte";

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
export let cvcObject = writable({
  cat: {
    word: "cat",
    vowel: "a",
    img: "/assets/png/cat.png",
    exp: 0,
    status: "unlocked",
  },
  hat: {
    word: "hat",
    vowel: "a",
    img: "/assets/png/hat.png",
    exp: 0,
    status: "unlocked",
  },
  dog: {
    word: "dog",
    vowel: "o",
    img: "/assets/png/dog.png",
    exp: 0,
    status: "unlocked",
  },
  fox: {
    word: "fox",
    vowel: "o",
    img: "/assets/png/fox.png",
    exp: 0,
    status: "unlocked",
  },
  sun: {
    word: "sun",
    vowel: "u",
    img: "/assets/png/sun.png",
    exp: 0,
    status: "unlocked",
  },
  bed: {
    word: "bed",
    vowel: "e",
    img: "/assets/png/bed.png",
    exp: 0,
    status: "locked",
  },
  jet: {
    word: "jet",
    vowel: "e",
    img: "/assets/png/jet.png",
    exp: 0,
    status: "locked",
  },
  pin: {
    word: "pin",
    vowel: "i",
    img: "/assets/png/pin.png",
    exp: 0,
    status: "locked",
  },
  dig: {
    word: "dig",
    vowel: "i",
    img: "/assets/png/dig.png",
    exp: 0,
    status: "locked",
  },
  nut: {
    word: "nut",
    vowel: "u",
    img: "/assets/png/nut.png",
    exp: 0,
    status: "locked",
  },
  bag: {
    word: "bag",
    vowel: "e",
    img: "/assets/png/bag.png",
    exp: 0,
    status: "locked",
  },
  cup: {
    word: "cup",
    vowel: "e",
    img: "/assets/png/cup.png",
    exp: 0,
    status: "locked",
  },
});
