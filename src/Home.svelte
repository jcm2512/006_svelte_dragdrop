<script>
  import { gameLoaded } from "./store.js";
  import GameLoader from "./GameLoader.svelte";
  import { writable } from "svelte/store";
  export let tiles;
  export let word;

  const version = "v0.2.0";
  const storedPrevious = localStorage.getItem("HelloHippo");

  export const previous = writable(storedPrevious);
  previous.subscribe((value) => {
    localStorage.setItem("HelloHippo", word);
  });

  let play;
  gameLoaded.subscribe((value) => {
    play = value;
  });

  let words = tiles.map((item) => {
    return item.word;
  });

  function handleClick() {
    const wordSet = words.filter((elem) => elem != storedPrevious);
    word = wordSet[Math.floor(Math.random() * (words.length - 1))];
    gameLoaded.update((value) => !value);
  }
</script>

<main>
  {#if play == true}
    <GameLoader bind:tiles />
  {:else}
    <div class="play" on:click={() => handleClick()}>play</div>
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
