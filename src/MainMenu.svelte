<script>
  import {
    gameLoaderWordId,
    gameLoaded,
    cvcObject,
    currentWordProgress,
    gamePoints,
    gameStars,
    currentLevel,
    devMode,
    maxExp,
    triggerSave,
    timerEnd,
  } from "./store.js";
  import GameLoader from "./GameLoader.svelte";
  import { gsap } from "gsap";
  import { ScrollToPlugin } from "gsap/ScrollToPlugin";
  import { localData } from "./functions/localstorage.svelte";
  import Level from "./Level.svelte";
  import { animateCSS } from "./animateCSS.svelte";
  gsap.registerPlugin(ScrollToPlugin);

  const version = "v0.5.0";

  // DEV
  $gameLoaded = $devMode.gameLoaded ? true : false;

  // Load local game data
  let sessionStorage = localData;

  sessionStorage.load();
  $maxExp = sessionStorage.get("maxExp").maxExp;
  $cvcObject = sessionStorage.get("gameData").gameData;
  $gamePoints = sessionStorage.get("points");
  $gameStars = sessionStorage.get("stars");
  // TODO: #17 create function to update localStorage with new keys if not present
  $: $gamePoints && sessionStorage.set($gamePoints);
  $: $gameStars && sessionStorage.set($gameStars);
  $: $triggerSave && sessionStorage.set({ gameData: $cvcObject }),
    sessionStorage.save();

  let stageCards,
    handleNav,
    CARDS = [], //Create empty array to store DOM references
    stars,
    next,
    prev,
    play;
  let cvcs = Object.keys($cvcObject);

  const LVL = {
    id: 0,
  };

  handleNav = function (direction, div, lvl, options) {
    let width = CARDS[lvl.id].offsetWidth;
    let padding = (div.offsetWidth - width) / 2;

    // Calculate the current ID when swiping
    lvl.id = Math.round(div.scrollLeft / width);

    switch (direction) {
      case "prev":
        if (lvl.id > 0) {
          lvl.id -= 1;
        }
        break;
      case "next":
        if (lvl.id < Object.keys($cvcObject).length - 1) {
          lvl.id += 1;
        }
        break;
      case "play":
        div.classList.add("animate__animated", "animate__backOutRight");
        options.play.style.setProperty("--animate-duration", "0.5s");
        options.play.classList.add("animate__animated", "animate__bounceOut");
        options.stars.classList.add(
          "animate__animated",
          "animate__backOutLeft"
        );
        options.prev.classList.add("animate__animated", "animate__backOutLeft");
        options.next.classList.add(
          "animate__animated",
          "animate__backOutRight"
        );

        div.addEventListener("animationend", () => {
          $gameLoaded = true;
          $gameLoaderWordId = 0; // reset word ID to 0
          $currentWordProgress = 0;
        });
    }
    // PLAY SWIPE ANIMATION
    if (direction != "play") {
      gsap.to(stageCards, {
        duration: 0.5,
        scrollTo: {
          x: `#lvl_${lvl.id + 1}`,
          offsetX: padding,
        },
      });
    }
  };

  let wordObjects = [];

  cvcs.forEach((level) => {
    wordObjects.push(Object.values($cvcObject[level]));
  });

  function endGame() {
    $gameLoaded = false;
  }
  $: if ($timerEnd) {
    endGame();
  }
</script>

<main class="full_grid">
  {#if $gameLoaded == true}
    <GameLoader
      GameWords={wordObjects[LVL.id]}
      GameLevelId={LVL.id + 1}
      GameLevel={Object.keys($cvcObject)[LVL.id]}
    />
  {:else}
    <div class="clear" on:click={() => sessionStorage.clear()}>clear</div>
    <span id="ruler" />
    <div bind:this={stars} id="stars" class="auto rounded label">
      <img src="/assets/ui/star.png" alt="stars" />
      <span>{$gameStars.stars}</span>
    </div>

    <!-- swipable menu START-->
    <ul bind:this={stageCards} id="stage_card" class="gallery">
      {#each Object.keys($cvcObject) as id, index}
        <div class="level">
          LEVEL {index + 1}
        </div>
        <div id="lvl_{index + 1}" bind:this={CARDS[index]} class="_level">
          <Level {index} />
        </div>
      {/each}
    </ul>
    <!-- swipable menu END -->

    <div
      bind:this={prev}
      id="prev"
      class="auto arrow_btn unselectable"
      on:click|preventDefault={() => {
        handleNav("prev", stageCards, LVL);
        animateCSS(prev, "headShake");
      }}
    >
      «
    </div>
    <div
      bind:this={next}
      id="next"
      class="auto arrow_btn unselectable"
      on:click|preventDefault={() => {
        handleNav("next", stageCards, LVL);
        animateCSS(next, "headShake");
      }}
    >
      »
    </div>
    <div
      bind:this={play}
      id="play_btn"
      class="auto rounded button animate__animated animate__pulse animate__slow animate__infinite"
      on:click|preventDefault={() =>
        handleNav("play", stageCards, LVL, {
          play: play,
          stars: stars,
          prev: prev,
          next: next,
        })}
    >
      <span>play</span>
    </div>
  {/if}
</main>

<style>
  ._level {
    grid-row: 2;
  }
  .clear {
    grid-column-end: -1;
  }
  /* swipable menu */
  .gallery {
    display: grid;
    gap: 0 5vw;
    grid-template-columns: repeat(10, 80vw);
    grid-template-rows: 1fr 9fr;
    overflow: scroll;
    scroll-snap-type: both mandatory;
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
    background-color: var(--blue);
    font-family: var(--main-font);
  }

  .unselectable {
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }

  img {
    height: 20vw;
    width: 20vw;
    max-width: 3.5rem;
    max-height: 3.5rem;
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

  .button {
    cursor: pointer;
    background-color: var(--pink);
    z-index: 10;
  }

  .label {
    background-color: var(--white);
    z-index: 10;
  }

  .arrow_btn {
    color: var(--white);
    font-size: 3rem;
    cursor: default;
    z-index: 100;
  }

  .level {
    grid-row: 1;
    color: white;
    font-size: 2rem;
  }

  #play_btn {
    grid-row: 15/16;
    grid-column: 4/8;
    display: flex;
    justify-content: center;
    align-items: center;
    border: var(--border-width) solid var(--light-gray);
    font-size: 1.5rem;
    color: var(--white);
  }

  #stage_card {
    grid-row: 4/-4;
    grid-column: 1/-1;
  }

  #next,
  #prev {
    grid-row: 4/14;
    display: flex;
    align-content: space-around;
    justify-content: space-around;
  }

  #prev {
    grid-column: 1;
  }

  #next {
    grid-column: -2;
  }

  #stars {
    grid-row: 2/3;
    grid-column: 1/4;
    display: flex;
    align-items: center;
    font-size: 1.5rem;
    padding: 0 0 0 1.5rem;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    border: var(--border-width) solid var(--light-gray);
    border-left: 0;
  }

  #stars img {
    height: 100%;
    width: 6vh;
    height: 6vh;
    padding: 0.2rem;
  }

  #points {
    grid-row: 2/3;
    grid-column: 5/-2;
  }

  #level {
    grid-row: 3;
    grid-column: 1/-1;
  }
</style>
