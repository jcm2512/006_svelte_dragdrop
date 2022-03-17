<script>
  import { onMount } from "svelte";
  import gsap from "gsap";
  import { Draggable } from "gsap/Draggable";
  import { DrawSVGPlugin } from "../modules/DrawSVGPlugin";

  export let paths;

  // store references to DOM elements
  let pathElements = [];
  let dragElements = [];
  let goalElements = [];
  let lineElements = [];

  onMount(() => {
    // Closest Point on Path
    // https://bl.ocks.org/mbostock/8027637

    gsap.registerPlugin(DrawSVGPlugin, Draggable);

    var DEG = 180 / Math.PI;

    // LOOP START
    let drawTween = [];
    let draggable = [];

    for (const [index, value] of paths.entries()) {
      let drag = dragElements[index],
        goal = goalElements[index],
        path = pathElements[index],
        line = lineElements[index];

      let pathLength = path.getTotalLength() || 0,
        startPoint = path.getPointAtLength(0),
        startAngle = getRotation(startPoint, path.getPointAtLength(0.1)),
        lastPoint = path.getPointAtLength(0),
        endPoint = path.getPointAtLength(path.getTotalLength()),
        lastLength = 0;

      drawTween[index] = gsap.from(line, {
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

      gsap.set(goal, {
        transformOrigin: "center",
        xPercent: -50,
        yPercent: -50,
        x: endPoint.x,
        y: endPoint.y,
      });

      draggable[index] = new Draggable(drag, {
        liveSnap: {
          points: function (point) {
            var p = closestPoint(
              pathElements[index],
              pathLength,
              point,
              lastPoint,
              lastLength
            );
            gsap.set(drag, {
              rotation: p.rotation,
            });

            lastPoint.x = point.x;
            lastPoint.y = point.y;
            lastLength = p.length;

            drawTween[index].progress(lastLength / pathLength);

            return p.point;
          },
        },
        onDragEnd: function (e) {
          // hide draggable when goal is reached
          if (this.hitTest(goalElements[index])) {
            gsap.set(drag, { opacity: 0 });
            // enable the next draggable
            if (index < paths.length - 1) {
              draggable[index + 1].enable();
            }
          }
        },
      });

      /// LOOP END
    }

    // disable all but first draggable
    for (let i = 1; i < paths.length; i++) {
      draggable[i].disable();
    }

    gsap.set(".container", {
      autoAlpha: 1,
    });

    function closestPoint(pathNode, pathLength, point, lastPoint, lastLength) {
      // convert to pure function
      var precision = 1,
        best,
        bestLength,
        bestDistance = Infinity;
      var traveled = distance2sqrt(lastPoint, point);
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
            (scan = pathNode.getPointAtLength(scanLength)),
            point
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

      function distance2(p, point) {
        // convert to pure function
        var dx = p.x - point.x,
          dy = p.y - point.y;
        return dx * dx + dy * dy;
      }

      function distance2sqrt(p, point) {
        // convert to pure function
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
      {#each paths as path, index}
        <g id="goal" bind:this={goalElements[index]}>
          <circle class="goal" cx="15" cy="15" r="15" />
        </g>
        <path id="path" class="path" d={path} bind:this={pathElements[index]} />

        <path
          stroke="#88CE02"
          stroke-width="10"
          id="drawMe"
          class="path"
          d={path}
          bind:this={lineElements[index]}
        />

        <g id="drag" bind:this={dragElements[index]}>
          <circle class="oval" cx="15" cy="15" r="15" />
          <polygon class="arrow" points="10,10 25,15 10,20" />
        </g>
      {/each}
    </svg>
  </div>
</main>

<style>
  #obj {
    background-color: red;
    opacity: 0.3;
  }

  .container {
    visibility: hidden;
    opacity: 0;
  }

  .oval {
    fill: #f5a623;
  }

  .goal {
    fill: red;
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
