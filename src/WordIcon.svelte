<script>
  import { cvcObject } from "./store.js";

  export let currentWord;
</script>

<img
  class="auto rounded label"
  src={$cvcObject[currentWord].img}
  alt={$cvcObject[currentWord].word}
/>

<style>
  img {
    padding: 0.3rem;
    align-self: flex-end;
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
    /* padding: 0.5em; */
  }

  .label {
    background-color: #ffffff;
    z-index: 10;
  }
</style>
