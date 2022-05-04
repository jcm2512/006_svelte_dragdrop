<script>
  import {
    gameLoaderWordId,
    gameWordLimit,
    devMode,
    wordLimitOverride,
  } from "./store.js";
  import MatchingGame from "./matching-game.svelte";
  import Timer from "./Timer.svelte";
  import Expbar from "./Expbar.svelte";
  import WordExp from "./WordExp.svelte";
  import BG from "./BG.svelte";
  import WordIcon from "./WordIcon.svelte";
  import Combo from "./Combo.svelte";

  export let GameWords;
  export let GameLevel;

  let randomWords = [];

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

  let words = GameWords.filter((t) => t.status == "unlocked") // only show unlocked cvcs
    .map((item) => {
      return item.word;
    });

  // dev mode

  if ($devMode) {
    words = words.slice(0, $wordLimitOverride);
  }
  let wordLimit = words.length > 5 ? 5 : words.length;

  addRandomWordFrom(words, randomWords, wordLimit);
  $: currentWord = randomWords[$gameLoaderWordId];
</script>

<div class="gameLoader">
  <div id="_WordIcon">
    <WordIcon {currentWord} />
  </div>
  <div id="_Background"><BG /></div>
  <div id="_Timer"><Timer /></div>
  <div id="_Expbar"><Expbar /></div>
  {#key $gameLoaderWordId}
    <div id="_matchingGame" class={$gameLoaderWordId}>
      <MatchingGame {currentWord} {GameLevel} />
    </div>
  {/key}
  <div id="_WordExp">
    <WordExp {currentWord} />
  </div>
  <div id="_Combo">
    <Combo />
  </div>
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
    grid-column: 4/-1;
    grid-row: 11;
    z-index: 30;
  }

  #_Timer {
    margin-top: 1rem;
    margin-left: 1rem;
    grid-row: 1/2;
    grid-column: 9/-1;
    z-index: 40;
  }

  #_WordExp {
    grid-column: 4/-4;
    grid-row: 1;
    z-index: 30;
    padding-bottom: 1rem;
    align-self: end;
  }
  #_WordIcon {
    grid-row: 1;
    grid-column: 1/4;
    z-index: 40;
    height: 100%;
    padding: 1rem;
    display: flex;
    flex-direction: column;
  }

  #_Combo {
    grid-column: 1/4;
    grid-row: 10/12;
    height: 100%;
    z-index: 100;
  }
</style>
