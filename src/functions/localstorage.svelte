<script context="module">
  export const localData = {
    key: "localData",
    value: { points: 100 },
    get: function (prop) {
      let array = [],
        entries = [];
      // If prop is a undefined, return array with all values
      // If prop is string, convert it to an array so we can cycle through props

      typeof prop == "undefined"
        ? (array = Object.keys(this.value))
        : typeof prop == "string"
        ? array.push(prop)
        : (array = prop);

      array.forEach((key) =>
        entries.push([String(key), this.value[String(key)]])
      );

      return Object.fromEntries(entries);
    },
    set: function (obj) {
      for (const [key, value] of Object.entries(obj)) {
        this.value[key] = value;
      }
      localStorage.setItem(this.key, JSON.stringify(this.value));
    },
    filterObject: function (obj, callback) {
      return Object.fromEntries(
        Object.entries(obj).filter(([key, val]) => callback(val, key))
      );
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
