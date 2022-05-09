<script>
  import { cvcObject, maxExp, gameLoaderWordId } from "./store.js";
  import { scale } from "svelte/transition";
  import ProgressBar from "./components/ProgressBar.svelte";

  export let currentWord;
  export let GameLevel;

  // import { tweened } from "svelte/motion";
  // import { cubicOut } from "svelte/easing";

  // // let value = $cvcObject[GameLevel][currentWord].exp
  // // let max = $maxExp
  // let value;
  // const calcValue = function () {
  //   value = $cvcObject[GameLevel][currentWord].exp / $maxExp;
  // };

  // $: $gameLoaderWordId, calcValue(), progress.set(value, { duration: 0 });

  // const progress = tweened(value, {
  //   duration: 400,
  //   easing: cubicOut,
  // });

  // const update = function () {
  //   progress.set($cvcObject[GameLevel][currentWord].exp / $maxExp);
  // };
  // $: $cvcObject && update();
</script>

<div class="container rounded label">
  {#key currentWord}
    <img
      class="image"
      src={$cvcObject[GameLevel][currentWord].img}
      alt={$cvcObject[GameLevel][currentWord].word}
      in:scale={{
        duration: 200,
        start: 0.7,
        opacity: 0.5,
      }}
    />
    <ProgressBar
      {currentWord}
      {GameLevel}
      width="20vw"
      height="1.5vw"
      inner_border="0px"
      fill_color="var(--pink)"
    />
    <!-- <progress value={$progress} style="height:3vw; width:20vw" /> -->
  {/key}
</div>

<style>
  .container {
    width: 25vw;
    height: 25vw;
    padding: 0.3rem;
    align-items: center;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
  }

  .image {
    width: 15vw;
    height: 15vw;
    text-align: center;
    align-items: center;
    justify-items: center;
  }

  .rounded {
    border-radius: 1rem;
    border: 0.25rem solid var(--light-gray);
  }

  .label {
    background-color: #ffffff;
    z-index: 10;
  }
</style>
