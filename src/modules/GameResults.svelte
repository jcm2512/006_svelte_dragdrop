<script>
  import { gameWords, cvcObject } from "../store.js";
  import Button from "../components/Button.svelte";
  export let GameLevel;
</script>

<div class="results">
  {#each $gameWords as currentWord}
    <div class="results_div">
      <img
        src={$cvcObject[GameLevel][currentWord].img}
        alt={currentWord}
        class="results_img"
      />
    </div>
  {/each}
</div>

<div class="go_button">
  <Button label="GO!" bg_color="var(--green)  " />
</div>
<Button label="X" grid_column="9/10" grid_row="5/6" />

<style>
  .go_button {
    grid-column: 4/-4;
    grid-row: 13/14;
    height: 100%;
    z-index: 100;
    margin-top: 1rem;
  }
</style>
