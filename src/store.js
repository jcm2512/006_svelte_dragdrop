import { writable, readable } from "svelte/store";

export const gameLoaded = writable(false);
export const gameLoaderWordId = writable(0);
export const gameWordLimit = writable(10);
export const exp = writable(0);
export const expObj = writable({ value: 5 }); // use objects so GSAP an animate the values
export const currentWordProgress = writable(0);
export const gamePoints = writable(0);
export const expMultiplier = writable(10);
export const maxExp = readable(40);
export const bonustime = writable(false);
export const ticks = readable(60);
export const trigger = writable(0);

export let cvcObject = writable({
  cat: {
    word: "cat",
    vowel: "a",
    img: "/assets/cvc-tiles/cat-svgrepo-com.svg",
    exp: 0,
    unlocked: true,
  },
  hat: {
    word: "hat",
    vowel: "a",
    img: "/assets/cvc-tiles/hat-svgrepo-com.svg",
    exp: 0,
    unlocked: true,
  },
  bed: {
    word: "bed",
    vowel: "e",
    img: "/assets/cvc-tiles/bed-svgrepo-com.svg",
    exp: 0,
    unlocked: true,
  },
  jet: {
    word: "jet",
    vowel: "e",
    img: "/assets/cvc-tiles/jet-svgrepo-com.svg",
    exp: 0,
    unlocked: true,
  },
  pin: {
    word: "pin",
    vowel: "i",
    img: "/assets/cvc-tiles/pin-svgrepo-com.svg",
    exp: 0,
    unlocked: true,
  },
  dig: {
    word: "dig",
    vowel: "i",
    img: "/assets/cvc-tiles/dig-svgrepo-com.svg",
    exp: 0,
    unlocked: true,
  },
  dog: {
    word: "dog",
    vowel: "o",
    img: "/assets/cvc-tiles/dog-svgrepo-com.svg",
    exp: 0,
    unlocked: false,
  },
  hot: {
    word: "hot",
    vowel: "o",
    img: "/assets/cvc-tiles/hot-svgrepo-com.svg",
    exp: 0,
    unlocked: false,
  },
  sun: {
    word: "sun",
    vowel: "u",
    img: "/assets/cvc-tiles/sun-svgrepo-com.svg",
    exp: 0,
    unlocked: false,
  },
  nut: {
    word: "nut",
    vowel: "u",
    img: "/assets/cvc-tiles/nut-svgrepo-com.svg",
    exp: 0,
    unlocked: false,
  },
});

export let cvcList = writable([
  {
    word: "cat",
    vowel: "a",
    img: "/assets/cvc-tiles/cat-svgrepo-com.svg",
    exp: 0,
    unlocked: true,
  },
  {
    word: "hat",
    vowel: "a",
    img: "/assets/cvc-tiles/hat-svgrepo-com.svg",
    exp: 0,
    unlocked: true,
  },
  {
    word: "bed",
    vowel: "e",
    img: "/assets/cvc-tiles/bed-svgrepo-com.svg",
    exp: 0,
    unlocked: true,
  },
  {
    word: "jet",
    vowel: "e",
    img: "/assets/cvc-tiles/jet-svgrepo-com.svg",
    exp: 0,
    unlocked: true,
  },
  {
    word: "pin",
    vowel: "i",
    img: "/assets/cvc-tiles/pin-svgrepo-com.svg",
    exp: 0,
    unlocked: true,
  },
  {
    word: "dig",
    vowel: "i",
    img: "/assets/cvc-tiles/dig-svgrepo-com.svg",
    exp: 0,
    unlocked: true,
  },
  {
    word: "dog",
    vowel: "o",
    img: "/assets/cvc-tiles/dog-svgrepo-com.svg",
    exp: 0,
    unlocked: false,
  },
  {
    word: "hot",
    vowel: "o",
    img: "/assets/cvc-tiles/hot-svgrepo-com.svg",
    exp: 0,
    unlocked: false,
  },
  {
    word: "sun",
    vowel: "u",
    img: "/assets/cvc-tiles/sun-svgrepo-com.svg",
    exp: 0,
    unlocked: false,
  },
  {
    word: "nut",
    vowel: "u",
    img: "/assets/cvc-tiles/nut-svgrepo-com.svg",
    exp: 0,
    unlocked: false,
  },
]);

// TODO: #11 store auto subscription using $
