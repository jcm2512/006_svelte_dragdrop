<script>
  import { gameWords, cvcObject, gameLoaded } from "../store.js";
  import Button from "../components/Button.svelte";
  import ProgressBar from "../components/ProgressBar.svelte";
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
    <div class="results_progress_bar">
      <ProgressBar
        {currentWord}
        {GameLevel}
        width="30vw"
        height="2rem"
        inner_border="0px"
        fill_color="var(--pink)"
        inner_color="var(--white)"
        viewResults={true}
        value={$cvcObject[GameLevel][currentWord].initial_exp}
        rounded={0.4}
      />
    </div>
  {/each}
</div>

<div class="go_button">
  <Button
    label="GO!"
    bg_color="var(--green)"
    button_function={function () {
      $gameLoaded = false;
    }}
  />
</div>

<style>
  .go_button {
    grid-column: 4/-4;
    grid-row: 13/14;
    height: 100%;
    z-index: 100;
    margin-top: 1rem;
  }
</style>
