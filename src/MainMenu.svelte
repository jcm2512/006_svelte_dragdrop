<script>
  import {
    gameLoaderWordId,
    gameLoaded,
    cvcObject,
    currentWordProgress,
    gamePoints,
    eventTrigger,
    gameStars,
  } from "./store.js";
  import GameLoader from "./GameLoader.svelte";
  import { gsap } from "gsap";
  import { ScrollToPlugin } from "gsap/ScrollToPlugin";
  import { localData } from "./functions/localstorage.svelte";
  import Level from "./Level.svelte";
  gsap.registerPlugin(ScrollToPlugin);

  const version = "v0.4.2";

  // DEV
  $gameLoaded = false;

  // Load local game data
  let sessionStorage = localData;

  sessionStorage.load();
  $cvcObject = sessionStorage.get("gameData").gameData;
  $gamePoints = sessionStorage.get("points");
  $gameStars = sessionStorage.get("stars");
  // TODO: #17 create function to update localStorage with new keys if not present
  $: $gamePoints && sessionStorage.set($gamePoints);
  $: $gameStars && sessionStorage.set($gameStars);
  $: $eventTrigger.save && sessionStorage.set({ gameData: $cvcObject }),
    sessionStorage.save();

  let stageCards,
    handleNav,
    cards = [], //Create empty array to store DOM references
    star;
  let cvcs = Object.keys($cvcObject);

  const CARDS_OBJ = {
    cards: [],
    currentId: 0,
  };

  for (let i = 1; i <= Object.values(sessionStorage.get("maxLevel")); i++) {
    CARDS_OBJ.cards.push(`LEVEL ${i}`);
  }

  handleNav = function (direction, div, obj) {
    let width = cards[obj.currentId].offsetWidth;
    let padding = (div.offsetWidth - width) / 2;

    // Calculate the current ID when swiping
    obj.currentId = Math.round(div.scrollLeft / width);

    switch (direction) {
      case "prev":
        if (obj.currentId > 0) {
          obj.currentId -= 1;
        }
        break;
      case "next":
        if (obj.currentId < obj.cards.length - 1) {
          obj.currentId += 1;
        }
        break;
    }

    gsap.to(stageCards, {
      duration: 0.5,
      scrollTo: {
        x: `#lvl_${obj.currentId + 1}`,
        offsetX: padding,
      },
    });
  };

  const swipeConfig = {
    autoplay: false,
    delay: 2000,
    showIndicators: true,
    transitionDuration: 1000,
    defaultIndex: 0,
  };

  let wordObjects = [];

  cvcs.forEach((level) => {
    wordObjects.push(Object.values($cvcObject[level]));
  });

  function handlePlay() {
    $gameLoaded = true;
    $gameLoaderWordId = 0; // reset word ID to 0
    $currentWordProgress = 0;
  }
</script>

<main class="full_grid">
  {#if $gameLoaded == true}
    <GameLoader
      GameWords={wordObjects[CARDS_OBJ.currentId]}
      GameLevelId={CARDS_OBJ.currentId + 1}
      GameLevel={Object.keys($cvcObject)[CARDS_OBJ.currentId]}
    />
  {:else}
    <div class="clear" on:click={() => sessionStorage.clear()}>clear</div>
    <span id="ruler" />
    <div id="level" class="auto rounded label">
      <img bind:this={star} src="/assets/ui/star.png" alt="stars" />
      <span>{$gameStars.stars}</span>
    </div>

    <!-- swipable menu START-->
    <ul bind:this={stageCards} id="stage_card" class="gallery">
      {#each CARDS_OBJ.cards as card, index}
        <div id="lvl_{index + 1}" bind:this={cards[index]} class="level">
          {card}
        </div>
        <div id="_Level"><Level {index} /></div>
      {/each}
    </ul>
    <!-- swipable menu WND -->

    <div
      id="prev"
      class="auto arrow_btn unselectable"
      on:click|preventDefault={() => handleNav("prev", stageCards, CARDS_OBJ)}
    >
      «
    </div>
    <div
      id="next"
      class="auto arrow_btn unselectable"
      on:click|preventDefault={() => handleNav("next", stageCards, CARDS_OBJ)}
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
  #_Level {
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
    background-color: var(--yellow);
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
    border: 0.25rem solid var(--light-gray);
  }

  #play_btn span {
    font-size: 1.5rem;
    color: var(--outline);
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
    grid-column: 1/4;
    display: flex;
    align-items: center;
    font-size: 1.5rem;
    padding: 0 0 0 1.5rem;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    border: 0.25rem solid var(--light-gray);
    border-left: 0;
  }

  #level img {
    height: 100%;
    width: auto;
    padding: 0.2rem;
  }

  #points {
    grid-row: 2/3;
    grid-column: 5/-2;
  }
</style>
