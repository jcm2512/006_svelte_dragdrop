<script>
  import {
    gameLoaderWordId,
    gameLoaded,
    cvcObject,
    currentWordProgress,
    gamePoints,
    eventTrigger,
  } from "./store.js";
  import GameLoader from "./GameLoader.svelte";
  import { gsap } from "gsap";
  import { ScrollToPlugin } from "gsap/ScrollToPlugin";
  import { onMount } from "svelte";
  import { localData } from "./functions/localstorage.svelte";

  gsap.registerPlugin(ScrollToPlugin);

  const version = "v0.3.3";

  // DEV
  $gameLoaded = false;

  // Load local game data
  let sessionStorage = localData;
  sessionStorage.load();
  $cvcObject = Object.values(sessionStorage.get("gameData"))[0];
  $gamePoints = sessionStorage.get("points");
  $: $gamePoints && sessionStorage.set($gamePoints);
  $: $eventTrigger.save && sessionStorage.set({ gameData: $cvcObject }),
    sessionStorage.save();

  let stageCards,
    handleNav,
    cards = []; //Create empty array to store DOM references
  let cvcs = Object.keys($cvcObject);

  const CARDS_OBJ = {
    cards: ["LEVEL 1", "LEVEL 2", "LEVEL 3", "LEVEL 4"],
    currentId: 0,
  };

  onMount(() => {
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
          x: `#lvl_${obj.currentId}`,
          offsetX: padding,
        },

        onComplete: function () {
          // console.log(obj.currentId);
        },
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

  let wordObjects = [];

  cvcs.forEach((value) => {
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
    <span id="ruler" />
    <div id="level" class="auto rounded label">
      <span class="star">&#9733</span>
    </div>

    <!-- swipable menu START-->
    <ul bind:this={stageCards} id="stage_card" class="gallery">
      {#each CARDS_OBJ.cards as card, index}
        <div id="lvl_{index}" bind:this={cards[index]} class="card_main">
          {card}
          <li class="auto rounded card container">
            {#if index == 0}
              {#each cvcs as word}
                {#if $cvcObject[word].status == "unlocked"}
                  <img src={$cvcObject[word].img} alt={word} />
                {:else}
                  <span class="img_Container">
                    <img
                      class="image overlay"
                      src={$cvcObject[word].img}
                      alt={word}
                    />
                    <img
                      class="locked overlay"
                      src="/assets/ui/locked.png"
                      alt="locked"
                    />
                  </span>
                {/if}
              {/each}
            {/if}
          </li>
        </div>
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
  .img_Container {
    display: grid;
  }

  .overlay {
    grid-column: 1/-1;
    grid-row: 1/-1;
  }
  /* swipable menu */
  .gallery {
    display: grid;
    grid-template-columns: repeat(10, 80vw);
    grid-template-rows: 1fr;
    overflow: scroll;
    height: 65vh;
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

  .image {
    filter: brightness(0.1) opacity(0.35);
  }

  .locked {
    z-index: 100;
  }

  .container {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    /* justify-content: space-evenly; */
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
    cursor: default;
    z-index: 100;
  }

  .card_main {
    padding: 1rem;
    color: white;
    font-size: 2rem;
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
    color: var(--dark-blue);
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
