<script>
  import { cvcObject } from "./store.js";
  export let currentWord;
</script>

{#key $cvcObject[currentWord].exp}
  <div class="combo">
    <span class="count">X 10</span>
    <span class="title">COMBO</span>
  </div>
{/key}

<style>
  .combo {
    align-self: end;
    display: flex;
    flex-direction: column;
    font-size: 2rem;
    color: white;
    -webkit-text-stroke: 0.1rem var(--dark-blue);
  }
  .count {
    font-size: 3rem;
  }
</style>
