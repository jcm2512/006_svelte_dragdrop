<script>
  import {
    gameLoaderWordId,
    gameLoaded,
    cvcObject,
    gameWordLimit,
    exp,
  } from "./store.js";
  import { onMount } from "svelte";
  import interact from "interactjs";
  import shuffle from "./functions";

  export let word;
  export let gameboard;

  function handleClick(event) {
    interact(".draggable").unset();
    switch (event) {
      case "next":
        gameLoaderWordId.update((value) => value + 1);
        break;
      case "back":
        gameLoaded.update((value) => !value); // set to false
        break;
    }
  }

  function destroy() {
    console.log("complete", complete, $exp);
  }

  // function handleClickNext() {
  //   interact(".draggable").unset();
  //   gameLoaderWordId.update((value) => value + 1);
  // }

  // function handleClickBack() {
  //   interact(".draggable").unset();
  //   gameLoaded.update((value) => !value); // set to false
  // }

  let complete = word.length;
  let stars = ["s", "s", "s"],
    blank = [];

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

  onMount(() => {
    // prevent text from being seletable on iOS
    gameboard.addEventListener("touchstart", function (event) {
      event.preventDefault();
    });
  });

  // target elements with the "draggable" class
  interact(".draggable").draggable({
    inertia: false,
    onmove: dragMoveListener,
    onstart: dragStartListener,
    onend: dragEndListener,
  });

  function dragEndListener(event) {
    const draggable = event.target;
    // revertPosition(object);
  }

  function dragStartListener(event) {
    const draggable = event.target;

    // store the initial position attributes
    draggable.setAttribute("start-x", draggable.getAttribute("x") || 0);
    draggable.setAttribute("start-y", draggable.getAttribute("y") || 0);
  }

  function dragMoveListener(event) {
    const draggable = event.target,
      // get the updated dragged position
      x = (parseFloat(draggable.getAttribute("x")) || 0) + event.dx,
      y = (parseFloat(draggable.getAttribute("y")) || 0) + event.dy;

    // translate the element
    draggable.style.transform = `translate(${x}px, ${y}px)`;

    // update the position attributes
    draggable.setAttribute("x", x);
    draggable.setAttribute("y", y);
  }

  // enable draggables to be dropped into this
  let letterDrop = interact(".dropzone");
  let score = 0;

  letterDrop.dropzone({
    overlap: 0.3,

    // listen for drop related events:
    ondropactivate: function (event) {
      const dropzone = event.target,
        draggable = event.relatedTarget;
      // add active target dropzone feedback
      dropzone.classList.add("drop-active");
    },
    ondragenter: function (event) {
      const dropzone = event.target,
        draggable = event.relatedTarget;
      // feeback the posibility of a drop
      dropzone.classList.add("drop-target");
      draggable.classList.add("can-drop");
    },
    ondragleave: function (event) {
      const dropzone = event.target,
        draggable = event.relatedTarget;
      // remove the feedback style
      dropzone.classList.remove("drop-target");
      draggable.classList.remove("can-drop");
    },
    ondrop: function (event) {
      const dropzone = event.target,
        draggable = event.relatedTarget;

      // If target is invalid, reduce score
      if (dropzone.id != draggable.id) {
        console.log("mistake", complete, $exp);
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

        complete -= 1;
        $exp += 5;
        console.log("succes", complete, $exp);
      }

      if (complete == 0) {
        destroy();
        $cvcObject[word].exp += 25;
      }
    },
    ondropdeactivate: function (event) {
      const dropzone = event.target,
        draggable = event.relatedTarget;
      // remove active dropzone feedback
      dropzone.classList.remove("drop-active");
      dropzone.classList.remove("drop-target");
    },
  });

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
      {#each word as letter}
        <div id={letter} class="tile dropzone can-drop">
          {letter}
        </div>
      {/each}
    </container>

    <container id="container" class="drag-container">
      {#each shuffle(wordUpper) as letter}
        <div
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
      {#each shuffle(wordLower) as letter}
        <div
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
  {#if complete < 1}
    {#if $gameLoaderWordId < $gameWordLimit - 1}
      <div class="nextButton" on:click={() => handleClick("next")}>next</div>
    {:else}
      <div class="nextButton" on:click={() => handleClick("back")}>back</div>
    {/if}
    <div class="stars">
      {#each stars as index}
        <i class="fa-solid fa-star fa-fw" />
      {/each}
      {#each blank as index}
        <i class="fa-regular fa-star fa-fw" />
      {/each}
    </div>
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
    /* transform: translateY(1rem); */
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
    transition: width 0.5s ease;
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

  .stars {
    grid-column: 1/-1;
    position: relative;
    /* top: -4em; */
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1bem;
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
