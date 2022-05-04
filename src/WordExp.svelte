<script>
  import { cvcObject, gameLoaderWordId } from "./store.js";
  import { gsap } from "gsap";
  import { onMount } from "svelte";

  export let currentWord;

  let wordExp;

  $: $gameLoaderWordId, update();

  $: handleUpdate($cvcObject);

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
      gsap.to(wordExp, {
        width: `${$cvcObject[currentWord].exp}vw`,
        duration: 0.4,
      });
    }
  };
  onMount(() => {
    update();
  });
</script>

<div class="container">
  <span class="title">EXP</span>

  <div id="wordExp">
    <div id="exp_bar_bg" />
    <div bind:this={wordExp} id="exp_bar_fill" />
    <div id="exp_bg" />
  </div>
</div>

<style>
  .title {
    text-align: left;
    padding-left: 0.5rem;
  }
  .container {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
  }
  #wordExp {
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

  #exp_bar_fill {
    position: relative;
    grid-column: 1/-1;
    grid-row: 1/-1;
    background-color: var(--blue);
    border-radius: var(--rounded);
    height: var(--inner);
    margin: var(--border);
    /* width: var(--inner); */
    max-width: calc(50vw - 2 * (var(--inner)));
    min-width: var(--inner);
    z-index: 10;
  }

  #exp_bg {
    position: relative;
    grid-column: 1/-1;
    grid-row: 1/-1;
    background-color: #d5d5d5;
    border-radius: var(--rounded);
    height: var(--inner);
    margin: var(--border);
    z-index: 5;
    max-width: 50vw;
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
