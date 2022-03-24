<script>
  import { count } from "./store.js";
  import MatchingGame from "./matching-game.svelte";
  export let tiles;
  export let word;

  let play;
  count.subscribe((value) => {
    play = value;
  });

  function handleClick(event) {
    count.update((value) => !value);
    word = event.word;
    console.log(event.word);
    console.log(play);
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
    <MatchingGame bind:word />
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
