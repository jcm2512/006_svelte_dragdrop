<script>
  import { gameLoaderWordId, gameLoaded, cvcList, cvcObject } from "./store.js";
  import GameLoader from "./GameLoader.svelte";
  import { writable } from "svelte/store";
  // export let tiles;
  // export let word;

  const version = "v0.2.1";
  // const storedPrevious = localStorage.getItem("HelloHippo");

  // export const previous = writable(storedPrevious);
  // previous.subscribe((value) => {
  //   localStorage.setItem("HelloHippo", word);
  // });

  let words;
  let cvcs = Object.keys($cvcObject);

  words = [];
  let wordObjects = [];

  cvcs.forEach((value) => {
    words.push($cvcObject[value].word);
    wordObjects.push($cvcObject[value]);
  });

  // words = $cvcList.map((item) => {
  //   return item.word;
  // });

  function handlePlay() {
    // const wordSet = words.filter((elem) => elem != storedPrevious);
    // word = wordSet[Math.floor(Math.random() * (words.length - 1))];
    gameLoaded.update((value) => !value);
    gameLoaderWordId.update((value) => 0); // reset word ID to 0
  }
</script>

<main>
  {#if $gameLoaded == true}
    <GameLoader tiles={wordObjects} />
  {:else}
    <div class="tiles-main">
      {#each words as tile}
        {#if $cvcObject[tile].unlocked}
          <div
            class="tile"
            style="--variable: {($cvcObject[tile].exp + 40) / 100}"
          >
            <img src={$cvcObject[tile].img} width="80" height="80" />
          </div>
        {:else}
          <div class="tile" style="opacity: 0.1">
            <img src={$cvcObject[tile].img} width="80" height="80" />
          </div>
        {/if}
      {/each}
    </div>
    <div class="play" on:click={() => handlePlay()}>play</div>
  {/if}
</main>

<style>
  .tiles-main {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
    align-items: center;
    justify-content: center;
  }

  .tile {
    opacity: var(--variable);
    height: 90px;
    width: 100px;
    font-size: 4em;
    text-align: center;
    align-items: center;
    padding-top: 10px;
    justify-content: center;
    border: 1px solid black;
    border-radius: 2rem;
  }
</style>
