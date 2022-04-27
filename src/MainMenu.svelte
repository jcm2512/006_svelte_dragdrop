<script>
  import {
    gameLoaderWordId,
    gameLoaded,
    cvcObject,
    currentWordProgress,
  } from "./store.js";
  import GameLoader from "./GameLoader.svelte";
  import { gsap } from "gsap";
  import { ScrollToPlugin } from "gsap/ScrollToPlugin";
  import { onMount } from "svelte";

  gsap.registerPlugin(ScrollToPlugin);

  const version = "v0.3.2";

  let stageCards, handleNext, handlePrev;
  let words;
  let cvcs = Object.keys($cvcObject);

  const CARDS = {
    id: ["lvl_1", "lvl_2", "lvl_3", "lvl_4"],
    cards: ["card a", "card b", "card c", "card d"],
    currentId: 0,
  };

  onMount(() => {
    handleNext = function handleNext(div, obj) {
      console.log(div.scrollLeft);
      if (obj.currentId < obj.cards.length - 1) {
        obj.currentId += 1;
      } else {
        obj.currentId = 0;
      }
      gsap.to(stageCards, {
        duration: 0.5,
        // scrollTo: `#${obj.id[obj.currentId]}`,
        scrollTo: `${div.scrollLeft + 320}`,
      });
    };

    handlePrev = function handlePrev(div, obj) {
      if (obj.currentId >= 1) {
        obj.currentId -= 1;
      } else {
        obj.currentId = obj.cards.length - 1;
      }
      gsap.to(stageCards, {
        duration: 0.5,
        // scrollTo: `#${obj.id[obj.currentId]}`,
        scrollTo: `${div.scrollLeft - 320}`,
      });
    };
  });

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
    $gameLoaded = true;
    $gameLoaderWordId = 0; // reset word ID to 0
    $currentWordProgress = 0;
  }
</script>

<main class="full_grid">
  {#if $gameLoaded == true}
    <GameLoader GameWords={wordObjects} />
  {:else}
    <div id="level" class="auto rounded label">Player Level</div>
    <div id="points" class="auto rounded label">Player Points</div>

    <!-- swipable menu -->
    <ul bind:this={stageCards} id="stage_card" class="gallery">
      {#each CARDS.cards as card, index}
        <li id={CARDS.id[index]} class="auto rounded card">
          {card}
        </li>
      {/each}
    </ul>
    <div
      id="prev"
      class="auto arrow_btn"
      on:click={() => handlePrev(stageCards, CARDS)}
    >
      «
    </div>
    <div
      id="next"
      class="auto arrow_btn"
      on:click={() => handleNext(stageCards, CARDS)}
    >
      »
    </div>
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
  /* swipable menu */
  .gallery {
    display: grid;
    grid-template-columns: repeat(10, 80vw);
    grid-template-rows: 1fr;
    grid-column-gap: 1rem;
    grid-row-gap: 1rem;
    overflow: scroll;
    height: 50vh;
    scroll-snap-type: both mandatory;
  }

  li {
    scroll-snap-align: center;
    display: inline-block; /* remove list bullets*/
  }

  /* Hide scrollbar for Chrome, Safari and Opera */
  .gallery::-webkit-scrollbar {
    display: none;
  }

  /* Hide scrollbar for IE, Edge and Firefox */
  .gallery {
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
  }

  /* swipable menu END*/

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
