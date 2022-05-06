<script>
  // TODO: #15 expbar should be right aligned
  import { expStore, triggerLetter, combo } from "./store.js";
  import { onMount } from "svelte";
  import { gsap } from "gsap";

  let expBar;
  let options;

  $: $triggerLetter && animate($expStore);

  const animate = function () {
    // PREPARE ANIMATION PROPERTIES
    let timeline = gsap.timeline();
    let duration = $expStore.correct ? 0.5 : 1.0;
    let defaults = { width: `${$expStore.value}vw`, duration: duration };
    if ($expStore.correct) {
      duration = 0.5;
      options = {};
    } else {
      duration = 1.0;
      options = { "background-color": "#FF0000", repeat: 1, yoyo: true };
    }

    // ANIMATE WITH GSAP
    if (expBar) {
      timeline
        .to(expBar, {
          ...defaults,
        })
        .to(expBar, { ...options }, "<");
    }
  };

  setInterval(() => {
    if ($combo > 1) {
      $expStore.value -= 0.5;
      if ($expStore.value == 5) {
        $combo = 0;
      }
    }
  }, 100);
</script>

<div id="expbar">
  <div id="exp_bar_bg" />
  <div
    bind:this={expBar}
    id="exp_bar_fill"
    style="--maxWidth: {$expStore.max}vw"
  />
  <div id="exp_bg" />
  <img src="/assets/ui/electricity.png" alt="BONUS" />
</div>

<style>
  #expbar {
    padding: 0.2rem;
    --height: 8vw;
    --rounded: 4vw;
    --border: 1vw;
    --min: 5vw;
    --inner: calc(var(--height) - (2 * (var(--border))));
    position: relative;
    display: grid;
    grid-template-columns: 1fr 4fr;
    align-items: center;
  }
  @media (orientation: landscape) {
    #expbar {
      width: 50vw;
    }
  }

  @media (orientation: portrait) {
    #expbar {
      width: 50vw;
    }
  }

  #expbar img {
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
    background-color: var(--orange);
    border-radius: var(--rounded);
    height: var(--inner);
    margin: var(--border);
    width: var(--inner);
    max-width: var(--maxWidth); /* this should be made relative */
    min-width: var(--inner);
    /* transition: width 1s ease-out; */
    z-index: 10;
  }

  #exp_bg {
    position: relative;
    grid-column: 2/-1;
    grid-row: 1/-1;
    background-color: var(--white);
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
    background-color: var(--white);
    border-radius: var(--rounded);
    height: var(--height);
    border: var(--border) solid var(--white);
    z-index: 0;
  }
</style>
