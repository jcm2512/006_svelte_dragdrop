<script>
  import { expObj, trigger } from "./store.js";
  import { gsap } from "gsap";

  let expBar;

  $: $trigger && flashExp();

  const emptyExp = function () {};

  const flashExp = function () {
    // check if expBar has loaded first
    if (expBar) {
      gsap.to(expBar, {
        "background-color": "#FF0000",
        duration: 0.5,
        repeat: 1,
        yoyo: true,
      });
    }
  };
</script>

<div id="expbar">
  <div id="exp_bar_bg" />
  <div
    bind:this={expBar}
    id="exp_bar_fill"
    style="--exp: {`${$expObj.value}vw`}"
  />
  <div id="exp_bg" />
  <img src="/assets/ui/bolt.png" alt="EXP" />
  <!--  -->
  <!-- <div id="exp_bar_fill" style="--exp: {`${$expObj.value}vw`}" />
  <div id="exp" /> -->
</div>

<style>
  #expbar {
    --height: 8vw;
    --rounded: 4vw;
    --border: 1vw;
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
  }

  #exp_bar_fill {
    position: relative;
    grid-column: 2/-1;
    grid-row: 1/-1;
    background-color: #ff61aa;
    border-radius: var(--rounded);
    height: var(--inner);
    margin: var(--border);
    width: var(--exp);
    max-width: 38vw;
    min-width: var(--inner);
    transition: width 1s ease-out;
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
