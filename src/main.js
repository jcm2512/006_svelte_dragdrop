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
});

export default gsapApp;
