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

  let stageCards, handleNav;
  let words;
  let cvcs = Object.keys($cvcObject);

  const CARDS = {
    id: ["lvl_1", "lvl_2", "lvl_3", "lvl_4"],
    cards: ["LEVEL 1", "LEVEL 2", "LEVEL 3", "LEVEL 4"],
    currentId: 0,
  };

  onMount(() => {
    handleNav = function (direction, div, obj) {
      let offset = div.offsetWidth * 0.8;
      let limit = offset * (obj.cards.length - 1);

      if (direction == "prev") {
        offset *= -1;
        if (div.scrollLeft == 0) {
          offset = 0;
        }
      } else {
        if (div.scrollLeft >= limit) {
          offset = 0;
        }
      }

      gsap.to(stageCards, {
        duration: 0.5,
        scrollTo: `${div.scrollLeft + offset}`,
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
    <div id="level" class="auto rounded label">
      <span class="star">&#9733</span>
    </div>
    <!-- <div id="points" class="auto rounded label">Player Points</div> -->

    <!-- swipable menu -->
    <ul bind:this={stageCards} id="stage_card" class="gallery">
      {#each CARDS.cards as card, index}
        <div class="card_main">
          <li id={CARDS.id[index]} class="auto rounded card">
            {card}
          </li>
        </div>
      {/each}
    </ul>

    <div
      id="prev"
      class="auto arrow_btn"
      on:click={() => handleNav("prev", stageCards, CARDS)}
    >
      «
    </div>
    <div
      id="next"
      class="auto arrow_btn"
      on:click={() => handleNav("next", stageCards, CARDS)}
    >
      »
    </div>
    <div
      id="play_btn"
      class="auto rounded button"
      on:click={() => handlePlay()}
    >
      <span>play</span>
    </div>
  {/if}
</main>

<style>
  /* swipable menu */
  .gallery {
    display: grid;
    grid-template-columns: repeat(10, 80vw);
    grid-template-rows: 1fr;
    /* grid-column-gap: 1rem;
    grid-row-gap: 1rem; */
    overflow: scroll;
    height: 50vh;
    scroll-snap-type: both mandatory;
  }

  li {
    scroll-snap-align: center;
    display: inline-block; /* remove list bullets*/
    font-size: 2rem;
    color: white;
  }

  ul {
    list-style-type: disc;
    margin-block-start: 0em;
    margin-block-end: 0em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    padding-inline-start: 10vw;
    padding-inline-end: 10vw;
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
    font-family: var(--main-font);
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
    /* padding: 0.5em; */
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

  .card_main {
    padding: 1rem;
  }

  #play_btn {
    grid-row: 15/16;
    grid-column: 4/8;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  #play_btn span {
    font-size: 1.5rem;
    color: var(--blue);
  }
  #stage_card {
    grid-row: 4/-4;
    grid-column: 1/-1;
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
    display: flex;
    justify-content: center;
    align-items: center;
  }

  #level .star {
    color: orange;
    font-size: 2rem;
  }

  #points {
    grid-row: 2/3;
    grid-column: 5/-2;
  }
</style>
