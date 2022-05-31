<script>
  export let stars;
</script>

<div>
  {#each Array(stars) as _}
    <img src="/assets/ui/star-sm-purple.png" alt="Level" />
  {/each}
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
