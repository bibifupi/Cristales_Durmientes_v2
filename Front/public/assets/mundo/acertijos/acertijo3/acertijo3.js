window.addEventListener("DOMContentLoaded", () => {
  const points = document.querySelectorAll(".point");
  const svgContainer = document.getElementById("svgContainer");
  let isDrawing = false;
  let line = null;
  let startPoint = null;
  let startID = null;
  let cuerdas = [];
  let winner = false;

  function startDraw(e) {
    if (cuerdas.length >= 3) {
      window.alert("Solo se pueden poner 3 cuerdas");
      window.location.reload();
    } else if (!isDrawing) {
      isDrawing = true;
      startID = e.target.id;

      startPoint = { x: e.target.offsetLeft - 20, y: e.target.offsetTop - 27 };
      line = document.createElementNS("http://www.w3.org/2000/svg", "line");
      line.setAttribute("x1", startPoint.x);
      line.setAttribute("y1", startPoint.y);
      line.setAttribute("x2", startPoint.x);
      line.setAttribute("y2", startPoint.y);
      line.setAttribute("stroke", "red");
      line.setAttribute("stroke-width", "3");
      svgContainer.appendChild(line);
    }
  }

  function draw(e) {
    if (isDrawing) {
      const x = e.clientX - svgContainer.getBoundingClientRect().left;
      const y = e.clientY - svgContainer.getBoundingClientRect().top;
      line.setAttribute("x2", x);
      line.setAttribute("y2", y);
    }
  }

  function endDraw(e) {
    if (isDrawing) {
      isDrawing = false;
      const endID = e.target.id;
      console.log("startID -> ", startID, "/ endID -> ", endID);

      if (!endID.includes("point") || startID == endID) {
        svgContainer.removeChild(line);
      } else {
        cuerdas.push(startID + "-" + endID);
        solucionado();
      }
    }

    console.log("cuerdas", cuerdas);
  }

  function solucionado() {
    const conexionesNecesarias = [
      "point1-point2",
      "point3-point4",
      "point5-point6"
    ];

    let conexiones = 0;

    conexionesNecesarias.forEach((conexion) => {
      if (cuerdas.includes(conexion) || cuerdas.includes(conexion.split('-').reverse().join('-'))) {
        conexiones++;
      }
    });

    if (conexiones === conexionesNecesarias.length) {
      window.alert("¡Felicidades, lo has conseguido!");
      window.location.href = '/mundo';
      sessionStorage.setItem('puzzle3Completed', 'true');
      winner = true;
    }
  }

  points.forEach((point) => {
    point.addEventListener("mousedown", startDraw);
    point.addEventListener("mouseup", endDraw);
  });
  svgContainer.addEventListener("click", endDraw);
  svgContainer.addEventListener("mousemove", draw);
  
});

function pista() {
  document.getElementById('alert-box').style.display = 'flex';
  document.getElementById('alert-box').style.flexDirection = 'column';
  document.getElementById('alert-box').style.alignItems = 'center';
  document.getElementById('alert-box').style.justifyContent = 'center';

  const dialog = document.querySelector('dialog');
  const alertBox = document.getElementById('alert-box');
  const dialogRect = dialog.getBoundingClientRect();
  const alertWidth = alertBox.offsetWidth;
  const alertHeight = alertBox.offsetHeight;

  alertBox.style.position = 'absolute';
  alertBox.style.top = `${(dialogRect.height - alertHeight) / 2}px`;
  alertBox.style.left = `${(dialogRect.width - alertWidth) / 2}px`;
}

function hideAlert() {
  document.getElementById('alert-box').style.display = 'none';
}
