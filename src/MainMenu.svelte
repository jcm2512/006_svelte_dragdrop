<script>
  import {
    gameLoaderWordId,
    gameLoaded,
    cvcObject,
    currentWordProgress,
  } from "./store.js";
  import { fly } from "svelte/transition";
  import { Swipe, SwipeItem } from "svelte-swipe";
  import GameLoader from "./GameLoader.svelte";

  const version = "v0.3.1";

  let words;
  let cvcs = Object.keys($cvcObject);

  let cards = ["card a", "card b", "card c", "card d"],
    cardId = 0;

  let transitionIn, transitionOut;

  const swipeConfig = {
    autoplay: false,
    delay: 2000,
    showIndicators: true,
    transitionDuration: 1000,
    defaultIndex: 0,
  };

  // DEV
  $gameLoaded = false;

  words = [];
  let wordObjects = [];

  cvcs.forEach((value) => {
    words.push($cvcObject[value].word);
    wordObjects.push($cvcObject[value]);
  });

  function handlePlay() {
    transitionOut = { duration: 0 };

    $gameLoaded = true;
    $gameLoaderWordId = 0; // reset word ID to 0
    $currentWordProgress = 0;
  }
  function handleNext() {
    transitionIn = { x: -window.screen.width, duration: 500 };
    transitionOut = { x: window.screen.width, duration: 500 };
    if (cardId >= 1) {
      cardId -= 1;
    } else {
      cardId = cards.length - 1;
    }
  }

  function handlePrev() {
    transitionIn = { x: window.screen.width, duration: 500 };
    transitionOut = { x: -window.screen.width, duration: 500 };
    if (cardId < cards.length - 1) {
      cardId += 1;
    } else {
      cardId = 0;
    }
  }
</script>

<main class="full_grid">
  {#if $gameLoaded == true}
    <GameLoader GameWords={wordObjects} />
  {:else}
    <div id="level" class="auto rounded label">Player Level</div>
    <div id="points" class="auto rounded label">Player Points</div>
    {#key cardId}
      <div
        id="stage_card"
        class="auto rounded card"
        in:fly={transitionIn}
        out:fly={transitionOut}
      >
        {cards[cardId]}
      </div>
    {/key}
    <div id="prev" class="auto arrow_btn" on:click={() => handlePrev()}>«</div>
    <div id="next" class="auto arrow_btn" on:click={() => handleNext()}>»</div>
    <div
      id="play_btn"
      class="auto rounded button"
      on:click={() => handlePlay()}
    >
      play
    </div>
  {/if}
</main>

<style>
  main {
    display: grid;
    text-align: center;
    background-color: #00a4ff;
  }

  .auto {
    width: 100%;
    height: 100%;
    margin: auto;
    text-align: center;
    align-items: center;
    justify-items: center;
  }

  .full_grid {
    grid-template-columns: repeat(10, 10vw);
    grid-template-rows: repeat(16, 6.25vh);
    width: 100vw;
    height: 100vh;
  }

  .rounded {
    border-radius: 1rem;
    padding: 0.5em;
  }

  .card {
    background-color: #ff61aa;
    z-index: 50;
  }

  .button {
    cursor: pointer;
    background-color: #f4d042;
    z-index: 10;
  }

  .label {
    background-color: #ffffff;
    z-index: 10;
  }

  .arrow_btn {
    color: white;
    font-size: 3rem;
    cursor: pointer;
    z-index: 100;
  }

  #play_btn {
    grid-row: 15/16;
    grid-column: 4/8;
  }

  #stage_card {
    grid-row: 4/-4;
    grid-column: 2/-2;
  }

  #next,
  #prev {
    grid-row: 8/11;
  }

  #prev {
    grid-column: 1;
  }

  #next {
    grid-column: -2;
  }

  #level {
    grid-row: 2/3;
    grid-column: 2/4;
  }

  #points {
    grid-row: 2/3;
    grid-column: 5/-2;
  }
</style>
