import App from "./App.svelte";
// import Drag from "./Drag.svelte";

const app = new App({
  target: document.body,
  props: {
    words: ["cat", "dog", "pig", "hat"],
    // words: ["tokky", "manju", "nuts"],
  },
});

// const drag = new Drag({
//   target: document.body,
//   props: {},
// });

// export default app;
