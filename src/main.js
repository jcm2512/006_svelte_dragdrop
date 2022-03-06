import App from "./App.svelte";

const app = new App({
  target: document.body,
  props: {
    words: ["magalotti", "haruka", "tokky", "manju", "nuts", "sherlock"],
  },
});

export default app;
