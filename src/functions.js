/* Randomize array in-place using Durstenfeld shuffle algorithm */

function shuffle(word) {
  let array = [...word];
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array.join("");
}

function explode(maxHeight, maxWidth) {
  let h = Math.floor(Math.random() * maxHeight) - maxHeight / 2;
  let w = Math.floor(Math.random() * maxWidth) - maxWidth / 2;
  return { h: h, w: w };
}
export default shuffle;
