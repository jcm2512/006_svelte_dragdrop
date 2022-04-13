<script>
  import {
    gameLoaderWordId,
    gameLoaded,
    cvcObject,
    currentWordProgress,
  } from "./store.js";
  import GameLoader from "./GameLoader.svelte";
  const version = "v0.2.2";

  let words;
  let cvcs = Object.keys($cvcObject);

  // DEV
  $gameLoaded = true;

  words = [];
  let wordObjects = [];

  cvcs.forEach((value) => {
    words.push($cvcObject[value].word);
    wordObjects.push($cvcObject[value]);
  });

  function handlePlay() {
    $gameLoaded = true;
    $gameLoaderWordId = 0; // reset word ID to 0
    $currentWordProgress = 0;
  }
</script>

<main>
  {#if $gameLoaded == true}
    <GameLoader GameWords={wordObjects} />
  {:else}
    <div class="play" on:click={() => handlePlay()}>play</div>
  {/if}
</main>

<style>
  main {
    position: fixed;
  }

  :root {
    --tile: 220;
  }

  .play {
    position: relative;
    background-color: hsl(var(--tile), 50%, 80%);
    width: 5em;
    padding: 0.5em;
    text-align: center;
    cursor: pointer;
    margin: auto;
  }
</style>
