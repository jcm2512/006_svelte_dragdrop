<script>
  import { count } from "./store.js";
  import MatchingGame from "./matching-game.svelte";
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
  count.subscribe((value) => {
    play = value;
  });

  const words = tiles.map((item) => {
    return item.word;
  });

  function handleClick() {
    const wordSet = words.filter((elem) => elem != storedPrevious);
    word = wordSet[Math.floor(Math.random() * (words.length - 1))];
    count.update((value) => !value);
  }
</script>

<main>
  {#if play == false}
    <div class="tiles-main">
      {#each tiles as tile}
        <div class="tile" on:click={() => handleClick(tile)}>
          {tile.word}
        </div>
      {/each}
    </div>
  {/if}
  {#if play == true}
    <div>he</div>
    <MatchingGame bind:word />
  {/if}
  <div class="play" on:click={() => handleClick()}>play</div>
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
