<script>
  import interact from "interactjs";
  export let title;
  export let word;

  const position = { x: 0, y: 0 };

  // target elements with the "draggable" class
  interact(".draggable").draggable({
    inertia: false,
    onmove: dragMoveListener,
    onstart: dragStartListener,
    onend: dragEndListener,
  });

  function dragEndListener(event) {
    const object = event.target;

    // return object to previous location
    if (object.getAttribute("count") > 0) {
      // get start position
      let sx = object.getAttribute("start-x");
      let sy = object.getAttribute("start-x");

      // translate object and update position attributes
      object.style.transform = `translate(${sx}px, ${sy}px)`;
      object.setAttribute("x", sx);
      object.setAttribute("y", sy);

      // add transition class
      object.classList.add("transition");

      // remove transition when complete
      object.addEventListener("transitionend", () => {
        object.classList.remove("transition");
      });
    }
  }

  function dragStartListener(event) {
    const object = event.target;

    // store the initial position attributes
    object.setAttribute("start-x", object.getAttribute("x") || 0);
    object.setAttribute("start-y", object.getAttribute("y") || 0);

    // count the times dragged
    object.setAttribute(
      "count",
      parseFloat(object.getAttribute("count")) + 1 || 1
    );
  }

  function dragMoveListener(event) {
    const target = event.target,
      // get the updated dragged position
      x = (parseFloat(target.getAttribute("x")) || 0) + event.dx,
      y = (parseFloat(target.getAttribute("y")) || 0) + event.dy;

    // translate the element
    target.style.transform = `translate(${x}px, ${y}px)`;

    // update the position attributes
    target.setAttribute("x", x);
    target.setAttribute("y", y);

    // update the z-index
  }
</script>

<main>
  <div class="transition" style="display: none">d</div>

  <h1>{title}!</h1>
  <container id="container" class="drag-container">
    {#each word as letter}
      <div class="draggable">{letter}</div>
    {/each}
  </container>
</main>

<style>
  @import url("https://fonts.googleapis.com/css2?family=Fredoka&family=Nunito:wght@300;400;600;700&display=swap");

  main {
    text-align: center;
    padding: 1em;
    max-width: 240px;
    margin: 0 auto;
  }

  h1 {
    color: #17c3b2;
    font-size: 2em;
    font-weight: 100;
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }

  .drag-container {
    display: flex;
    flex-direction: row;
  }

  .draggable {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 4em;
    width: 1.5em;
    height: 1.5em;
    margin: 1rem 0 0 1rem;
    background-color: #fe6d73;
    color: #fef9ef;
    border-radius: 0.75em;
    padding: 4%;
    touch-action: none;
    user-select: none;
  }

  .transition {
    opacity: 0.5;
    transition: transform 0.3s ease-out;
  }
</style>
