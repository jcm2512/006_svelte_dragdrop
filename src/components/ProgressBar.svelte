<script>
  import {
    cvcObject,
    triggerLetter,
    maxExp,
    gameLoaderWordId,
  } from "../store.js";

  import { tweened } from "svelte/motion";
  import { quintOut } from "svelte/easing";

  // MAIN EXPORTS
  let PROGRESS_BAR;
  export let GameLevel;
  export let currentWord;

  // STYLING
  export let fill_color = "var(--pink)";
  export let inner_color = "var(--medium-gray)";
  export let border_color = `var(--white)`;
  export let height = "20px";
  export let rounded = 1.0;
  export let inner_border = "0px";
  export let width = "150px";
  export let inner_bg = true;
  export let max = $maxExp;
  export let value = $cvcObject[GameLevel][currentWord].exp;

  let fill_options;

  const progress = tweened(value, {
    duration: 1500,
    easing: quintOut,
  });

  const handleUpdate = function (element) {
    if (element) {
      progress.set($cvcObject[GameLevel][currentWord].exp);
      fill_options = `--max: ${max}; --value:${$progress}`;
    }
  };

  const update = function (element) {
    if (element) {
      progress.set($cvcObject[GameLevel][currentWord].exp);
      fill_options = `--max: ${max}; --value:${$progress}`;
    }
  };
  $: $triggerLetter && handleUpdate(PROGRESS_BAR), console.log($progress);
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
</script>

<div id="progress_bar" style={progress_bar_options}>
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
