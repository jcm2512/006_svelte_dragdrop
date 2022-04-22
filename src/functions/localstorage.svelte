<script context="module">
  export const localData = {
    key: "localData",
    value: { points: 0 },
    get: function (prop) {
      let array = [],
        entries = [];

      // CREATE ARRAY OF VALUES
      // ----------------------

      // If prop is a seqence of arguments, create an array
      // e.g function("first", "second") -> ["first", "second"]
      arguments.length > 1
        ? (array = Array.from(arguments))
        : // If prop is a undefined, return array with all current values
        typeof prop == "undefined"
        ? (array = Object.keys(this.value))
        : // If prop is string, convert it to an array so we can cycle through props
        typeof prop == "string"
        ? array.push(prop)
        : (array = prop);

      array.forEach((key) => {
        // Skip undefined values
        if (this.value[String(key)] != undefined) {
          entries.push([String(key), this.value[String(key)]]);
        }
      });

      return Object.fromEntries(entries);
    },
    set: function (obj) {
      for (const [key, value] of Object.entries(obj)) {
        this.value[key] = value;
      }
      //   localStorage.setItem(this.key, JSON.stringify(this.value));
    },
    clear: function () {
      localStorage.removeItem(this.key);
    },
    load: function () {
      if (localStorage.getItem(this.key) != null)
        this.value = JSON.parse(localStorage.getItem(this.key));
    },
    save: function () {
      localStorage.setItem(this.key, JSON.stringify(this.value));
      // Initialize localStorage if == null
      //   localStorage.getItem(this.key) == null
      //     ? localStorage.setItem(this.key, JSON.stringify(this.value))
      //     : (this.value = JSON.parse(localStorage.getItem(this.key)));
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
