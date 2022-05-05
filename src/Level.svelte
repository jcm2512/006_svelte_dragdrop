<script>
  import { cvcObject } from "./store.js";
  // export let index;
  let cvcs = Object.keys($cvcObject);
</script>

<li class="auto rounded card container">
  <!-- {#if index == 0} -->
  {#each cvcs as word}
    {#if $cvcObject[word].status == "unlocked"}
      <img src={$cvcObject[word].img} alt={word} />
    {:else}
      <span class="img_Container">
        <span class="image overlay"
          ><img src={$cvcObject[word].img} alt={word} /></span
        >
        <span class="locked overlay"
          ><img src="/assets/ui/locked.png" alt="locked" /></span
        >
      </span>
    {/if}
  {/each}
  <!-- {/if} -->
</li>

<style>
  .img_Container {
    display: grid;
    align-items: center;
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
    grid-template-columns: repeat(3, 1fr);
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

  .card_main {
    padding: 1rem;
    color: white;
    font-size: 2rem;
    height: 90%;
  }
</style>
