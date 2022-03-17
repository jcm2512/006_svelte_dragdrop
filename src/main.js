// import App from "./App.svelte";
// import DragPath from "./DragPath.svelte";

import Gsap from "./Gsap.svelte";

// const app = new App({
//   target: document.body,
//   props: {
//     words: ["tokky", "manju", "nuts"],
//   },
// });

const gsapApp = new Gsap({
  target: document.body,
  props: {
    paths: ["M0,10L400,10", "M0,110L400,110", "M0,210L400,210"],
  },
});

export default gsapApp;
