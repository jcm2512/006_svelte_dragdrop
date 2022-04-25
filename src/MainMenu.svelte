<script>
  import {
    gameLoaderWordId,
    gameLoaded,
    cvcObject,
    currentWordProgress,
  } from "./store.js";
  import GameLoader from "./GameLoader.svelte";
  const version = "v0.2.2";

  let words;
  let cvcs = Object.keys($cvcObject);

  $: stageCard = false;

  // DEV
  $gameLoaded = false;

  words = [];
  let wordObjects = [];

  cvcs.forEach((value) => {
    words.push($cvcObject[value].word);
    wordObjects.push($cvcObject[value]);
  });

  function handlePlay() {
    $gameLoaded = true;
    $gameLoaderWordId = 0; // reset word ID to 0
    $currentWordProgress = 0;
  }

  function handleStage() {
    stageCard = true;
  }
</script>

<main>
  {#if $gameLoaded == true}
    <GameLoader GameWords={wordObjects} />
  {:else}
    {#if stageCard == true}
      <div class="stageSelect">
        <div class="stage_card auto rounded card" />
        <div class="back auto arrow_btn">«</div>
        <div class="next auto arrow_btn">»</div>
        <div class="play_btn auto rounded button" on:click={() => handlePlay()}>
          play
        </div>
      </div>
    {/if}
    <div class="level auto rounded label">Player Level</div>
    <div class="points auto rounded label">Player Points</div>
    <div class="play_btn auto rounded button" on:click={() => handlePlay()}>
      play
    </div>
    <div class="stage_btn auto rounded button" on:click={() => handleStage()}>
      stage
    </div>
  {/if}
</main>

<style>
  main {
    display: grid;
    text-align: center;
    grid-template-columns: repeat(12, 1fr);
    grid-template-rows: repeat(12, 1fr);
    width: 100vw;
    height: 100vh;
    background-color: #00a4ff;
  }

  .stage_card {
    grid-row: 4/-4;
    grid-column: 2/-1;
  }

  .auto {
    width: 100%;
    height: 100%;
    margin: auto;
    text-align: center;
    align-items: center;
    justify-items: center;
  }

  .next {
    grid-column: -1/-1;
    grid-row: 6;
  }
  .back {
    grid-column: 1/1;
    grid-row: 6;
  }
  .arrow_btn {
    color: white;
    font-size: 3rem;
    cursor: pointer;
  }

  .rounded {
    border-radius: 1rem;
    padding: 0.5em;
  }

  .card {
    background-color: #ff61aa;
  }

  .button {
    cursor: pointer;
    background-color: #f4d042;
  }

  .label {
    background-color: #ffffff;
  }

  .level {
    grid-row: 2/3;
    grid-column: 2/4;
  }

  .points {
    grid-row: 2/3;
    grid-column: 5/-2;
  }

  .stage_btn {
    grid-row: 11/12;
    grid-column: 2/4;
    z-index: 10;
  }

  .play_btn {
    grid-row: 11/12;
    grid-column: 5/9;
    z-index: 10;
  }

  .stageSelect {
    display: grid;
    text-align: center;
    grid-template-columns: repeat(12, 1fr);
    grid-template-rows: repeat(12, 1fr);
    width: 100vw;
    height: 100vh;
    background-color: hsla(0, 0%, 0%, 0.7);
    grid-row: 1/-1;
    grid-column: 1/-1;
    z-index: 50;
  }
</style>
