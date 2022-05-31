<script>
  import { gameStars, gatchaMenu } from "./store.js";
  import Button from "./components/Button.svelte";

  let stageCards,
    handleNav,
    CARDS = [], //Create empty array to store DOM references
    stars;

  let close = function () {
    $gatchaMenu = false;
  };
</script>

<div bind:this={stars} id="stars" class="auto rounded label">
  <img src="/assets/ui/star.png" alt="stars" />
  <span>{$gameStars.stars}</span>
</div>
<div class="card container">hello</div>
<div class="go_button">
  <Button label="GO!" bg_color="var(--green)  " />
</div>
<Button label="X" grid_column="9/10" grid_row="5/6" button_function={close} />

<style>
  img {
    height: 20vw;
    width: 20vw;
    max-width: 3.5rem;
    max-height: 3.5rem;
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
    background-color: var(--white);
    z-index: 10;
  }

  #stars {
    grid-row: 2/3;
    grid-column: 1/4;
    display: flex;
    align-items: center;
    font-size: 1.5rem;
    padding: 0 0 0 1.5rem;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    border: var(--border-width) solid var(--yellow);
    border-left: 0;
  }

  #stars img {
    height: 100%;
    width: 6vh;
    height: 6vh;
    padding: 0.5rem;
  }

  .container {
    display: grid;
    grid-row: 5/-4;
    grid-column: 2/-2;
    grid-template-columns: repeat(6, 1fr);
    justify-content: space-evenly;
    align-content: space-evenly;
    width: 100%;
    height: 100%;
    margin: auto;
    text-align: center;
    align-items: center;
    justify-items: center;
  }

  .card {
    border-radius: 1rem;
    background-color: var(--yellow);
    z-index: 20;
    border: var(--border-width) solid var(--white);
  }

  .go_button {
    grid-column: 4/-4;
    grid-row: 13/14;
    height: 100%;
    z-index: 100;
    margin-top: 1rem;
  }
</style>
