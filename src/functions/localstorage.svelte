<script context="module">
  export const localData = {
    key: "localData",
    value: {
      points: 0,
      stars: 0,
      currentlevel: [1],
      maxLevel: 2,
      maxExp: 24,
      gameData: {
        Level_01: {
          cat: {
            word: "cat",
            vowel: "a",
            img: "/assets/png/cat.png",
            initial_exp: 0,
            exp: 0,
            status: "unlocked",
            stars: 0,
            levelup: false,
            levelup_showResult: false,
          },
          hat: {
            word: "hat",
            vowel: "a",
            img: "/assets/png/hat.png",
            initial_exp: 0,
            exp: 0,
            status: "unlocked",
            stars: 0,
            levelup: false,
            levelup_showResult: false,
          },
          dog: {
            word: "dog",
            vowel: "o",
            img: "/assets/png/dog.png",
            initial_exp: 0,
            exp: 0,
            status: "unlocked",
            stars: 0,
            levelup: false,
            levelup_showResult: false,
          },
          fox: {
            word: "fox",
            vowel: "o",
            img: "/assets/png/fox.png",
            initial_exp: 0,
            exp: 0,
            status: "unlocked",
            stars: 0,
            levelup: false,
            levelup_showResult: false,
          },
          sun: {
            word: "sun",
            vowel: "u",
            img: "/assets/png/sun.png",
            initial_exp: 0,
            exp: 0,
            status: "unlocked",
            stars: 0,
            levelup: false,
            levelup_showResult: false,
          },
          bed: {
            word: "bed",
            vowel: "e",
            img: "/assets/png/bed.png",
            initial_exp: 0,
            exp: 0,
            status: "locked",
            stars: 0,
            levelup: false,
            levelup_showResult: false,
          },
          jet: {
            word: "jet",
            vowel: "e",
            img: "/assets/png/jet.png",
            initial_exp: 0,
            exp: 0,
            status: "locked",
            stars: 0,
            levelup: false,
            levelup_showResult: false,
          },
          pin: {
            word: "pin",
            vowel: "i",
            img: "/assets/png/pin.png",
            initial_exp: 0,
            exp: 0,
            status: "locked",
            stars: 0,
            levelup: false,
            levelup_showResult: false,
          },
          dig: {
            word: "dig",
            vowel: "i",
            img: "/assets/png/dig.png",
            initial_exp: 0,
            exp: 0,
            status: "locked",
            stars: 0,
            levelup: false,
            levelup_showResult: false,
          },
          nut: {
            word: "nut",
            vowel: "u",
            img: "/assets/png/nut.png",
            initial_exp: 0,
            exp: 0,
            status: "locked",
            stars: 0,
            levelup: false,
            levelup_showResult: false,
          },
          bag: {
            word: "bag",
            vowel: "e",
            img: "/assets/png/bag.png",
            initial_exp: 0,
            exp: 0,
            status: "locked",
            stars: 0,
            levelup: false,
            levelup_showResult: false,
          },
          cup: {
            word: "cup",
            vowel: "e",
            img: "/assets/png/cup.png",
            initial_exp: 0,
            exp: 0,
            status: "locked",
            stars: 0,
            levelup: false,
            levelup_showResult: false,
          },
        },
        Level_02: {
          cat: {
            word: "cat",
            vowel: "a",
            img: "/assets/png/cat.png",
            initial_exp: 0,
            exp: 0,
            status: "unlocked",
            stars: 0,
            levelup: false,
            levelup_showResult: false,
          },
          dig: {
            word: "dig",
            vowel: "i",
            img: "/assets/png/dig.png",
            initial_exp: 0,
            exp: 0,
            status: "unlocked",
            stars: 0,
            levelup: false,
            levelup_showResult: false,
          },
          nut: {
            word: "nut",
            vowel: "u",
            img: "/assets/png/nut.png",
            initial_exp: 0,
            exp: 0,
            status: "unlocked",
            stars: 0,
            levelup: false,
            levelup_showResult: false,
          },
          bag: {
            word: "bag",
            vowel: "e",
            img: "/assets/png/bag.png",
            initial_exp: 0,
            exp: 0,
            status: "unlocked",
            stars: 0,
            levelup: false,
            levelup_showResult: false,
          },
          cup: {
            word: "cup",
            vowel: "e",
            img: "/assets/png/cup.png",
            initial_exp: 0,
            exp: 0,
            status: "unlocked",
            stars: 0,
            levelup: false,
            levelup_showResult: false,
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
