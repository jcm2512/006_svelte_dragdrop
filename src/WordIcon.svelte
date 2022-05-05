<script>
  import { cvcObject } from "./store.js";
  import { scale } from "svelte/transition";

  export let currentWord;
  export let GameLevel;
</script>

<span class="container rounded label">
  {#key currentWord}
    <img
      class="auto"
      src={$cvcObject[GameLevel][currentWord].img}
      alt={$cvcObject[GameLevel][currentWord].word}
      in:scale={{
        duration: 200,
        start: 0.7,
        opacity: 0.5,
      }}
    />
  {/key}
</span>

<style>
  .container {
    width: 20vw;
    height: 20vw;
    padding: 0.3rem;
  }

  .auto {
    width: 100%;
    height: 100%;
    margin: auto;
    text-align: center;
    align-items: center;
    justify-items: center;
  }

  .rounded {
    border-radius: 1rem;
    border: 0.25rem solid var(--light-gray);
  }

  .label {
    background-color: #ffffff;
    z-index: 10;
  }
</style>
