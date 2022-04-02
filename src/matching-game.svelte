<script>
  import {
    gameLoaderWordId,
    gameLoaded,
    cvcObject,
    gameWordLimit,
    exp,
    currentWordProgress,
  } from "./store.js";
  import { onMount } from "svelte";
  import interact from "interactjs";
  import shuffle from "./functions";
  import { gsap } from "gsap";
  import { Draggable } from "gsap/draggable";

  export let word;
  let gameboard;
  let draggable;

  let upper = [],
    lower = [],
    droppables = []; // store references to DOM elements

  var overlapThreshold = "40%";

  function onDrop(draggable, dropzone) {
    if (dropzone.id != draggable.id) {
      if ($exp > 10) {
        $exp -= 10;
      }
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
      rotatedElement.classList.add("originalPosition");

      draggable.style.pointerEvents = "none";
      draggable.style.zIndex = "5";
      draggable.classList.add("transition");
      draggable.classList.remove("draggable");

      dropzone.classList.remove("can-drop");
      dropzone.classList.add("dropped");

      $currentWordProgress += 1;
      $exp += 5;
      console.log(`${$currentWordProgress}:${$exp}`);
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
</script>

<main>
  <!-- <div>{version}</div> -->
  <div
    class="transition drop-target originalPosition dropped nonDraggable"
    style="display: none"
  >
    Preloaded CSS styles
  </div>

  <!-- <h1>{title}!</h1> -->
  <div id="exp">
    <div id="exp_bar_bg" />
    <img src="/assets/ui/exp_bolt.png" alt="EXP" />
    <div id="exp_bar_fill" style="--exp: {`${$exp}vw`}" />
    <div id="exp_bar" />
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
          class="tile draggable upper translate"
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
          class="tile draggable lower translate"
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
</main>

<svelte:head>
  <style>
    :root {
      --bg-color: hsl(0, 83%, 73%); /* var(--bg-color)  */
      --dropped-color: hsl(0, 60%, 25%);
      --main-color: #fce38a; /* var(--main-color)  */
      --sub-color: #f38181; /* var(--sub-color)  */
      --fg-color: black; /* #95e1d3; /* var(--fg-color)  */
    }
  </style>
</svelte:head>

<style>
  * {
    box-sizing: border-box;
  }
  #exp {
    display: grid;
    grid-template-columns: 1fr;
    /* position: relative; */
    grid-column: 2/-2;
    grid-row: 1/3;
  }

  #exp img {
    grid-column: 1/2;
    grid-row: 1/2;
    width: 100%;
    height: auto;
    z-index: 1;
  }

  #exp_bar_fill {
    grid-column: 1/2;
    grid-row: 1/2;
    position: relative;
    top: 4vw;
    left: 15vw;
    background-color: #ff61aa;
    height: 9vw;
    border-radius: 2.5vw;
    width: var(--exp);
    max-width: 40vw;
    min-width: 4.5vw;
    transition: width 1s ease-out;
    z-index: 10;
  }

  #exp_bar {
    grid-column: 1/2;
    grid-row: 1/2;
    position: relative;
    top: 4vw;
    left: 15vw;
    background-color: #d5d5d5;
    height: 9vw;
    border-radius: 2.5vw;
    width: 40vw;
    z-index: 5;
  }

  #exp_bar_bg {
    grid-column: 1/2;
    grid-row: 1/2;
    position: relative;
    top: 3vw;
    left: 5vw;
    background-color: #ffffff;
    height: 9vw;
    border-radius: 2.5vw;
    width: 51vw;
    z-index: 0;
    border: 5.5vw solid white;
  }

  .originalPosition {
    color: var(--fg-color) !important;
    transition: transform 0.3s ease-out;
  }

  .transition {
    transition: transform 0.3s ease-out;
    opacity: 1;
    pointer-events: none;
    touch-action: none;
  }

  .dropped {
    /* color: var(--fg-color) !important; */
    opacity: 0;
    transition: opacity 0.3s ease-out;
  }

  main {
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
    /* width: 300px;
    height: 300px; */
    margin: 0 auto;
    /* border: 1px solid #227c9d; */
  }

  .nextButton {
    grid-column: 2/5;
    grid-row: 5;
    position: relative;
    /* top: -2em; */
    align-items: center;
    justify-content: center;
    font-family: "Londrina Solid";
    font-size: 2em;
    color: var(--dropped-color);
    cursor: pointer;
  }

  @media (min-width: 640px) {
    main {
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

  .drag-container {
    justify-content: center;
  }

  .tile {
    width: fit-content;

    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-family: "Londrina Outline";
    font-size: 7em;
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
    font-family: "Londrina Solid";
    color: var(--main-color);
  }

  .upper {
    top: -1em;
  }

  .lower {
    top: 1em;
  }

  .translate {
    color: rgba(255, 255, 255, 0);
    z-index: 10;
  }

  .dropzone {
    /* background-color: #17c3b2; */
    font-family: "Londrina Outline";
    color: var(--fg-color);
    z-index: 0;
  }
</style>
