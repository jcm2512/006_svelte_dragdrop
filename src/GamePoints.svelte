<script>
  import { gamePoints } from "./store.js";
</script>

<div id="points">
  {$gamePoints}
</div>

<style>
  #points {
    color: var(--blue);
    z-index: 50;
  }
</style>
