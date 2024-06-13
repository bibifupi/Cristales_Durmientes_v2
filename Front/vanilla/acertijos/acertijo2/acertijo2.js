$(document).ready(function() {
    var torres = [[[], $(".linea1")], [[], $(".linea2")], [[], $(".linea3")]],
      movimientos = 0,
      discs = null,
      hold = null;
    function clear() {
      torres[0][1].empty();
      torres[1][1].empty();
      torres[2][1].empty();
    }
  
    function drawdiscs() {
      clear();
      for (var i = 0; i < 3; i++) {
        if (!jQuery.isEmptyObject(torres[i][0])) {
          for (var j = 0; j < torres[i][0].length; j++) {
            torres[i][1].append(
              $(
                "<li id='disc" +
                  torres[i][0][j] +
                  "' value='" +
                  torres[i][0][j] +
                  "'></li>"
              )
            );
          }
        }
      }
    }
  
    function init() {
      clear();
      torres = [[[], $(".linea1")], [[], $(".linea2")], [[], $(".linea3")]];
      discs = 5;
      movimientos = 0;
      hold = null;
      for (var i = discs; i > 0; i--) torres[0][0].push(i);
      drawdiscs();
      $(".movimientos").text(movimientos + " movimientos");
    }
  
    function handle(torre) {
      if (hold === null) {
        if (!jQuery.isEmptyObject(torres[torre][0])) {
          hold = torre;
          torres[hold][1]
            .children()
            .last()
            .css("margin-top", "-170vw");
        }
      } else {
        var move = moveDisc(hold, torre);
        movimientos += 1;
        $(".movimientos").text(movimientos + " movimientos");
        if (move == 1) {
          drawdiscs();
        } else {
          alert("No puedes poner un disco sobre otro más pequeño");
        }
        hold = null;
      }
      if (solved()){
        window.alert("Solucionado en " + movimientos + " movimientos!");
        window.location.href = '../../index.html';
        sessionStorage.setItem('puzzle2Completed', 'true');

      } 
    }
  
    function moveDisc(a, b) {
      var from = torres[a][0];
      var to = torres[b][0];
      if (from.length === 0) return 0;
      else if (to.length === 0) {
        to.push(from.pop());
        return 1;
      } else if (from[from.length - 1] > to[to.length - 1]) {
        return 0;
      } else {
        to.push(from.pop());
        return 1;
      }
    }
  
    function solved() {
      if (
        jQuery.isEmptyObject(torres[0][0]) &&
        jQuery.isEmptyObject(torres[1][0]) &&
        torres[2][0].length == discs
      )
        return 1;
      else return 0;
    }
  
    $(".t").click(function() {
      handle($(this).attr("value"));
    });
  
    $("#restart").click(function() {
      var discs = document.getElementById("box").value;
      init();
    });
    init();
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