<script context="module">
  export const localData = {
    key: "localData",
    value: {
      points: 0,
      gameData: {
        cat: {
          word: "cat",
          vowel: "a",
          img: "/assets/png/cat.png",
          exp: 0,
          status: "unlocked",
        },
        hat: {
          word: "hat",
          vowel: "a",
          img: "/assets/png/hat.png",
          exp: 0,
          status: "unlocked",
        },
        dog: {
          word: "dog",
          vowel: "o",
          img: "/assets/png/dog.png",
          exp: 0,
          status: "unlocked",
        },
        fox: {
          word: "fox",
          vowel: "o",
          img: "/assets/png/fox.png",
          exp: 0,
          status: "unlocked",
        },
        sun: {
          word: "sun",
          vowel: "u",
          img: "/assets/png/sun.png",
          exp: 0,
          status: "unlocked",
        },
        bed: {
          word: "bed",
          vowel: "e",
          img: "/assets/png/bed.png",
          exp: 0,
          status: "locked",
        },
        jet: {
          word: "jet",
          vowel: "e",
          img: "/assets/png/jet.png",
          exp: 0,
          status: "locked",
        },
        pin: {
          word: "pin",
          vowel: "i",
          img: "/assets/png/pin.png",
          exp: 0,
          status: "locked",
        },
        dig: {
          word: "dig",
          vowel: "i",
          img: "/assets/png/dig.png",
          exp: 0,
          status: "locked",
        },
        nut: {
          word: "nut",
          vowel: "u",
          img: "/assets/png/nut.png",
          exp: 0,
          status: "locked",
        },
        bag: {
          word: "bag",
          vowel: "e",
          img: "/assets/png/bag.png",
          exp: 0,
          status: "locked",
        },
        cup: {
          word: "cup",
          vowel: "e",
          img: "/assets/png/cup.png",
          exp: 0,
          status: "locked",
        },
      },
    },
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
</script>
