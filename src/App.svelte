<script>
  import interact from "interactjs";
  import shuffle from "./functions";
  export let word;
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
    object.setAttribute("rotation", event.target.style.transform);
  }

  function dragMoveListener(event) {
    const target = event.target,
      // get the updated dragged position
      x = (parseFloat(target.getAttribute("x")) || 0) + event.dx,
      y = (parseFloat(target.getAttribute("y")) || 0) + event.dy,
      rotation = target.getAttribute("rotation");

    // translate the element
    target.style.transform = `translate(${x}px, ${y}px) ${rotation}`;

    // update the position attributes
    target.setAttribute("x", x);
    target.setAttribute("y", y);
    target.setAttribute("rotation", rotation);
  }

  // enable draggables to be dropped into this
  let letterDrop = interact(".dropzone");

  letterDrop.dropzone({
    overlap: "pointer",

    // listen for drop related events:
    ondropactivate: function (event) {
      // add active target dropzone feedback
      event.target.classList.add("drop-active");
    },
    ondragenter: function (event) {
      let draggableElement = event.relatedTarget;
      let dropzoneElement = event.target;

      // feeback the posibility of a drop
      dropzoneElement.classList.add("drop-target");
<<<<<<< HEAD
      event.relatedTarget.setAttribute("rotation", "rotate(0deg)"); // BUG doesn't work with animation
=======
>>>>>>> 7785ef5a6a3cb6f247d798d26d27f6e8d4cd428d
    },
    ondragleave: function (event) {
      let target = event.target,
        relatedTarget = event.relatedTarget;

<<<<<<< HEAD
      // get the updated dragged position
      const x = parseFloat(target.getAttribute("x")),
        y = parseFloat(target.getAttribute("y")),
        rotation = target.getAttribute("rotation");

      // translate the element
      target.style.transform = `translate(${x}px, ${y}px) ${rotation}`;
=======
      // remove the feedback style
      target.classList.remove("drop-target");
>>>>>>> 7785ef5a6a3cb6f247d798d26d27f6e8d4cd428d
    },
    ondrop: function (event) {
      let target = event.target,
        relatedTarget = event.relatedTarget;
<<<<<<< HEAD

      relatedTarget.style.zIndex = "5";

=======
      relatedTarget.classList.add("originalPosition");
>>>>>>> 7785ef5a6a3cb6f247d798d26d27f6e8d4cd428d
      target.classList.add("dropped");
      target.classList.remove("can-drop");

      // Get CSS translate values
      const computedStyle = window.getComputedStyle(relatedTarget);
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
        target.getBoundingClientRect().x -
        relatedTarget.getBoundingClientRect().x;
      let yOffset =
        target.getBoundingClientRect().y -
        relatedTarget.getBoundingClientRect().y;
<<<<<<< HEAD

      // wait for transition to end
=======
>>>>>>> 7785ef5a6a3cb6f247d798d26d27f6e8d4cd428d

      relatedTarget.classList.add("originalPosition");
      // Move element to dropzone
      relatedTarget.style.transform = `translate(
		    ${currentTransform.x + xOffset}px, 
		    ${currentTransform.y + yOffset}px)`;

      relatedTarget.style.pointerEvents = "none";
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
  const upperEm = { limit: 16 };
  const lowerEm = { limit: 16 };

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
  <div
    class="transition drop-target originalPosition dropped animateEntry"
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
          class="tile draggable upper"
          style="margin-right:{getLimit(
            upperEm
          )}rem; transform: rotate({getRotation()}deg)"
        >
          {letter}
        </div>
      {/each}
    </container>
    <container id="container" class="drag-container">
      {#each shuffle(wordLower) as letter}
        <div
          id={letter}
          class="tile draggable lower"
          style="margin-right:{getLimit(
            lowerEm
          )}rem; transform: rotate({getRotation()}deg)"
        >
          {letter}
        </div>
      {/each}
    </container>
  </div>
</main>

<style>
  @import url("https://fonts.googleapis.com/css2?family=Fredoka&family=Londrina+Outline&family=Londrina+Solid:wght@400&family=Nunito:wght@300;400;600;700&display=swap");
  .originalPosition {
    color: #ffcb77 !important;
    transition: transform 0.3s ease-out !important;
    pointer-events: none;
  }

  .animateEntry {
    background-color: red;
    transition: background-color 0.3s ease-out !important;
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

  h1 {
    color: #17c3b2;
    font-size: 2em;
    font-weight: 100;
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
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: 7em;

    margin: 0rem;
    color: #fef9ef;
    border-radius: 0.4em;
    /* padding: 4%; */
    touch-action: none;
    user-select: none;
  }

  .upper {
    top: -1em;
  }

  .lower {
    top: 1em;
  }
  .draggable {
    /* background-color: #fe6d73; */
    font-family: "Londrina Solid";

    color: #fe6d73;
    z-index: 10;
  }
  .dropzone {
    /* background-color: #17c3b2; */
    font-family: "Londrina Outline";
    color: #17c3b2;
    z-index: 0;
  }

  .drop-target {
    font-family: "Londrina Solid";
  }

  .transition {
    opacity: 0.5;
    transition: transform 0.3s ease-out;
  }
</style>
