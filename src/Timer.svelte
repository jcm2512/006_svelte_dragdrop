<script>
  import CircleTimer from "circle-timer";
  import { onMount } from "svelte";
  let circleTimer;
  let tick = 60;
  let paused = false;
  setInterval(() => {
    if (!paused) {
      tick -= 1;
    }
  }, 1000);
  onMount(() => {
    circleTimer = new CircleTimer({
      rootElement: document.getElementById("circle-timer"),
      units: "em",
      thickness: 3,
      radius: 3,
      color: "#CC76FD",
    });
    circleTimer.startTimer();
  });
  function handleClick() {
    paused ? circleTimer.startTimer() : circleTimer.pauseTimer();
    paused = !paused;
  }
</script>

<div id="timer" on:click={() => handleClick()}>
  <div id="circle-timer" />
  <div id="countdown">{tick}</div>
</div>

<style>
  @import url("https://fonts.googleapis.com/css2?family=Fredoka&family=Londrina+Outline&family=Londrina+Solid:wght@300;900&family=Nunito:wght@300;400;600;700&display=swap");
  :root {
    --main-font: "Londrina Solid";
  }
  #timer {
    display: grid;
    grid-template-rows: 1fr;
    grid-template-columns: 1fr;
    grid-template-areas: "timer";
    align-items: center;
    justify-content: center;
    font-size: 1rem;
  }
  #countdown {
    font-size: 2.5em;
    grid-area: timer;
    z-index: 10;
    text-align: center;
    font-family: var(--main-font);
    font-weight: 900;
    -webkit-text-stroke: 0.01em white;
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
