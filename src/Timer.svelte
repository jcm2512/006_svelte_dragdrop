<!-- https://www.npmjs.com/package/circle-timer  -->
<script>
  import CircleTimer from "circle-timer";
  import { onMount } from "svelte";
  import { ticks, timerEnd, gameState, devMode } from "./store";
  let circleTimer;
  let tick = $ticks;
  let paused = $devMode.paused ? true : false;
  $timerEnd = false;
  setInterval(() => {
    if (!paused) {
      tick -= 1;
      if (tick <= 0) {
        paused = true;
        $gameState += 1;
        $timerEnd = true;
      }
    }
  }, 1000);
  onMount(() => {
    circleTimer = new CircleTimer({
      rootElement: document.getElementById("circle-timer"),
      units: "vw",
      thickness: 7,
      radius: 7,
      color: "hsl(162, 45%, 62%)",
      timerDuration: tick,
      circleDuration: tick,
    });
    if (!$devMode.paused) {
      circleTimer.startTimer();
    }
  });
  function handleClick() {
    paused ? circleTimer.startTimer() : circleTimer.pauseTimer();
    paused = !paused;
  }
</script>

<div id="_timer" on:click={() => handleClick()}>
  <div id="circle-timer" />
  <div id="countdown">{tick}</div>
</div>

<style>
  @import url("https://fonts.googleapis.com/css2?family=Fredoka&family=Londrina+Outline&family=Londrina+Solid:wght@300;900&family=Nunito:wght@300;400;600;700&display=swap");
  :root {
    --main-font: "Londrina Solid";
  }
  #_timer {
    display: grid;
    grid-template-rows: 1fr;
    grid-template-columns: 1fr;
    grid-template-areas: "timer";
    align-items: center;
    justify-items: center;
    font-size: 1rem;
  }
  #countdown {
    font-size: 8vw;
    grid-area: timer;
    z-index: 10;
    text-align: center;
    font-family: var(--main-font);
    font-weight: 900;
    -webkit-text-stroke: 0.01rem var(--white);
  }
  #circle-timer {
    z-index: 5;
    grid-area: timer;
    -moz-transform: scale(-1, 1);
    -webkit-transform: scale(-1, 1);
    -o-transform: scale(-1, 1);
    -ms-transform: scale(-1, 1);
    transform: scale(-1, 1);
  }
</style>
