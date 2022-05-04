<script>
  import { gameState } from "./store.js";
</script>

{#key $gameState}
  <div id="background" class="default" />
{/key}

<style>
  #background {
    width: 100vw;
    height: 100vh;
  }

  .default {
    background-image: url("/assets/bg/bg-tile-blue-stars.png");
  }
</style>
