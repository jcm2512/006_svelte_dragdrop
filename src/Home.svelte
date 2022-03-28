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
            class="button nonselectable"
            style="--exp: {`${$cvcObject[tile].exp}%`}"
          >
            <img src={$cvcObject[tile].img} width="80" height="80" />
          </div>
        {:else}
          <div class="button" style="--exp: {`${$cvcObject[tile].exp}%`}">
            <img
              class="nonselectable"
              src={$cvcObject[tile].img}
              width="80"
              height="80"
            />
          </div>
        {/if}
      {/each}
    </div>
    <div class="play" on:click={() => handlePlay()}>play</div>
  {/if}
</main>

<style>
  .nonselectable {
    touch-action: none;
    user-select: none;
  }

  :root {
    --tile: 220;
  }

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

  .button {
    padding-top: 10px;
    height: 90px;
    width: 100px;
    text-align: center;
    align-items: center;
    justify-content: center;
    position: relative;
    display: inline-block;
    cursor: pointer;
    outline: none;
    border: 0;
    vertical-align: middle;
    text-decoration: none;
    font-size: inherit;
    font-family: inherit;

    color: hsl(var(--tile), 0%, 18%);
    background: hsl(var(--tile), 0%, 97%);
    border: 2px solid hsl(var(--tile), 0%, 61%);
    border-radius: 0.75em;
    transform-style: preserve-3d;
    transition: transform 150ms cubic-bezier(0, 0, 0.58, 1),
      background 150ms cubic-bezier(0, 0, 0.58, 1);
  }

  .button::before {
    position: absolute;
    content: "";
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: hsl(var(--tile), var(--exp), 75%);
    border-radius: inherit;
    box-shadow: 0 0 0 2px hsl(var(--tile), 0%, 61%),
      0 0.625em 0 0 hsl(var(--tile), 0%, 94%);
    transform: translate3d(0, 0.75em, -1em);
    transition: transform 150ms cubic-bezier(0, 0, 0.58, 1),
      box-shadow 150ms cubic-bezier(0, 0, 0.58, 1);
  }

  .button:hover {
    background: hsl(var(--tile), 0%, 96%);
    transform: translate(0, 0.25em);
  }
  .button:hover::before {
    box-shadow: 0 0 0 2px hsl(var(--tile), 0%, 61%),
      0 0.5em 0 0 hsl(var(--tile), 0%, 94%);
    transform: translate3d(0, 0.5em, -1em);
  }
  .button:active {
    background: hsl(var(--tile), 0%, 96%);
    transform: translate(0em, 0.75em);
  }
  .button:active::before {
    box-shadow: 0 0 0 2px hsl(var(--tile), 0%, 61%),
      0 0 hsl(var(--tile), 0%, 94%);
    transform: translate3d(0, 0, -1em);
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
