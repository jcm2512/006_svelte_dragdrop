<script>
  import { gameLoaderWordId, gameLoaded, gameWordLimit } from "./store.js";
  import MatchingGame from "./matching-game.svelte";
  import Timer from "./Timer.svelte";
  export let tiles;

  let limit = [];

  for (let i = 0; i < $gameWordLimit; i++) {
    limit.push(i);
  }

  function handleClick() {
    gameLoaded.update((value) => !value);
  }

  function shuffle(word) {
    let array = [...word];
    for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  }

  let words = tiles
    .filter((t) => t.unlocked == true) // only show unlocked cvcs
    .map((item) => {
      return item.word;
    });
  words = shuffle(words);
</script>

<div class="gameLoader">
  <div id="timer"><Timer /></div>
  {#each limit as index}
    {#if $gameLoaderWordId == index}
      <div id="matching_game"><MatchingGame word={words[index]} /></div>
    {/if}
  {/each}
</div>

<style>
  .gameLoader {
    display: grid;
    grid-template-columns: 1fr 3fr 1fr;
    grid-template-rows: 1fr;
  }

  #timer {
    margin-top: 1rem;
    margin-left: 1rem;
    grid-row: 1/2;
    grid-column: 1/2;
  }

  #matching_game {
    grid-row: 1/2;
    grid-column: 1/-1;
  }
</style>
