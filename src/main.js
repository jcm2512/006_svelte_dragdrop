import App from "./App.svelte";

const app = new App({
  target: document.body,
  props: {
    title: "Simple ABC",
    word: "cat",
  },
});

export default app;
