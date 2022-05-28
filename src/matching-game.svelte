<script>
  import {
    gameLoaderWordId,
    gameLoaded,
    cvcObject,
    gameWordLimit,
    currentWordProgress,
    gamePoints,
    expStore,
    triggerLetter,
    timerEnd,
    wordExp,
    combo,
    comboTimer,
    gameStars,
    triggerSave,
  } from "./store.js";

  import { onMount, afterUpdate } from "svelte";
  import shuffle from "./functions";
  import { gsap } from "gsap";
  import { Draggable } from "gsap/Draggable";

  gsap.registerPlugin(Draggable);

  export let currentWord;
  export let GameLevelId;
  export let GameLevel;

  // SCORING:
  let multiplier = function (value) {
    switch (GameLevelId) {
      case 1:
        return value * 8;
      case 2:
        return value * 6;
      case 3:
        return value * 4;
      case 4:
        return value * 3;
      case 5:
        return value * 2;
      default:
        return value * 1;
    }
  };

  let gameboard;
  let dropableLetter = [],
    droppables = [],
    animatedLetter = []; // store references to DOM elements
  var overlapThreshold = "50%";

  function onDrop(draggable, dropzone) {
    if (dropzone.id != draggable.id) {
      onIncorrectLetter(draggable);
    } else {
      // Get CSS translate values
      const computedStyle = window.getComputedStyle(draggable),
        matrix =
          computedStyle.transform ||
          computedStyle.webkitTransform ||
          computedStyle.mozTransform,
        matrixValues = matrix.match(/matrix.*\((.+)\)/)[1].split(", ");

      // Extract x and y values from the 2d matrix
      let pos = {
        x: parseInt(matrixValues[4]),
        y: parseInt(matrixValues[5]),
      };

      let offset = {
        x:
          dropzone.getBoundingClientRect().x -
          draggable.getBoundingClientRect().x,
        y:
          dropzone.getBoundingClientRect().y -
          draggable.getBoundingClientRect().y,
      };

      // Move element to dropzone
      draggable.style.transform = `translate(
        ${pos.x + offset.x}px, ${pos.y + offset.y}px)`;

      const rotatedElement = draggable.children[0];

      rotatedElement.style.zIndex = "5";
      rotatedElement.style.transform = "rotate(0deg)";
      rotatedElement.classList.add("transition");

      draggable.style.pointerEvents = "none";
      draggable.style.zIndex = "5";
      draggable.classList.add("transition");
      draggable.classList.remove("draggable");

      dropzone.classList.remove("can-drop");
      dropzone.classList.add("dropped");

      onCorrectLetter();
    }
  }

  onMount(() => {
    // prevent text from being seletable on iOS
    gameboard.addEventListener("touchstart", function (event) {
      event.preventDefault();
    });
    gsap.registerPlugin(Draggable);

    dropableLetter.forEach((div) => {
      Draggable.create(div, {
        bounds: window,
        // onDragStart: function (e) {
        //   console.log(e.path[0]);
        //   e.path[0].classList.add("animate__heartBeat");
        // },
        onDragEnd: function (e) {
          // e.path[0].classList.remove("animate__heartBeat");
          var i = droppables.length;
          while (--i > -1) {
            if (this.hitTest(droppables[i], overlapThreshold)) {
              onDrop(this.target, droppables[i]);
            }
          }
        },
      });
    });
  });

  function handleClick(event) {
    $currentWordProgress = 0;
    switch (event) {
      case "next":
        $gameLoaderWordId += 1;
        $triggerSave += 1;
        break;
      case "back":
        $gameLoaded = false;
        break;
    }
  }

  let wordUpper = [],
    wordLower = [];

  console.log(currentWord);
  let wordLimit = Math.ceil(currentWord.length / 2);

  for (let i of currentWord) {
    let r = Math.floor(Math.random() * 2);
    r == 0
      ? wordUpper.length <= wordLimit
        ? wordUpper.push(i)
        : wordLower.push(i)
      : wordLower.length <= wordLimit
      ? wordLower.push(i)
      : wordUpper.push(i);
  }

  let randomIndex = Math.floor(Math.random() * (currentWord.length / 2));

  const yPos = function (index) {
    return index <= randomIndex ? "upper" : "lower";
  };
  const margin = { limit: 12 };

  const getLimit = function (obj) {
    let em = Math.floor(Math.random() * obj.limit) + 2;
    obj.limit -= em;
    if (em < 2) em = 2;
    return em;
  };

  const getRotation = function () {
    let rot = Math.floor(Math.random() * 60) - 30;
    return rot;
  };

  const onCorrectLetter = function () {
    $expStore.correct = true;
    $triggerLetter += 1;
    $cvcObject[GameLevel][currentWord].exp += multiplier($wordExp.increment);
    $combo += 1;
    $comboTimer = 0;
    $currentWordProgress += 1;
    $gamePoints.points += 10;
    if ($expStore.value < $expStore.max) {
      $expStore.value += $expStore.increment;
    }
    if (
      $cvcObject[GameLevel][currentWord].exp >= $wordExp.max &&
      !$cvcObject[GameLevel][currentWord].starred
    ) {
      $gameStars.stars += 1;
      $cvcObject[GameLevel][currentWord].starred = true;
    }
    if ($currentWordProgress == currentWord.length) {
      gameboard.classList.add("animate__animated", "animate__tada");
      gameboard.addEventListener("animationend", () => {
        handleClick("next");
      });
    }
  };

  const onIncorrectLetter = function (element) {
    $expStore.correct = false;
    gsap.to(element, { y: 0 });
    gsap.to(element.children[0], { transform: `rotate(${getRotation()}deg)` });
    if ($expStore.value >= 10) {
      $triggerLetter += 1;
    }
    $expStore.value = $expStore.min;
    $combo = 0;
  };
  afterUpdate(() => {
    if ($timerEnd) {
      dropableLetter.forEach((element) => {
        let draggable = Draggable.get(element);
        draggable.disable();
      });
    }
  });
</script>

<div id="matching_game">
  <div class="transition dropped" style="display: none">
    Preloaded CSS styles
  </div>

  <div id="gameboard" bind:this={gameboard}>
    <container id="container" class="drop-container">
      {#each currentWord as letter, index}
        <div
          id={letter}
          bind:this={droppables[index]}
          class="tile dropzone can-drop animate__bounceIn animate__delay-5s"
        >
          {letter}
        </div>
      {/each}
    </container>

    <container id="container" class="drag-container">
      {#each shuffle(currentWord) as letter, index}
        <div
          bind:this={dropableLetter[index]}
          id={letter}
          class="tile draggable {yPos(index)} hidden"
          style="margin-right:{getLimit(margin)}rem;"
        >
          {letter}

          <div class="rotation " style="transform:rotate({getRotation()}deg)">
            <div class="animatedLetter" bind:this={animatedLetter[index]}>
              {letter}
            </div>
          </div>
        </div>
      {/each}
    </container>
  </div>
  {#if $currentWordProgress == currentWord.length}
    {#if $gameLoaderWordId < $gameWordLimit - 1}
      <div class="nextButton" on:click={() => handleClick("next")}>next</div>
    {:else}
      <div class="nextButton" on:click={() => handleClick("back")}>back</div>
    {/if}
  {/if}
</div>

<style>
  * {
    box-sizing: border-box;
  }

  /* COLORS */
  .transition {
    color: var(--yellow) !important;
  }

  .nextButton {
    color: var(--pink);
    background-color: var(--white);
  }

  .rotation {
    color: var(--white);
    -webkit-text-stroke: 4px var(--outline);
  }

  .dropzone {
    -webkit-text-stroke: 4px white;
    color: var(--transparent-blue);
  }

  .transition {
    transition: transform 0.3s ease-out, color 0.3s ease-out;
    opacity: 1;
    pointer-events: none;
    touch-action: none;
  }

  .dropped {
    opacity: 0;
    transition: opacity 0.3s ease-out;
  }

  #matching_game {
    display: grid;
    text-align: center;
    grid-template-columns: repeat(12, 1fr);
    grid-template-rows: repeat(12, 1fr);
    width: 100vw;
    height: 100vh;
    /* background-image: url("/assets/bg-tile-blue-stars.png"); */
  }

  #gameboard {
    grid-column: 1/-1;
    grid-row: 4/-4;
    position: relative;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin: 0 auto;
  }

  .nextButton {
    grid-column: 5/9;
    grid-row: 10;
    position: relative;
    /* top: -2em; */
    align-items: center;
    justify-content: center;
    font-family: var(--main-font);
    font-size: 2em;
    cursor: pointer;
    border-radius: 3em;
    width: 100%;
    height: 1.4em;
  }

  @media (min-width: 640px) {
    #matching_game {
      max-width: none;
    }
  }

  .drag-container,
  .drop-container {
    position: absolute;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }

  .tile {
    width: fit-content;

    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-family: var(--main-font);
    font-size: 10rem;
    padding: 0.02em;
    margin: 0rem;
    touch-action: none;
    user-select: none;
  }

  .rotation {
    width: 1em;
    /* overflow: hidden; */
    position: absolute;
    transform-origin: center;
    font-family: var(--main-font);
  }

  .upper {
    top: -1em;
  }

  .lower {
    top: 1em;
  }

  .hidden {
    color: rgba(255, 255, 255, 0);
    z-index: 10;
  }

  .dropzone {
    font-family: var(--main-font);
    z-index: 0;
  }
</style>
