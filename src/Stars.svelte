<script>
  export let starred;
  export let wordLevel;
</script>

<div>
  {#if starred}
    {#each wordLevel as index}
      <img src="/assets/ui/star-sm-white.png" alt="Level" />
    {/each}
  {/if}
</div>

<style>
  div {
    padding-top: 0.2rem;
    height: 1rem;
    font-size: 1rem;
  }
  img {
    width: 1rem;
    height: 1rem;
  }
</style>
