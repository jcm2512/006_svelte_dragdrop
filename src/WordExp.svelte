<script>
  import { cvcObject, gameLoaderWordId } from "./store.js";
  import { gsap } from "gsap";
  import { onMount } from "svelte";

  export let currentWord;

  let wordExp;

  $: $gameLoaderWordId, update();

  $: $cvcObject && handleUpdate($cvcObject);

  const update = function () {
    if (wordExp) {
      gsap.to(wordExp, {
        width: `${$cvcObject[currentWord].exp}vw`,
        duration: 0,
      });
    }
  };

  const handleUpdate = function (obj) {
    if (wordExp) {
      console.log($cvcObject[currentWord].exp);
      gsap.to(wordExp, {
        width: `${$cvcObject[currentWord].exp}vw`,
        duration: 0.4,
      });
    }
  };
</script>

<div id="wordExp">
  <div id="exp_bar_bg" />
  <div bind:this={wordExp} id="exp_bar_fill" />
  <div id="exp_bg" />
</div>

<style>
  #wordExp {
    padding: 0.2rem;
    --height: 1rem;
    --rounded: 0.5rem;
    --border: 1vw;
    --min: 5vw;
    --inner: 0.6rem;
    position: relative;
    display: grid;
    grid-template-columns: 1fr 4fr;
    align-items: center;
  }
  @media (orientation: landscape) {
    #wordExp {
      width: 50vw;
    }
  }

  @media (orientation: portrait) {
    #wordExp {
      width: 50vw;
    }
  }

  #wordExp img {
    grid-column: 1/2;
    grid-row: 1/-1;
    width: 80%;
    margin-left: 10%;
    height: auto;
    z-index: 1;
    position: relative;
    overflow: hidden;
  }

  #exp_bar_fill {
    position: relative;
    grid-column: 2/-1;
    grid-row: 1/-1;
    background-color: #ff61aa;
    border-radius: var(--rounded);
    height: var(--inner);
    margin: var(--border);
    width: var(--inner);
    max-width: 35vw; /* accounts for margin... this should be fixed */
    min-width: var(--inner);
    /* transition: width 1s ease-out; */
    z-index: 10;
  }

  #exp_bg {
    position: relative;
    grid-column: 2/-1;
    grid-row: 1/-1;
    background-color: #d5d5d5;
    border-radius: var(--rounded);
    height: var(--inner);
    margin: var(--border);
    z-index: 5;
    max-width: 35vw;
  }

  #exp_bar_bg {
    position: relative;
    grid-column: 1/-1;
    grid-row: 1/-1;
    background-color: white;
    border-radius: var(--rounded);
    height: var(--height);
    border: var(--border) solid white;
    z-index: 0;
  }
</style>
