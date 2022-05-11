<script>
  import { cvcObject } from "./store.js";
  import { animateCSS } from "./animateCSS.svelte";
  import ProgressBar from "./components/ProgressBar.svelte";
  import Stars from "./Stars.svelte";

  export let index;
  let GameLevel = Object.keys($cvcObject)[index];
  let cvcs = Object.keys($cvcObject[GameLevel]);
  let DOMelements = [];
</script>

<li class="card container">
  {#each cvcs as currentWord, index}
    {#if $cvcObject[GameLevel][currentWord].status == "unlocked"}
      <span class="img_Container">
        <img
          src={$cvcObject[GameLevel][currentWord].img}
          alt={currentWord}
          class="icon animate__faster"
          bind:this={DOMelements[index]}
          on:click|preventDefault={() => {
            animateCSS(DOMelements[index], "rubberBand");
          }}
        />
        <ProgressBar
          {currentWord}
          {GameLevel}
          width="15vw"
          height="1.5vw"
          inner_border="0px"
          fill_color="var(--pink)"
          inner_color="var(--white)"
        />
        <Stars
          wordLevel={$cvcObject[GameLevel][currentWord].level}
          starred={$cvcObject[GameLevel][currentWord].starred}
        />
      </span>
    {:else}
      <span class="img_Container">
        <img
          src={$cvcObject[GameLevel][currentWord].img}
          alt={currentWord}
          class="icon locked "
        />
        <img
          src="/assets/ui/locked.png"
          alt="locked"
          class="lock "
          bind:this={DOMelements[index]}
          on:click|preventDefault={() => {
            animateCSS(DOMelements[index], "swing");
          }}
        />
      </span>
    {/if}
  {/each}
</li>

<style>
  .img_Container {
    grid-column: span 2;
    display: grid;
    align-items: center;
    justify-items: center;
  }

  /* Dealing with 2 orphan items */
  .img_Container:last-child:nth-child(3n - 1) {
    grid-column-end: -2;
  }

  .img_Container:nth-last-child(2):nth-child(3n + 1) {
    grid-column-end: 4;
  }

  /* Dealing with single orphan */
  .img_Container:last-child:nth-child(3n - 2) {
    grid-column-end: 5;
  }

  li {
    scroll-snap-align: center;
    display: inline-block; /* remove list bullets*/
    font-size: 2rem;
    color: white;
  }

  img {
    height: 20vw;
    width: 20vw;
    max-width: 3.5rem;
    max-height: 3.5rem;
    grid-column: 1/-1;
    grid-row: 1/-1;
  }

  .locked {
    filter: brightness(0.1) opacity(0.35);
  }

  .lock {
    z-index: 100;
    height: 10vw;
    width: 10vw;
  }

  .container {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    justify-content: space-evenly;
    align-content: space-evenly;
    width: 100%;
    height: 100%;
    margin: auto;
    text-align: center;
    align-items: center;
    justify-items: center;
  }

  .card {
    border-radius: 1rem;
    background-color: var(--yellow);
    z-index: 50;
    border: var(--border-width) solid var(--white);
  }
</style>
