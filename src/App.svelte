<script>
  import interact from "interactjs";
  export let title;

  const position = { x: 0, y: 0 };

  // target elements with the "draggable" class
  interact(".draggable").draggable(
    // options
    {
      inertia: false,
      onmove: dragMoveListener,
    }
  );
  function dragMoveListener(event) {
    var target = event.target,
      // keep the dragged position in the x y attributes
      x = (parseFloat(target.getAttribute("x")) || 0) + event.dx,
      y = (parseFloat(target.getAttribute("y")) || 0) + event.dy;

    // translate the element
    target.style.transform = `translate(${x}px, ${y}px)`;

    // update the posiion attributes
    target.setAttribute("x", x);
    target.setAttribute("y", y);

    // update the z-index
  }
</script>

<main>
  <h1>{title}!</h1>
  <section class="drag-container">
    <div class="draggable">a</div>
    <div class="draggable">b</div>
    <div class="draggable">c</div>
  </section>
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
</style>
