<script>
  import interact from "interactjs";
  import explode from "./functions";
  export let title;
  export let word;
  const position = { x: 0, y: 0 };

  // target elements with the "draggable" class
  interact(".draggable").draggable({
    inertia: false,
    onmove: dragMoveListener,
    onstart: dragStartListener,
    onend: dragEndListener,
  });

  // return object to previous location
  function revertPosition(object) {
    if (object.getAttribute("count") > 0) {
      // get start position
      let sx = object.getAttribute("start-x");
      let sy = object.getAttribute("start-x");

      // translate object and update position attributes
      object.style.transform = `translate(${sx}px, ${sy}px)`;
      object.setAttribute("x", sx);
      object.setAttribute("y", sy);

      // add transition class
      object.classList.add("transition");

      // remove transition when complete
      object.addEventListener("transitionend", () => {
        object.classList.remove("transition");
      });
    }
  }

  function dragEndListener(event) {
    const object = event.target;
    // revertPosition(object);
  }

  function dragStartListener(event) {
    const object = event.target;

    // store the initial position attributes
    object.setAttribute("start-x", object.getAttribute("x") || 0);
    object.setAttribute("start-y", object.getAttribute("y") || 0);

    // count the times dragged
    object.setAttribute(
      "count",
      parseFloat(object.getAttribute("count")) + 1 || 1
    );
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
  interact(".dropzone").dropzone({
    overlap: 0.3,

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
      draggableElement.classList.add("can-drop");
    },
    ondragleave: function (event) {
      // remove the feedback style
      event.target.classList.remove("drop-target");
      event.relatedTarget.classList.remove("can-drop");
    },
    ondrop: function (event) {
      event.relatedTarget.classList.add("originalPosition");
      event.relatedTarget.classList.add("dropped");
      //   event.relatedTarget.style.transform = "translate(0px, 0px)";
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
      return dropped && dropzoneElement.id == draggableElement.id;
    },
  });
</script>

<main>
  <div class="transition drop-target originalPosition" style="display: none">
    Preloaded CSS styles
  </div>

  <h1>{title}!</h1>

  <div id="gameboard">
    <container id="container" class="drop-container">
      {#each word as letter}
        <div id={letter} class="tile dropzone">{letter}</div>
      {/each}
    </container>

    <container id="container" class="drag-container">
      {#each word as letter}
        <div id={letter} class="tile draggable">
          {letter}
        </div>
      {/each}
    </container>
  </div>
</main>

<style>
  @import url("https://fonts.googleapis.com/css2?family=Fredoka&family=Nunito:wght@300;400;600;700&display=swap");

  .originalPosition {
    transform: translate(0px, 0px) !important;
    background-color: #ffcb77 !important;
    transition: transform 0.2s ease-out;
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
    width: 600px;
    height: 400px;
    margin: 0 auto;
    border: 1px solid #227c9d;
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

  .tile {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 4em;
    width: 1.5em;
    height: 1.5em;
    margin: 0.5rem;
    color: #fef9ef;
    border-radius: 0.4em;
    padding: 4%;
    touch-action: none;
    user-select: none;
  }
  .draggable {
    background-color: #fe6d73;
  }
  .dropzone {
    background-color: #17c3b2;
  }

  .drop-target {
    background-color: #29e;
  }

  .transition {
    opacity: 0.5;
    transition: transform 0.3s ease-out;
  }
</style>
