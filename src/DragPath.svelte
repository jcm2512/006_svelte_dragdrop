<script>
  import { onMount } from "svelte";
  // import dragElement from "../modules/dragElement";
  import interact from "interactjs";
  import closestPoint from "../modules/closestPoint";

  let divs = []; // store references to DOM elements
  const array = ["h"];

  let path;

  // target elements with the "draggable" class

  let draggable = interact(".draggable");
  draggable.draggable({
    inertia: false,
    onmove: dragMoveListener,
    onstart: dragStartListener,
    onend: dragEndListener,
  });

  function dragEndListener(event) {
    console.log("stopped");
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
    // target.style.transform = `translate(${x}px, ${y}px)`;
    target.style.transform = `translate(${
      closestPoint(path, [event.clientX, event.clientY])[0]
    }px, ${closestPoint(path, [event.clientX, event.clientY])[1]}px`;

    // update the position attributes
    target.setAttribute("x", x);
    target.setAttribute("y", y);
  }
</script>

<main>
  <div class="container">
    <svg
      width="539"
      height="397"
      viewBox="0 0 539 397"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        bind:this={path}
        id="path"
        class="path"
        d="M159 70c-50.386 35.428-74.284 72.547-71.691 111.355 2.592 38.81 31.514 76.92 86.765 114.333L447.7 84.137l-9.812 263.996"
      />
      <g id="drag">
        <circle class="oval" cx="15" cy="15" r="15" />
        <polygon class="arrow" points="10,10 25,15 10,20" />
      </g>
    </svg>
  </div>

  {#each array as item, index}
    <div bind:this={divs[index]}>
      {item}
    </div>
    <div class="draggable">O</div>
  {/each}
</main>

<style>
  .oval {
    fill: #f5a623;
  }

  .arrow {
    fill: #fff;
  }

  .path {
    fill: none;
    stroke: #979797;
  }

  .draggable {
    will-change: transform;
    position: absolute;
    top: 0;
    left: 0;
    padding: 2em;
    z-index: 9;
    background-color: #f1f1f1;
    border: 1px solid #d3d3d3;
    text-align: center;
  }
</style>
