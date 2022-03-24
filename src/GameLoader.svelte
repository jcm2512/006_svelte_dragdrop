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

  let words = tiles.map((item) => {
    return item.word;
  });
  words = shuffle(words);
</script>

<main>
  <div class="tiles-main">
    {#if wordId == 0}
      <MatchingGame word={words[0]} />
    {:else if wordId == 1}
      <MatchingGame word={words[1]} />
    {:else if wordId == 2}
      <MatchingGame word={words[2]} />
    {:else if wordId == 3}
      <MatchingGame word={words[3]} />
    {:else if wordId == 4}
      <MatchingGame word={words[4]} />
    {:else if wordId == 5}
      <div class="back" on:click={() => handleClick()}>back</div>
    {/if}
  </div>
</main>
