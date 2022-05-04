<script>
  import { gameState } from "./store.js";
</script>

{#key $gameState}
  <div id="preload" class="bonus default gameOver" />
  <!-- <div id="background" class={switchBackground()} /> -->
  <div id="background" class="default" />
{/key}

<style>
  #background {
    width: 100vw;
    height: 100vh;
  }

  #preload {
    display: none;
  }

  .bonus {
    background-image: url("/assets/bg-tile-yellow-stars.png");
  }

  .default {
    background-image: url("/assets/bg-tile-blue-stars.png");
  }

  .gameOver {
    background-image: url("/assets/bg-tile-orange-stars.png");
  }
</style>
