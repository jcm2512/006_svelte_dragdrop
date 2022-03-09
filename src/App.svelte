<script>
  //TODO #5 fix letter overhang @jcm2512

  import interact from "interactjs";
  import shuffle from "./functions";
  import { writable } from "svelte/store";

  export let words;

  const version = "v0.1.3";
  const storedPrevious = localStorage.getItem("HelloHippo");

  const wordSet = words.filter((elem) => elem != storedPrevious),
    word = wordSet[Math.floor(Math.random() * (words.length - 1))];

  export const previous = writable(storedPrevious);
  previous.subscribe((value) => {
    localStorage.setItem("HelloHippo", word);
  });

  let complete = word.length;

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

  // target elements with the "draggable" class
  interact(".draggable").draggable({
    inertia: false,
    onmove: dragMoveListener,
    onstart: dragStartListener,
    onend: dragEndListener,
  });

  function dragEndListener(event) {
    const object = event.target;
    // revertPosition(object);
  }

  function dragStartListener(event) {
    const object = event.target;

    // store the initial position attributes
    object.setAttribute("start-x", object.getAttribute("x") || 0);
    object.setAttribute("start-y", object.getAttribute("y") || 0);
  }

  function dragMoveListener(event) {
    const target = event.target,
      // get the updated dragged position
      x = (parseFloat(target.getAttribute("x")) || 0) + event.dx,
      y = (parseFloat(target.getAttribute("y")) || 0) + event.dy;

    // translate the element
    target.style.transform = `translate(${x}px, ${y}px)`;

    // update the position attributes
    target.setAttribute("x", x);
    target.setAttribute("y", y);
  }

  // enable draggables to be dropped into this
  let letterDrop = interact(".dropzone");

  letterDrop.dropzone({
    overlap: 0.3,

    // listen for drop related events:
    ondropactivate: function (event) {
      // add active target dropzone feedback
      event.target.classList.add("drop-active");
    },
    ondragenter: function (event) {
      // feeback the posibility of a drop
      event.target.classList.add("drop-target");
      event.relatedTarget.classList.add("can-drop");
    },
    ondragleave: function (event) {
      // remove the feedback style
      event.target.classList.remove("drop-target");
      event.relatedTarget.classList.remove("can-drop");
    },
    ondrop: function (event) {
      // Get CSS translate values
      const computedStyle = window.getComputedStyle(event.relatedTarget);
      const matrix =
        computedStyle.transform ||
        computedStyle.webkitTransform ||
        computedStyle.mozTransform;
      const matrixValues = matrix.match(/matrix.*\((.+)\)/)[1].split(", ");

      // Extract x and y values from the 2d matrix
      let currentTransform = {
        x: parseInt(matrixValues[4]),
        y: parseInt(matrixValues[5]),
      };

      let xOffset =
        event.target.getBoundingClientRect().x -
        event.relatedTarget.getBoundingClientRect().x;
      let yOffset =
        event.target.getBoundingClientRect().y -
        event.relatedTarget.getBoundingClientRect().y;

      // Move element to dropzone
      event.relatedTarget.style.transform = `translate(
		${currentTransform.x + xOffset}px, 
		${currentTransform.y + yOffset}px)`;

      event.relatedTarget.children[0].style.zIndex = "5";
      event.relatedTarget.children[0].style.transform = "rotate(0deg)";
      event.relatedTarget.children[0].classList.add("transition");
      event.relatedTarget.children[0].classList.add("originalPosition");

      event.relatedTarget.style.pointerEvents = "none";
      event.relatedTarget.style.zIndex = "5";
      event.relatedTarget.classList.add("transition");
      event.relatedTarget.classList.remove("draggable");

      event.target.classList.remove("can-drop");
      event.target.classList.add("dropped");

      complete -= 1;
    },
    ondropdeactivate: function (event) {
      // remove active dropzone feedback
      event.target.classList.remove("drop-active");
      event.target.classList.remove("drop-target");
    },
    checker: function (
      dragEvent, // related dragmove or dragend
      event, // Touch, Pointer or Mouse Event
      dropped, // bool default checker result
      dropzone, // dropzone Interactable
      dropzoneElement, // dropzone element
      draggable, // draggable Interactable
      draggableElement // draggable element
    ) {
      // only allow drops into matching id
      return (
        dropped &&
        dropzoneElement.id == draggableElement.id &&
        dropzoneElement.classList.contains("can-drop")
      );
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

  function handlePlayButton(event) {
    location.reload();
  }
</script>

<main>
  <div>{version}</div>
  <div
    class="transition drop-target originalPosition dropped nonDraggable"
    style="display: none"
  >
    Preloaded CSS styles
  </div>

  <!-- <h1>{title}!</h1> -->

  <div id="gameboard">
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
    <div class="playButton" on:click={handlePlayButton}>play</div>
  {/if}
</main>

<style>
  @import url("https://fonts.googleapis.com/css2?family=Fredoka&family=Londrina+Outline&family=Londrina+Solid:wght@400&family=Nunito:wght@300;400;600;700&display=swap");
  .originalPosition {
    color: #ffcb77 !important;
    transition: transform 0.3s ease-out;
  }

  .playButton {
    position: relative;
    top: -3em;
    font-family: "Londrina Solid";
    font-size: 2em;
    color: #17c3b2;
    cursor: pointer;
  }

  .transition {
    transition: transform 0.3s ease-out;
    opacity: 1;
    pointer-events: none;
    touch-action: none;
  }

  .dropped {
    color: #ffcb77 !important;
  }

  main {
    text-align: center;
    padding: 1em;
    max-width: 240px;
    margin: 0 auto;
  }

  #gameboard {
    position: relative;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 300px;
    height: 300px;
    margin: 0 auto;
    /* border: 1px solid #227c9d; */
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
    border: 1px solid red;
  }

  .rotation {
    width: 1em;
    overflow: hidden;
    position: absolute;
    transform-origin: center;
    font-family: "Londrina Solid";
    color: #fe6d73;
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
    color: #17c3b2;
    z-index: 0;
  }
</style>
