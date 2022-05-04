import MainMenu from "./MainMenu.svelte";

localStorage.clear();

const mainMenu = new MainMenu({
  target: document.body,
});
