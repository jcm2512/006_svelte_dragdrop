// import App from "./App.svelte";
// import Drag from "./Drag.svelte";
import Home from "./Home.svelte";

// const app = new App({
//   target: document.body,
//   props: {
//     words: ["cat", "dog", "pig", "hat"],
//     // words: ["tokky", "manju", "nuts"],
//   },
// });

const home = new Home({
  target: document.body,
  props: {
    tiles: [
      { word: "cat", vowel: "a" },
      { word: "bed", vowel: "e" },
      { word: "pin", vowel: "i" },
      { word: "dog", vowel: "o" },
      { word: "sun", vowel: "u" },
    ],
  },
});

// const drag = new Drag({
//   target: document.body,
//   props: {},
// });

// export default app;
