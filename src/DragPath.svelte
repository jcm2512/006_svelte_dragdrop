<script>
  import { onMount } from "svelte";
  import pointerPos from "../modules/pointerPos";
  import { gsap, TweenLite } from "gsap";
  import Draggable from "gsap/Draggable";

  let divs = []; // store references to DOM elements
  const array = ["h"];

  let drag, path;
  let draggable;

  onMount(() => {
    // begin

    gsap.registerPlugin(Draggable);

    // Closest Point on Path
    // https://bl.ocks.org/mbostock/8027637

    var DEG = 180 / Math.PI;

    // var drag = document.querySelector("#drag");
    // var path = document.querySelector("#path");

    var pathLength = path.getTotalLength() || 0;
    var startPoint = path.getPointAtLength(0);
    var startAngle = getRotation(startPoint, path.getPointAtLength(0.1));

    TweenLite.set(drag, {
      transformOrigin: "center",
      rotation: startAngle + "_rad",
      xPercent: -50,
      yPercent: -50,
      x: startPoint.x,
      y: startPoint.y,
    });

    draggable = new Draggable(drag, {
      liveSnap: {
        points: pointModifier,
      },
    });

    draggable.target.onmousedown = dragMouseDown;

    function dragMouseDown(e) {
      e = e || window.event;
      e.preventDefault();
      // get the mouse cursor position at startup:
      pos3 = e.clientX;
      pos4 = e.clientY;
      console.log("DID IT");
    }

    TweenLite.set(".container", {
      autoAlpha: 1,
    });

    function pointModifier(point) {
      var p = closestPoint(path, pathLength, point);

      TweenLite.set(drag, {
        rotation: p.rotation,
      });

      return p.point;
    }

    function closestPoint(pathNode, pathLength, point) {
      var precision = 8,
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
          (best = scan),
            (bestLength = scanLength),
            (bestDistance = scanDistance);
        }
      }

      // binary search for precise estimate
      precision /= 2;
      while (precision > 0.5) {
        var before,
          after,
          beforeLength,
          afterLength,
          beforeDistance,
          afterDistance;
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

      var len2 = bestLength + (bestLength === pathLength ? -0.1 : 0.1);
      var rotation = getRotation(best, pathNode.getPointAtLength(len2));

      return {
        point: best,
        rotation: rotation * DEG,
        // distance: Math.sqrt(bestDistance),
      };

      function distance2(p) {
        var dx = p.x - point.x,
          dy = p.y - point.y;
        return dx * dx + dy * dy;
      }
    }

    function getRotation(p1, p2) {
      var dx = p2.x - p1.x;
      var dy = p2.y - p1.y;
      return Math.atan2(dy, dx);
    }

    // end
  });
</script>

<main>
  <div class="container">
    <svg
      width="539"
      height="397"
      viewBox="0 0 539 397"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        bind:this={path}
        id="path"
        class="path"
        d="M159 70c-50.386 35.428-74.284 72.547-71.691 111.355 2.592 38.81 31.514 76.92 86.765 114.333L447.7 84.137l-9.812 263.996"
      />
      <g id="drag" bind:this={drag}>
        <circle class="oval" cx="15" cy="15" r="15" />
        <polygon class="arrow" points="10,10 25,15 10,20" />
      </g>
    </svg>
  </div>
</main>

<style>
  .container {
    visibility: hidden;
    opacity: 0;
  }

  .oval {
    fill: #f5a623;
  }

  .arrow {
    fill: #fff;
  }

  .path {
    fill: none;
    stroke: #979797;
  }
</style>
