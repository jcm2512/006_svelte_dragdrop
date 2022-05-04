<script>
  // TODO: #15 expbar should be right aligned
  import { expObj, trigger, bonustime, gameState, combo } from "./store.js";
  import { gsap } from "gsap";

  let expBar;

  let maxExp = 35;

  $: handleUpdate($expObj);
  $: $trigger && flashExp();

  setInterval(() => {
    if ($expObj.value > 5) {
      $expObj.value -= 0.25;
      if ($expObj.value == 5) {
        $combo = 0;
      }
    }
  }, 100);

  const handleUpdate = function (obj) {
    if (expBar) {
      if ($expObj.value <= maxExp) {
        gsap.to(expBar, {
          width: `${$expObj.value}vw`,
          duration: 0.5,
        });
      }
    }
  };

  const flashExp = function () {
    // check if expBar has loaded first
    if (expBar) {
      gsap.to($expObj, {
        value: $expObj.value - 10,
        duration: 0.5,
        ease: "linear",
      });
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
  <div bind:this={expBar} id="exp_bar_fill" style="--maxWidth: {maxExp}vw" />
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
