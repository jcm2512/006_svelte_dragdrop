// import App from "./App.svelte";
import DragPath from "./DragPath.svelte";

// const app = new App({
//   target: document.body,
//   props: {
//     words: ["tokky", "manju", "nuts"],
//   },
// });

const dragPath = new DragPath({
  target: document.body,
});

export default dragPath;
