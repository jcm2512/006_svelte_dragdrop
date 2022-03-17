<script>
  import { onMount } from "svelte";
  import gsap from "gsap";
  import { Draggable } from "gsap/Draggable";
  import { DrawSVGPlugin } from "../modules/DrawSVGPlugin";

  export let paths;

  console.log(paths);

  onMount(() => {
    // Closest Point on Path
    // https://bl.ocks.org/mbostock/8027637

    gsap.registerPlugin(DrawSVGPlugin, Draggable);

    var DEG = 180 / Math.PI;

    var drag = document.querySelector("#drag");
    var path = document.querySelector("#path");

    var pathLength = path.getTotalLength() || 0;
    var startPoint = path.getPointAtLength(0);
    var startAngle = getRotation(startPoint, path.getPointAtLength(0.1));
    var lastPoint = path.getPointAtLength(0);
    var lastLength = 0;

    var drawTween = gsap.from("#drawMe", {
      duration: 1, // migrated to GSAP 3
      drawSVG: "0%",
      paused: true,
      ease: "none", // migrated to GSAP 3
    });

    gsap.set(drag, {
      transformOrigin: "center",
      rotation: startAngle + "_rad",
      xPercent: -50,
      yPercent: -50,
      x: startPoint.x,
      y: startPoint.y,
    });

    var draggable = new Draggable(drag, {
      liveSnap: {
        points: pointModifier,
      },
    });

    gsap.set(".container", {
      autoAlpha: 1,
    });

    function pointModifier(point) {
      var p = closestPoint(path, pathLength, point);

      gsap.set(drag, {
        rotation: p.rotation,
      });

      lastPoint.x = point.x;
      lastPoint.y = point.y;
      lastLength = p.length;

      drawTween.progress(lastLength / pathLength);

      return p.point;
    }

    function closestPoint(pathNode, pathLength, point) {
      var precision = 1,
        best,
        bestLength,
        bestDistance = Infinity;
      var traveled = distance2sqrt(lastPoint);
      var scanFrom = lastLength - traveled;
      var scanTo = lastLength + traveled;
      scanFrom = scanFrom < 0 ? 0 : scanFrom;

      if (traveled * 2 < 20) {
        scanTo = scanFrom + 20;
      }

      scanTo = scanTo > pathLength ? pathLength : scanTo;

      // console.log(scanTo - scanFrom);
      // linear scan for coarse approximation
      for (
        var scan, scanLength = scanFrom, scanDistance;
        scanLength <= scanTo;
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

      var len2 = bestLength + (bestLength === pathLength ? -0.1 : 0.1);
      var rotation = getRotation(best, pathNode.getPointAtLength(len2));

      return {
        point: best,
        rotation: rotation * DEG,
        length: bestLength,
      };

      function distance2(p) {
        var dx = p.x - point.x,
          dy = p.y - point.y;
        return dx * dx + dy * dy;
      }

      function distance2sqrt(p) {
        var dx = p.x - point.x,
          dy = p.y - point.y;
        return Math.sqrt(dx * dx + dy * dy);
      }
    }

    function getRotation(p1, p2) {
      var dx = p2.x - p1.x;
      var dy = p2.y - p1.y;
      return Math.atan2(dy, dx);
    }
  });
</script>

<main>
  <div class="container">
    <svg
      width="420"
      height="420"
      viewBox="-20 -20 440 420"
      xmlns="http://www.w3.org/2000/svg"
    >
      {#each paths as path}
        <path id="path" class="path" d={path} />

        <path
          stroke="#88CE02"
          stroke-width="10"
          id="drawMe"
          class="path"
          d={path}
        />
      {/each}
      <g id="drag">
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

  #drawMe {
    stroke: #88ce02;
  }
</style>
