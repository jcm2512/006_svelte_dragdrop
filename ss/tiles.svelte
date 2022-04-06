<div class="tiles-main">
  {#each words as tile}
    {#if $cvcObject[tile].unlocked}
      <div
        class="button nonselectable"
        style="--exp: {`${$cvcObject[tile].exp}%`}"
      >
        <img src={$cvcObject[tile].img} width="80" height="80" />
      </div>
    {:else}
      <div class="button" style="--exp: {`${$cvcObject[tile].exp}%`}">
        <img
          class="nonselectable"
          src={$cvcObject[tile].img}
          width="80"
          height="80"
        />
      </div>
    {/if}
  {/each}
</div>
