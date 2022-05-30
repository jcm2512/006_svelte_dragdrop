<script>
  export let button_function = function () {
    console.log("button clicked");
  };
  export let label = "button";
  export let classlist = "";
  export let bg_color = "var(--pink)";
  export let grid_row = "15/16";
  export let grid_column = "4/8";
</script>

<div
  id="button"
  class={`auto rounded button ${classlist}`}
  style={`background-color: ${bg_color}; grid-row: ${grid_row}; grid-column: ${grid_column}`}
  on:click|preventDefault={button_function}
>
  <span>{label}</span>
</div>

<style>
  #button {
    width: 100%;
    height: 100%;
    margin: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;

    border: var(--border-width) solid var(--border-light);
    border-radius: 1rem;

    font-size: 1.5rem;
    color: var(--white);
    cursor: pointer;
    z-index: 100;
  }
</style>
