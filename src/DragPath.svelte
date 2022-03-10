<script>
  import { onMount } from "svelte";
  import dragElement from "../modules/dragElement";

  let divs = []; // store references to DOM elements
  const array = ["h"];

  let drag, path;
  let draggable;

  onMount(() => {
    // console.log(path);
    // gsap.registerPlugin(Draggable);

    divs.forEach((div) => {
      dragElement({
        element: div,
        path: path,
      });
    });

    // end
  });
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
  <div class="mydiv" bind:this={drag}>DRAG</div>

  {#each array as item, index}
    <div class="mydiv" bind:this={divs[index]}>
      {item}
    </div>
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

  .mydiv {
    position: absolute;
    top: 0px;
    left: 0px;
    padding: 1em;
    z-index: 9;
    background-color: #f1f1f1;
    border: 1px solid #d3d3d3;
    text-align: center;
  }
</style>
