<script>
  import {
    gameLoaderWordId,
    gameWordLimit,
    gamePoints,
    eventTrigger,
    gameState,
  } from "./store.js";
  import MatchingGame from "./matching-game.svelte";
  import Timer from "./Timer.svelte";
  import Expbar from "./Expbar.svelte";
  import BG from "./BG.svelte";
  import { localData } from "./functions/localstorage.svelte";

  export let GameWords;
  let randomWords = [];

  let sessionStorage = localData;
  sessionStorage.load();
  $gamePoints = sessionStorage.get("points");
  $: $gamePoints && sessionStorage.set($gamePoints);
  $: $eventTrigger.save && sessionStorage.save();
  $: $gameState, console.log($gameState);

  function addRandomWordFrom(array, toarray, limit) {
    let shuffledArray = shuffle(array);
    for (let i = 0; i < $gameWordLimit; i++) {
      var index = Math.floor(Math.random() * limit);
      toarray.push(shuffledArray[index]);
    }
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

  let words = GameWords.filter((t) => t.unlocked == true) // only show unlocked cvcs
    .map((item) => {
      return item.word;
    });

  addRandomWordFrom(words, randomWords, 5);
</script>

<div class="gameLoader">
  <div id="_Background"><BG /></div>
  <div id="_Timer"><Timer /></div>
  <div id="_Expbar"><Expbar /></div>
  {#key $gameLoaderWordId}
    <div id="_matchingGame" class={$gameLoaderWordId}>
      <MatchingGame word={randomWords[$gameLoaderWordId]} />
    </div>
  {/key}
</div>

<style>
  .gameLoader {
    display: grid;
    text-align: center;
    grid-template-columns: repeat(12, 1fr);
    grid-template-rows: repeat(12, 1fr);
    width: 100vw;
    height: 100vh;
  }

  #_Background {
    grid-row: 1/-1;
    grid-column: 1/-1;
    z-index: 10;
  }

  #_matchingGame {
    grid-row: 1/-1;
    grid-column: 1/-1;
    z-index: 20;
  }

  #_Expbar {
    margin-top: 2em;
    grid-column: 4/-1;
    grid-row: 1;
    z-index: 30;
  }

  #_Timer {
    margin-top: 1rem;
    margin-left: 1rem;
    grid-row: 1/2;
    grid-column: 1/4;
    z-index: 40;
  }

  #_GamePoints {
    margin-right: 1rem;
    margin-top: 2rem;
    grid-row: 1/2;
    grid-column: -4/-1;
    z-index: 50;
  }
</style>
