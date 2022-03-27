<script>
  import { gameLoaderWordId, gameLoaded } from "./store.js";
  import GameLoader from "./GameLoader.svelte";
  import { writable } from "svelte/store";
  export let tiles;
  export let word;

  const version = "v0.2.1";
  const storedPrevious = localStorage.getItem("HelloHippo");

  export const previous = writable(storedPrevious);
  previous.subscribe((value) => {
    localStorage.setItem("HelloHippo", word);
  });

  let words = tiles.map((item) => {
    return item.word;
  });

  function handlePlay() {
    const wordSet = words.filter((elem) => elem != storedPrevious);
    word = wordSet[Math.floor(Math.random() * (words.length - 1))];
    gameLoaded.update((value) => !value);
    gameLoaderWordId.update((value) => 0); // reset word ID to 0
  }
</script>

<main>
  {#if $gameLoaded == true}
    <GameLoader bind:tiles />
  {:else}
    <div class="play" on:click={() => handlePlay()}>play</div>
  {/if}
</main>

<style>
  .tiles-main {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
    align-items: center;
    justify-content: center;
  }

  .tile {
    font-size: 4em;
    text-align: center;
  }
</style>
