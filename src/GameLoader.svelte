<script>
  import { gameLoaderWordId, gameLoaded, gameWordLimit } from "./store.js";
  import MatchingGame from "./matching-game.svelte";
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

<main>
  <div class="tiles-main">
    {#each limit as index}
      {#if $gameLoaderWordId == index}
        <MatchingGame word={words[index]} />
      {/if}
    {/each}

    <!-- <div class="back" on:click={() => handleClick()}>back</div> -->
  </div>
</main>
