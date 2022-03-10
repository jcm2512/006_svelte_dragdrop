function dragElement(obj) {
  let elmnt = obj.element,
    path = obj.path || null;

  let pos1 = 0,
    pos2 = 0,
    pos3 = 0,
    pos4 = 0;

  var DEG = 180 / Math.PI,
    pathLength = path.getTotalLength() || 0,
    startPoint = path.getPointAtLength(0);

  elmnt.onmousedown = dragMouseDown;

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    // elmnt.style.top = elmnt.offsetTop - pos2 + "px";
    // elmnt.style.left = elmnt.offsetLeft - pos1 + "px";
    // console.log(
    //   closestPoint(path, [
    //     elmnt.getBoundingClientRect().x,
    //     elmnt.getBoundingClientRect().y,
    //   ])
    // );
    elmnt.style.transform = `translate(${
      closestPoint(path, [e.clientX, e.clientY])[0]
    }px, ${closestPoint(path, [e.clientX, e.clientY])[1]}px`;
  }

  function closeDragElement() {
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

/////

// Closest Point on Path
// https://bl.ocks.org/mbostock/8027637
function closestPoint(pathNode, point) {
  var pathLength = pathNode.getTotalLength(),
    precision = 8,
    best,
    bestLength,
    bestDistance = Infinity;

  // linear scan for coarse approximation
  for (
    var scan, scanLength = 0, scanDistance;
    scanLength <= pathLength;
    scanLength += precision
  ) {
    if (
      (scanDistance = distance2(
        (scan = pathNode.getPointAtLength(scanLength))
      )) < bestDistance
    ) {
      (best = scan), (bestLength = scanLength), (bestDistance = scanDistance);
    }
  }

  // binary search for precise estimate
  precision /= 2;
  while (precision > 0.5) {
    var before, after, beforeLength, afterLength, beforeDistance, afterDistance;
    if (
      (beforeLength = bestLength - precision) >= 0 &&
      (beforeDistance = distance2(
        (before = pathNode.getPointAtLength(beforeLength))
      )) < bestDistance
    ) {
      (best = before),
        (bestLength = beforeLength),
        (bestDistance = beforeDistance);
    } else if (
      (afterLength = bestLength + precision) <= pathLength &&
      (afterDistance = distance2(
        (after = pathNode.getPointAtLength(afterLength))
      )) < bestDistance
    ) {
      (best = after),
        (bestLength = afterLength),
        (bestDistance = afterDistance);
    } else {
      precision /= 2;
    }
  }

  best = [best.x, best.y];
  best.distance = Math.sqrt(bestDistance);
  return best;

  function distance2(p) {
    var dx = p.x - point[0],
      dy = p.y - point[1];
    return dx * dx + dy * dy;
  }
}

export default dragElement;
