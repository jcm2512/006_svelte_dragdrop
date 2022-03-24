<script>
  import { gameLoaderWordId, gameLoaded } from "./store.js";
  import MatchingGame from "./matching-game.svelte";
  export let tiles;
  let wordId;
  gameLoaderWordId.subscribe((value) => {
    wordId = value;
  });
  function handleClick() {
    gameLoaded.update((value) => !value);
  }

  console.log(tiles[0].word);
</script>

<main>
  <div class="tiles-main">
    {#if wordId == 0}
      <MatchingGame word={tiles[0].word} />
    {:else if wordId == 1}
      <MatchingGame word={tiles[1].word} />
    {:else if wordId == 2}
      <MatchingGame word={tiles[2].word} />
    {:else if wordId == 3}
      <MatchingGame word={tiles[3].word} />
    {:else if wordId == 4}
      <MatchingGame word={tiles[4].word} />
    {:else if wordId == 5}
      <div class="back" on:click={() => handleClick()}>back</div>
    {/if}
  </div>
</main>
