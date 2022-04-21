<script>
  import { gameLoaderWordId, gameLoaded, gameWordLimit } from "./store.js";
  import MatchingGame from "./matching-game.svelte";
  import Timer from "./Timer.svelte";
  import GamePoints from "./GamePoints.svelte";
  import Expbar from "./Expbar.svelte";
  import { localData } from "./functions/localstorage.svelte";

  export let GameWords;
  let randomWords = [];

  let myLocalStorage = localData;
  myLocalStorage.set("points", 200);
  console.log(myLocalStorage.get("points"));
  // push an id (0,1,2 etc) to LIMIT for each game word
  // this is so we can cycle through the array with svelte
  let limit = [];
  for (let i = 0; i < $gameWordLimit; i++) {
    limit.push(i);
  }

  // NA?
  // function handleClick() {
  //   gameLoaded.update((value) => !value);
  // }

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
  // words = shuffle(words);

  addRandomWordFrom(words, randomWords, 5);
</script>

<div class="gameLoader">
  <div id="_Timer"><Timer /></div>
  <div id="_GamePoints"><GamePoints /></div>
  <div id="_Expbar"><Expbar /></div>
  {#each limit as id}
    {#if $gameLoaderWordId == id}
      <div id="_matchingGame">
        <MatchingGame word={randomWords[id]} />
      </div>
    {/if}
  {/each}
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
  #_Expbar {
    margin-top: 2em;
    grid-column: 4/-1;
    grid-row: 1;
  }

  #_Timer {
    margin-top: 1rem;
    margin-left: 1rem;
    grid-row: 1/2;
    grid-column: 1/4;
  }

  #_GamePoints {
    margin-right: 1rem;
    margin-top: 2rem;
    grid-row: 1/2;
    grid-column: -4/-1;
  }

  #_matchingGame {
    grid-row: 1/-1;
    grid-column: 1/-1;
  }
</style>
