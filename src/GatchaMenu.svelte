<script>
  import { cvcObject, gatchaMenu, gameStars } from "./store.js";
  import Button from "./components/Button.svelte";

  export let LockedWords;
  export let GameLevel;

  let gatcha = function () {
    if ($gameStars.stars >= 5) {
      let r = Math.floor(Math.random() * LockedWords.length);
      $cvcObject[GameLevel][LockedWords[r]].status = "unlocked";
      $gameStars.stars -= 5;
      $gatchaMenu = false;
    } else {
      console.log("Not enough stars");
    }
  };
</script>

<div class="main card container">
  <img src="/assets/ui/gumball.png" class="gatcha" alt="Gatcha" />
  <div class="_button">
    <Button
      label="go"
      grid_column="1"
      grid_row="-2"
      button_function={gatcha}
      bg_color="var(--green)"
    />
  </div>
</div>

<style>
  .main {
    scroll-snap-align: center;
    display: inline-block; /* remove list bullets*/
    font-size: 2rem;
    color: white;
  }

  img {
    height: 50vw;
    width: 50vw;
    grid-column: 1/-1;
    grid-row: 1/-1;
  }

  .container {
    display: grid;
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 4fr 1fr;
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
    z-index: 50;
    border: var(--border-width) solid var(--white);
  }

  ._button {
    grid-row: -2;
    grid-column: 1;
    width: 80%;
    height: 80%;
  }
</style>
