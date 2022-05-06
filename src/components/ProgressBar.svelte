<script>
  import {
    cvcObject,
    triggerLetter,
    maxExp,
    gameLoaderWordId,
  } from "../store.js";
  import { gsap } from "gsap";
  import { onMount } from "svelte";

  // MAIN EXPORTS
  let PROGRESS_BAR;
  export let GameLevel;
  export let currentWord;
  //   export let trigger;

  // STYLING
  export let fill_color = "var(--pink)";
  export let inner_color = "var(--medium-gray)";
  export let border_color = `var(--white)`;
  export let height = "20px";
  export let rounded = 1.0;
  export let inner_border = "5px";
  export let width = "150px";
  export let inner_bg = true;
  export let max = $maxExp;
  export let value = $cvcObject[GameLevel][currentWord].exp;
  // export let offset = "0px";

  const handleUpdate = function (element) {
    if (element) {
      gsap.to(element, {
        "--value": `${$cvcObject[GameLevel][currentWord].exp}`,
        duration: 1.5,
      });
    }
  };

  const update = function (element) {
    if (element) {
      gsap.set(element, {
        "--value": `${value}`,
      });
    }
  };
  // $: $triggerLetter && console.log("Wooooo");
  $: $triggerLetter && console.log("correct letter"),
    handleUpdate(PROGRESS_BAR);
  $: $gameLoaderWordId, update(PROGRESS_BAR);

  const ic = `--inner-color: ${inner_color};`;
  const fc = `--fill-color: ${fill_color};`;
  const bc = `--border-color: ${border_color};`;
  const h = `--height: ${height};`;
  const r = `--rounded: calc(var(--height) * ${rounded / 2});`;
  const ib = `--inner-border: ${inner_border};`;
  const w = `--width: calc(${width});`;

  let progress_bar_options = `${h} ${ib} ${w} ${fc} ${bc}`;
  if (rounded > 0) {
    progress_bar_options = `${progress_bar_options} ${r}`;
  }
  let bg_options = "";
  if (inner_bg) {
    bg_options = `${bg_options} ${ic}`;
  }
  let fill_options = `--max: ${max}; --value:${value}`;
</script>

<div id="progress_bar" style={progress_bar_options}>
  <!-- <div id="title">EXP</div> -->
  <!-- <div id="exp_bar_border" /> -->
  <div id="exp_bar_bg" style={bg_options}>
    <div id="exp_bar_fill" bind:this={PROGRESS_BAR} style={fill_options} />
  </div>
</div>

<style>
  #progress_bar {
    align-items: center;
    background-color: var(--border-color);
    border-radius: var(--rounded);
    height: var(--height);
    width: var(--width);
    overflow: hidden;
  }
  #title {
    grid-row: 1;
    text-align: left;
    padding-left: 0.5rem;
  }

  #exp_bar_bg {
    background-color: var(--inner-color);
    border-radius: var(--rounded);
    height: calc(var(--height) - (2 * var(--inner-border)));
    margin: var(--inner-border);
    overflow: hidden;
  }

  #exp_bar_fill {
    background-color: var(--fill-color);
    border-radius: inherit;
    height: inherit;
    width: calc(
      (var(--width) - (2 * var(--inner-border))) * var(--value) / var(--max)
    );
  }
</style>
