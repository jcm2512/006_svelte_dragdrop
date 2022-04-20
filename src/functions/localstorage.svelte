<script context="module">
  export const myLocalStorage = {
    key: "defaultStorage",
    value: [""],
    init: function (key, value) {
      const localdata = localStorage.getItem(key);
      this.key = key;
      this.value = JSON.stringify(value);
      localStorage.setItem(this.key, JSON.stringify(this.value));
    },
    set: function (value) {
      this.value = value;
      localStorage.setItem(this.key, JSON.stringify(this.value));
    },
    get: function (key = this.key) {
      let result;
      const localdata = localStorage.getItem(key);
      console.log(localdata);
      //   if (localdata !== null) {
      //     result = JSON.parse(localdata);
      //   }
      //   return result;
    },
    remove: function () {
      localStorage.removeItem(this.key);
    },
  };
</script>
