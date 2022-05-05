<script context="module">
  export const localData = {
    key: "localData",
    value: {
      points: 0,
      stars: 0,
      currentLevel: 1,
      maxLevel: 2,
      gameData: {
        Level_01: {
          cat: {
            level: 1,
            word: "cat",
            vowel: "a",
            img: "/assets/png/cat.png",
            exp: 0,
            status: "unlocked",
            starred: false,
          },
          hat: {
            level: 1,
            word: "hat",
            vowel: "a",
            img: "/assets/png/hat.png",
            exp: 0,
            status: "unlocked",
            starred: false,
          },
          dog: {
            level: 1,
            word: "dog",
            vowel: "o",
            img: "/assets/png/dog.png",
            exp: 0,
            status: "unlocked",
            starred: false,
          },
          fox: {
            level: 1,
            word: "fox",
            vowel: "o",
            img: "/assets/png/fox.png",
            exp: 0,
            status: "unlocked",
            starred: false,
          },
          sun: {
            level: 1,
            word: "sun",
            vowel: "u",
            img: "/assets/png/sun.png",
            exp: 0,
            status: "unlocked",
            starred: false,
          },
          bed: {
            level: 1,
            word: "bed",
            vowel: "e",
            img: "/assets/png/bed.png",
            exp: 0,
            status: "locked",
            starred: false,
          },
          jet: {
            level: 1,
            word: "jet",
            vowel: "e",
            img: "/assets/png/jet.png",
            exp: 0,
            status: "locked",
            starred: false,
          },
          pin: {
            level: 1,
            word: "pin",
            vowel: "i",
            img: "/assets/png/pin.png",
            exp: 0,
            status: "locked",
            starred: false,
          },
          dig: {
            level: 1,
            word: "dig",
            vowel: "i",
            img: "/assets/png/dig.png",
            exp: 0,
            status: "locked",
            starred: false,
          },
          nut: {
            level: 1,
            word: "nut",
            vowel: "u",
            img: "/assets/png/nut.png",
            exp: 0,
            status: "locked",
            starred: false,
          },
          bag: {
            level: 1,
            word: "bag",
            vowel: "e",
            img: "/assets/png/bag.png",
            exp: 0,
            status: "locked",
            starred: false,
          },
          cup: {
            level: 1,
            word: "cup",
            vowel: "e",
            img: "/assets/png/cup.png",
            exp: 0,
            status: "locked",
            starred: false,
          },
        },
        Level_02: {
          cat: {
            level: 2,
            word: "cat",
            vowel: "a",
            img: "/assets/png/cat.png",
            exp: 0,
            status: "unlocked",
            starred: false,
          },
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
    },
  };
</script>
