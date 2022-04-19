<script>
  import {
    gameLoaderWordId,
    gameLoaded,
    cvcObject,
    gameWordLimit,
    exp,
    currentWordProgress,
    gamePoints,
    maxExp,
    bonustime,
    trigger,
    expObj,
  } from "./store.js";
  // import Expbar from "./Expbar.svelte";

  import { onMount, afterUpdate } from "svelte";
  import interact from "interactjs";
  import shuffle from "./functions";
  import { gsap } from "gsap";
  import { Draggable } from "gsap/Draggable";

  gsap.registerPlugin(Draggable);

  export let word;

  let gameboard;
  let upper = [],
    lower = [],
    droppables = []; // store references to DOM elements
  let pointsMultiplier = 1;
  var overlapThreshold = "40%";

  // TODO:  use GSAP transition instead; run function at the end of transition
  // setInterval(() => {
  //   if ($bonustime) {
  //     $expObj.value -= 5;
  //     if ($expObj.value <= 0) {
  //       $bonustime = false;
  //     }
  //   }
  // }, 500);

  // $: $expObj.value, console.log(`expObj: ${$expObj.value}`);

  // $: $bonustime && bonusTime($expObj);

  // $: gameStateExp, console.log("updated: ", gameStateExp);

  function bonusTime(obj) {
    console.log(obj, "BONUS TIME");
    gsap.to(obj, {
      value: 0,
      duration: 3.0,
      onComplete: function () {
        $bonustime = false;
        console.log("BONUS TIME FINISHED");
      },
    });
  }

  function onDrop(draggable, dropzone) {
    if (dropzone.id != draggable.id) {
      onIncorrectLetter(draggable);
      console.log(draggable.id, " dropped onto ", dropzone.id);
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
    if ($currentWordProgress == word.length) {
      $cvcObject[word].exp += 5;
    }
  }

  onMount(() => {
    // prevent text from being seletable on iOS
    gameboard.addEventListener("touchstart", function (event) {
      event.preventDefault();
    });
    gsap.registerPlugin(Draggable);

    upper.forEach((div) => {
      Draggable.create(div, {
        bounds: window,
        onDragEnd: function (e) {
          var i = droppables.length;
          while (--i > -1) {
            if (this.hitTest(droppables[i], overlapThreshold)) {
              onDrop(this.target, droppables[i]);
            }
          }
        },
      });
    });

    lower.forEach((div) => {
      Draggable.create(div, {
        bounds: window,
        onDragEnd: function (e) {
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
    interact(".draggable").unset();
    $currentWordProgress = 0;
    switch (event) {
      case "next":
        $gameLoaderWordId += 1;
        break;
      case "back":
        $gameLoaded = false;
        break;
    }
  }

  // let stars = ["s", "s", "s"],
  //   blank = [];

  let wordUpper = [],
    wordLower = [];
  const position = { x: 0, y: 0 };

  const width = 300;
  const height = 300;

  let wordLimit = Math.ceil(word.length / 2);

  for (let i of word) {
    let r = Math.floor(Math.random() * 2);
    r == 0
      ? wordUpper.length <= wordLimit
        ? wordUpper.push(i)
        : wordLower.push(i)
      : wordLower.length <= wordLimit
      ? wordLower.push(i)
      : wordUpper.push(i);
  }

  const upperEm = { limit: 12 };
  const lowerEm = { limit: 12 };

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
    $expObj.value += 10;
    $currentWordProgress += 1;
    if ($bonustime) {
      $gamePoints += 20;
    } else {
      $gamePoints += 10;
      // $gameState.exp += 10;
    }
    // if ($gameState.exp >= $maxExp) {
    //   $bonustime = true;
    // }
    console.log($expObj.value);
  };

  const onIncorrectLetter = function (element) {
    gsap.to(element, { y: 0 });
    gsap.to(element.children[0], { transform: `rotate(${getRotation()}deg)` });
    if ($expObj.value >= 10) {
      if (!$bonustime) {
        $trigger += 1;
        $expObj.value -= 10;
      }
    }
  };
  afterUpdate(() => {
    if ($expObj.value <= 0) {
      $bonustime = false;
      // $expObj.value = 0;
    }
  });
</script>

<div id="matching_game">
  <div class="transition dropped" style="display: none">
    Preloaded CSS styles
  </div>

  <div id="gameboard" bind:this={gameboard}>
    <container id="container" class="drop-container">
      {#each word as letter, index}
        <div
          id={letter}
          bind:this={droppables[index]}
          class="tile dropzone can-drop"
        >
          {letter}
        </div>
      {/each}
    </container>

    <container id="container" class="drag-container">
      {#each shuffle(wordUpper) as letter, index}
        <div
          bind:this={upper[index]}
          id={letter}
          class="tile draggable upper hidden"
          style="margin-right:{getLimit(upperEm)}rem;"
        >
          {letter}
          <div class="rotation" style="transform:rotate({getRotation()}deg)">
            {letter}
          </div>
        </div>
      {/each}
    </container>

    <container id="container" class="drag-container">
      {#each shuffle(wordLower) as letter, index}
        <div
          bind:this={lower[index]}
          id={letter}
          class="tile draggable lower hidden"
          style="margin-right:{getLimit(upperEm)}rem;"
        >
          {letter}
          <div class="rotation" style="transform:rotate({getRotation()}deg)">
            {letter}
          </div>
        </div>
      {/each}
    </container>
  </div>
  {#if $currentWordProgress == word.length}
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

  .transition {
    transition: transform 0.3s ease-out, color 0.3s ease-out;
    color: #f4d042 !important;
    opacity: 1;
    pointer-events: none;
    touch-action: none;
  }

  .dropped {
    /* color: var(--fg-color) !important; */
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
    background-image: url("/assets/bg-tile-blue-stars.png");
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
    color: #ff61aa;
    cursor: pointer;
    background-color: white;
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
    font-size: var(--large);
    padding: 0.02em;
    margin: 0rem;
    touch-action: none;
    user-select: none;
  }

  .rotation {
    width: 1em;
    overflow: hidden;
    position: absolute;
    transform-origin: center;
    font-family: var(--main-font);
    color: var(--blue);
    -webkit-text-stroke: 4px white;
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
    /* background-color: #17c3b2; */
    font-family: var(--main-font);
    -webkit-text-stroke: 4px white;
    color: hsla(215, 55%, 21%, 0.3);
    z-index: 0;
  }
</style>
