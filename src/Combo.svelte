<script>
  import { combo, comboTimer } from "./store.js";
  import { scale } from "svelte/transition";
  import { quintOut } from "svelte/easing";

  setInterval(() => {
    $comboTimer += 1;
    if ($comboTimer > 5) {
      $combo = 0;
    }
  }, 1000);
</script>

<div class="combo">
  {#key $combo}
    {#if $comboTimer < 5 && $combo > 0}
      <span
        class="count"
        in:scale={{
          duration: 500,
          opacity: 0.5,
          start: 0.5,
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
    flex-direction: column;
    font-size: 2rem;
    color: white;
    -webkit-text-stroke: 0.1rem var(--dark-blue);
  }
  .count {
    font-size: 4rem;
  }
</style>
