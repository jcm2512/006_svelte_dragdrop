<script>
  import {
    gameLoaderWordId,
    gameWordLimit,
    devMode,
    gameWords,
    timerEnd,
    cvcObject,
  } from "./store.js";
  import MatchingGame from "./matching-game.svelte";
  import Timer from "./Timer.svelte";
  import Expbar from "./Expbar.svelte";
  import BG from "./BG.svelte";
  import WordIcon from "./WordIcon.svelte";
  import Combo from "./Combo.svelte";
  import GameResults from "./modules/GameResults.svelte";

  export let GameLevelId;
  export let GameLevel;
  export let UnlockedWords;

  let matchingGame;

  console.log(GameLevelId, GameLevel);

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

  // dev mode
  if ($devMode.wordLimitOverride) {
    UnlockedWords = UnlockedWords.slice(0, $devMode.wordLimitOverride);
  } else {
    UnlockedWords = UnlockedWords.slice(0, 5);
  }
  // dev mode END

  let wordLimit = UnlockedWords.length > 5 ? 5 : UnlockedWords.length;

  addRandomWordFrom(UnlockedWords, randomWords, wordLimit);

  $gameWords = UnlockedWords;

  UnlockedWords.forEach((currentWord) => {
    let word = $cvcObject[GameLevel][currentWord];
    word.initial_exp = word.exp;
  });
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
    <div bind:this={matchingGame} id="_matchingGame" class={$gameLoaderWordId}>
      <MatchingGame {currentWord} {GameLevelId} {GameLevel} />
    </div>
  {/key}
  <div id="_Combo">
    <Combo />
  </div>
  {#if $timerEnd == true}
    <GameResults {GameLevel} />
  {/if}
</div>

<style>
  #_Background {
    grid-row: 1/-1;
    grid-column: 1/-1;
    z-index: 1;
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
