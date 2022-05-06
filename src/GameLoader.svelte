<script>
  import {
    gameLoaderWordId,
    gameWordLimit,
    devMode,
    currentLevel,
    cvcObject,
    triggerLetter,
  } from "./store.js";
  import MatchingGame from "./matching-game.svelte";
  import Timer from "./Timer.svelte";
  import Expbar from "./Expbar.svelte";
  import WordExp from "./WordExp.svelte";
  import BG from "./BG.svelte";
  import WordIcon from "./WordIcon.svelte";
  import Combo from "./Combo.svelte";
  import ProgressBar from "./components/ProgressBar.svelte";

  export let GameWords;
  export let GameLevelId;
  export let GameLevel;

  console.log($currentLevel);
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
  if ($devMode.wordLimitOverride) {
    words = words.slice(0, $devMode.wordLimitOverride);
  }
  let wordLimit = words.length > 5 ? 5 : words.length;
  // dev mode END

  addRandomWordFrom(words, randomWords, wordLimit);
  $: currentWord = randomWords[$gameLoaderWordId];
</script>

<div class="full_grid">
  <div id="_WordIconExp">
    <WordIcon {currentWord} {GameLevel} />
  </div>
  <div id="_Background"><BG /></div>
  <div id="_Timer"><Timer /></div>

  <div id="_Expbar"><Expbar /></div>
  {#key $gameLoaderWordId}
    <div id="_matchingGame" class={$gameLoaderWordId}>
      <MatchingGame {currentWord} {GameLevelId} {GameLevel} />
    </div>
    <!-- <div id="_WordExp">
      <WordExp {currentWord} {GameLevel} />
    </div> -->
  {/key}
  <div id="_Combo">
    <Combo />
  </div>
</div>

<style>
  #_Background {
    grid-row: 1/-1;
    grid-column: 1/-1;
    z-index: 1;
  }

  #_ProgressBar {
    grid-row: 1/7;
    grid-column: 5/8;
    z-index: 10;
  }

  #_matchingGame {
    grid-row: 1/-1;
    grid-column: 1/-1;
    z-index: 5;
  }

  #_Expbar {
    grid-column: 4/9;
  }

  #_Timer {
    grid-column: -3/-1;
    margin: 4vw;
    justify-self: flex-end;
    /* align-self: flex-end; */
    background-color: var(--white);
    border: 1vw solid var(--white);
    border-radius: 20vw;
  }

  #_WordIconExp {
    grid-column: 1/5;
    z-index: 40;
    margin: 4vw;
    display: flex;
    flex-direction: column;
  }

  #_Combo {
    grid-column: 4/-3;
    grid-row: 2/5;
    z-index: 100;
    align-self: center;
  }

  #_WordIconExp,
  #_Timer,
  #_Expbar {
    grid-row: 1/4;
    z-index: 30;
    align-self: center;
  }
</style>
