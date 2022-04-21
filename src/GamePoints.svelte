<script>
  import { gamePoints } from "./store.js";
</script>

<div id="pointsbar">
  <div id="points_bar_bg" />
  <!-- <img src="/assets/ui/bolt.png" alt="points" /> -->

  <div id="points">{$gamePoints.points}</div>
</div>

<style>
  #pointsbar {
    --main-font: "Londrina Solid";
    padding: 0.2rem;
    --height: 8vw;
    --rounded: 4vw;
    --border: 1vw;
    --min: 5vw;
    --inner: calc(var(--height) - (2 * (var(--border))));
    position: relative;
    display: grid;
    grid-template-columns: 1fr 4fr;
    align-items: center;
  }
  @media (orientation: landscape) {
    #pointsbar {
      width: 20vw;
    }
  }

  @media (orientation: portrait) {
    #pointsbar {
      width: 20vw;
    }
  }

  #pointsbar img {
    grid-column: 1/2;
    grid-row: 1/-1;
    width: 80%;
    margin-left: 10%;
    height: auto;
    z-index: 1;
    position: relative;
    overflow: hidden;
  }

  #points {
    font-family: var(--main-font);
    position: relative;
    grid-column: 1/-1;
    grid-row: 1/-1;
    z-index: 5;
  }

  #points_bar_bg {
    position: relative;
    grid-column: 1/-1;
    grid-row: 1/-1;
    background-color: white;
    border-radius: var(--rounded);
    height: var(--height);
    border: var(--border) solid white;
    z-index: 0;
  }
</style>
