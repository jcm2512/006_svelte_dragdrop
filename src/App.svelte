<script>
  import interact from "interactjs";
  export let title;

  const position = { x: 0, y: 0 };

  interact(".draggable").draggable({
    listeners: {
      start(event) {
        console.log(event.type, event.target);
      },
      move(event) {
        position.x += event.dx;
        position.y += event.dy;

        event.target.style.transform = `translate(${position.x}px, ${position.y}px)`;
      },
    },
  });
</script>

<main>
  <h1>{title}!</h1>
  <div class="draggable">Draggable Element</div>
</main>

<style>
  main {
    text-align: center;
    padding: 1em;
    max-width: 240px;
    margin: 0 auto;
  }

  h1 {
    color: #9adcff;
    font-size: 2em;
    font-weight: 100;
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }

  .draggable {
    width: 25%;
    min-height: 6.5em;
    margin: 1rem 0 0 1rem;
    background-color: #29e;
    color: white;
    border-radius: 0.75em;
    padding: 4%;
    touch-action: none;
    user-select: none;
  }
</style>
