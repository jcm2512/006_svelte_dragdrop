<script>
  // TODO: #15 expbar should be right aligned
  import { expObj, trigger, maxExp, bonustime, gameState } from "./store.js";
  import { gsap } from "gsap";

  let expBar;

  let bonusduration = 10.0;
  $: $expObj && handleUpdate($expObj);
  $: $trigger && flashExp();

  const handleUpdate = function (obj) {
    if (expBar) {
      gsap.to(expBar, {
        width: `${$expObj.value}vw`,
        duration: 0.4,
        // check for bonus time
        onComplete: function () {
          if ($expObj.value >= $maxExp) {
            bonusTime();
          }
        },
      });
    }
  };

  const bonusTime = function () {
    $gameState += 1;
    $bonustime = true;
    console.log("bonustime: ", $bonustime);
    gsap.to($expObj, {
      value: 5,
      duration: bonusduration,
      ease: "linear",
      onComplete: function () {
        $gameState += 1;
        $bonustime = false;
        console.log("bonustime: ", $bonustime);
      },
    });
    gsap.to(expBar, {
      width: "5vw",
      duration: bonusduration,
      ease: "linear",
    });
  };

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
  <div bind:this={expBar} id="exp_bar_fill" />
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
    background-color: #fc8c78;
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
