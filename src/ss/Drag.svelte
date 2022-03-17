<script>
  import { onMount } from "svelte";
  import dragElement from "../../../modules/dragElement";

  let divs = []; // store references to DOM elements
  const array = ["h", "e", "y"];

  onMount(() => {
    divs.forEach((div) => {
      dragElement(div);
    });
  });
</script>

<main>
  {#each array as item, index}
    <div id="mydiv" bind:this={divs[index]}>
      {item}
    </div>
  {/each}
</main>

<style>
  #mydiv {
    position: absolute;
    padding: 1em;
    z-index: 9;
    background-color: #f1f1f1;
    border: 1px solid #d3d3d3;
    text-align: center;
  }
</style>
