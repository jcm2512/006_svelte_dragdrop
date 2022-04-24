<script>
  import { gameState, bonustime, timerEnd } from "./store.js";
  const switchBackground = function () {
    return $timerEnd ? "gameOver" : $bonustime ? "bonus" : "default";
  };
  $: preloadImageUrls = [
    "/assets/bg-tile-yellow-stars.png",
    "/assets/bg-tile-blue-stars.png",
    "/assets/bg-tile-orange-stars.png",
  ];
</script>

<!-- <svelte:head>
  {#each preloadImageUrls as image}
    <link rel="preload" as="image" href={image} />
  {/each}
</svelte:head> -->

{#key $gameState}
  <div id="preload" class="bonus default gameOver" />
  <div id="background" class={switchBackground()} />
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
