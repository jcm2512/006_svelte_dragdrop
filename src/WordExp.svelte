<script>
  import { cvcObject, gameLoaderWordId } from "./store.js";
  import { gsap } from "gsap";
  import { onMount } from "svelte";

  export let currentWord;
  export let GameLevel;

  let wordExp;

  $: $gameLoaderWordId, update();

  $: handleUpdate($cvcObject);

  const update = function () {
    if (wordExp) {
      gsap.to(wordExp, {
        width: `${$cvcObject[GameLevel][currentWord].exp}vw`,
        duration: 0,
      });
    }
  };

  const handleUpdate = function (obj) {
    if (wordExp) {
      gsap.to(wordExp, {
        width: `${$cvcObject[GameLevel][currentWord].exp}vw`,
        duration: 1.5,
      });
    }
  };
  onMount(() => {
    update();
  });
</script>

<div id="wordExp">
  <div class="title">EXP</div>
  <div id="exp_bar_bg" />
  <div bind:this={wordExp} id="exp_bar_fill" />
  <div id="exp_bg" />
</div>

<style>
  .title {
    grid-row: 1;
    text-align: left;
    padding-left: 0.5rem;
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
    grid-template-rows: 1fr 1fr;
    align-items: center;
  }
  @media (orientation: landscape) {
    #wordExp {
      width: 25vw;
    }
  }

  @media (orientation: portrait) {
    #wordExp {
      width: 25vw;
    }
  }

  #exp_bar_fill {
    position: relative;
    grid-column: 1/-1;
    grid-row: 2;
    background-color: var(--pink);
    border-radius: var(--rounded);
    height: var(--inner);
    margin: var(--border);
    /* width: var(--inner); */
    max-width: calc(50vw - 2 * (var(--border)));
    min-width: var(--inner);
    z-index: 10;
  }

  #exp_bg {
    position: relative;
    grid-column: 1/-1;
    grid-row: 2;
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
    grid-row: 2;
    background-color: white;
    border-radius: var(--rounded);
    height: var(--height);
    border: var(--border) solid white;
    z-index: 0;
  }
</style>
