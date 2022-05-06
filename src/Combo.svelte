<script>
  import { combo, comboTimer, triggerLetter } from "./store.js";
  import { fly, scale } from "svelte/transition";
  import { quintOut } from "svelte/easing";
</script>

<div class="combo">
  {#key $combo}
    {#if $comboTimer < 5 && $combo > 0}
      <span
        class="count"
        in:fly={{
          duration: 500,
          opacity: 0.5,
          y: -20,
          easing: quintOut,
        }}>{$combo}</span
      >
    {/if}
  {/key}
  {#if $comboTimer < 5 && $combo > 0}
    <span
      class="title"
      in:scale={{
        duration: 500,
        opacity: 0.5,
        start: 0.5,
        easing: quintOut,
      }}>COMBO</span
    >{/if}
</div>

<style>
  .combo {
    align-self: end;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    font-size: 2rem;
    color: var(--white);
    -webkit-text-stroke: 0.1rem var(--outline);
  }
  .count {
    font-size: 4rem;
  }
  .title,
  .count {
    margin: 2vw;
  }
</style>
