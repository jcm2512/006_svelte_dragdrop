<script context="module">
  export const localData = {
    key: "localData",
    value: { points: 100 },
    get: function (property) {
      return this.value[property];
    },
    set: function (property, value) {
      this.value[property] = value;
    },
  };

  export const gamedata = {
    key: "gamedata",
    value: {
      points: 0,
      wordData: {},
    },
  };
</script>
