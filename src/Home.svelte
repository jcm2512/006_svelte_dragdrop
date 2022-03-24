<script>
  export let tiles;

  function handleClick(event) {
    console.log(event);
  }
</script>

<div class="tiles-main">
  {#each tiles as tile}
    <div class="tile" on:click={() => handleClick(tile.vowel)}>{tile.word}</div>
  {/each}
</div>

<style>
  .tiles-main {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
    align-items: center;
    justify-content: center;
  }

  .tile {
    font-size: 4em;
    text-align: center;
  }
</style>
