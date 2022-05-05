<script>
  import { cvcObject } from "./store.js";
  export let index;
  let level = Object.keys($cvcObject)[index];
  let cvcs = Object.keys($cvcObject[level]);
</script>

<li class="auto rounded card container">
  {#each cvcs as word}
    {#if $cvcObject[level][word].status == "unlocked"}
      <span class="img_Container">
        <span class="overlay">
          <img src={$cvcObject[level][word].img} alt={word} />
        </span>
      </span>
    {:else}
      <span class="img_Container">
        <span class="image overlay"
          ><img src={$cvcObject[level][word].img} alt={word} /></span
        >
        <span class="locked overlay"
          ><img src="/assets/ui/locked.png" alt="locked" /></span
        >
      </span>
    {/if}
  {/each}
</li>

<style>
  .img_Container {
    grid-column: span 2;
    display: grid;
    align-items: center;
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

  .overlay {
    grid-column: 1/-1;
    grid-row: 1/-1;
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
  }

  .image {
    filter: brightness(0.1) opacity(0.35);
  }

  .locked {
    z-index: 100;
  }

  .locked img {
    height: 10vw;
    width: 10vw;
  }

  .container {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    /* justify-content: space-evenly; */
  }

  .auto {
    width: 100%;
    height: 100%;
    margin: auto;
    text-align: center;
    align-items: center;
    justify-items: center;
  }

  .rounded {
    border-radius: 1rem;
    /* padding: 0.5em; */
  }

  .card {
    background-color: var(--pink);
    z-index: 50;
    border: 0.25rem solid var(--white);
  }
</style>
