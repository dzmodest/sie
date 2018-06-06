        var canvas;
         // current unsaved state
        var state;
         // past states
        var undo = [];
         // reverted states
        var redo = [];

        /**
         * Push the current state into the undo stack and then capture the current state
         */
        function savestate() {
          // clear the redo stack
          redo = [];
          $('#redo').prop('disabled', true);
          // initial call won't have a state
          if (state) {
            undo.push(state);
            $('#undo').prop('disabled', false);
          }
          state = JSON.stringify(canvas);
        }

        /**
         * Save the current state in the redo stack, reset to a state in the undo stack, and enable the buttons accordingly.
         * Or, do the opposite (redo vs. undo)
         * @param playStack which stack to get the last state from and to then render the canvas as
         * @param saveStack which stack to push current state into
         */
        function replay(playStack, saveStack, buttonsOn, buttonsOff) {
          saveStack.push(state);
          state = playStack.pop();
          var on = $("#"+buttonsOn);
          var off = $("#"+buttonsOff);
          // turn both buttons off for the moment to prevent rapid clicking
          on.prop('disabled', true);
          off.prop('disabled', true);
          canvas.clear();
          canvas.loadFromJSON(state, function() {
            canvas.renderAll();
            // now turn the buttons back on if applicable
            on.prop('disabled', false);
            if (playStack.length) {
              off.prop('disabled', false);
            }
          });
        }
        
        function prefontpreview(){
            $(".fontpreviewselect").click(function(){
                var font=$(this).css("font-family");
                $("#fontfamily").val(font).trigger("change");
            });
        }

(function() {
  var $ = function(id){return document.getElementById(id)};

  canvas = this.__canvas = new fabric.Canvas('c', {
    isDrawingMode: false
  });
  savestate();
    isPicker = false;
  fabric.Object.prototype.transparentCorners = false;
    // register event listener for user's actions
    canvas.on('object:removed', function() {
        savestate();
    });
    /*canvas.on('object:added', function() {
        savestate();
    });*/
    canvas.on('object:modified', function() {
        canvas.bringToFront(canvas.getActiveObject());
        savestate();
    });
    canvas.on('path:created', function() {
        savestate();
    });
    
  var drawingModeEl = $('drawing-mode'),
      drawingOptionsEl = $('drawing-mode-options'),
      drawingColorEl = $('drawing-color'),
      drawingShadowColorEl = $('drawing-shadow-color'),
      drawingLineWidthEl = $('drawing-line-width'),
      drawingShadowWidth = $('drawing-shadow-width'),
      drawingShadowOffset = $('drawing-shadow-offset'),
      clearEl = $('clear-canvas');
      save = $('save');
      undobtn = $('undo');
      redobtn = $('redo');
      preview = $('preview');
      c = $('c');
      fontfamily = $("fontfamily")
      fontcolor = $("fontcolor")
      fontsize = $("fontsize")
      addtext = $("addtext")
      addimage = $("addimage")
      uploadimage = $("uploadimage")
      uploadimage2 = $("uploadimage2")
      colorpicker = $("colorpicker")
      status = $("status")
      area = $("area")
      backgroundcolor = $("backgroundcolor")
      backgroundcolorchk = $("backgroundcolorchk")
      align = $("align")
      fontstyle = $("fontstyle")
      changesize = $("changesize")
      inversesize = $("inversesize")
      info = $("info")
      setwhasimagebtn = $("setwhasimagebtn")
      defaultpos = $("defaultpos")

info.innerHTML=canvas.getWidth()+"px x "+canvas.getHeight()+"px";

undobtn.onclick = function() {
    replay(undo, redo, "redo", "undo");
};
redobtn.onclick = function() {
    replay(redo, undo, "undo", "redo");
};


    function deleteobj(){
        if (!canvas.getActiveObject()) {
          return;
        }
        if (canvas.getActiveObject().type == 'activeSelection') {
            canvas.getActiveObject().toGroup();
            canvas.requestRenderAll();
        }
        canvas.remove(canvas.getActiveObject());
    }
    
    document.getElementById("deletebtn").onclick = function() { deleteobj(); }

  clearEl.onclick = function() { canvas.clear() };

  drawingModeEl.onclick = function() {
    isPicker=false;
    canvas.isDrawingMode = !canvas.isDrawingMode;
    if(canvas.isDrawingMode){
        var all = document.getElementsByClassName("draw");
        for (var i = 0; i < all.length; i++) {
          all[i].style.display = 'inherit';
        }
        var all = document.getElementsByClassName("text");
        for (var i = 0; i < all.length; i++) {
          all[i].style.display = 'none';
        }
        var all = document.getElementsByClassName("intro");
        for (var i = 0; i < all.length; i++) {
          all[i].style.display = 'none';
        }
        document.getElementById("drawing-mode").innerHTML = "<img src='data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTYuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgd2lkdGg9IjY0cHgiIGhlaWdodD0iNjRweCIgdmlld0JveD0iMCAwIDUxMS42MjYgNTExLjYyNiIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNTExLjYyNiA1MTEuNjI2OyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+CjxnPgoJPHBhdGggZD0iTTUwNi4xOTksMjQyLjk2OGwtNzMuMDktNzMuMDg5Yy0zLjYxNC0zLjYxNy03Ljg5OC01LjQyNC0xMi44NDgtNS40MjRjLTQuOTQ4LDAtOS4yMjksMS44MDctMTIuODQ3LDUuNDI0ICAgYy0zLjYxMywzLjYxOS01LjQyNCw3LjkwMi01LjQyNCwxMi44NXYzNi41NDdIMjkyLjM1NVYxMDkuNjQxaDM2LjU0OWM0Ljk0OCwwLDkuMjMyLTEuODA5LDEyLjg0Ny01LjQyNCAgIGMzLjYxNC0zLjYxNyw1LjQyMS03Ljg5Niw1LjQyMS0xMi44NDdjMC00Ljk1Mi0xLjgwNy05LjIzNS01LjQyMS0xMi44NTFMMjY4LjY2LDUuNDI5Yy0zLjYxMy0zLjYxNi03Ljg5NS01LjQyNC0xMi44NDctNS40MjQgICBjLTQuOTUyLDAtOS4yMzIsMS44MDktMTIuODUsNS40MjRsLTczLjA4OCw3My4wOWMtMy42MTgsMy42MTktNS40MjQsNy45MDItNS40MjQsMTIuODUxYzAsNC45NDYsMS44MDcsOS4yMjksNS40MjQsMTIuODQ3ICAgYzMuNjE5LDMuNjE1LDcuODk4LDUuNDI0LDEyLjg1LDUuNDI0aDM2LjU0NXYxMDkuNjM2SDEwOS42MzZ2LTM2LjU0N2MwLTQuOTUyLTEuODA5LTkuMjM0LTUuNDI2LTEyLjg1ICAgYy0zLjYxOS0zLjYxNy03LjkwMi01LjQyNC0xMi44NS01LjQyNGMtNC45NDcsMC05LjIzLDEuODA3LTEyLjg0Nyw1LjQyNEw1LjQyNCwyNDIuOTY4QzEuODA5LDI0Ni41ODUsMCwyNTAuODY2LDAsMjU1LjgxNSAgIHMxLjgwOSw5LjIzMyw1LjQyNCwxMi44NDdsNzMuMDg5LDczLjA4N2MzLjYxNywzLjYxMyw3Ljg5Nyw1LjQzMSwxMi44NDcsNS40MzFjNC45NTIsMCw5LjIzNC0xLjgxNywxMi44NS01LjQzMSAgIGMzLjYxNy0zLjYxLDUuNDI2LTcuODk4LDUuNDI2LTEyLjg0N3YtMzYuNTQ5SDIxOS4yN3YxMDkuNjM2aC0zNi41NDJjLTQuOTUyLDAtOS4yMzUsMS44MTEtMTIuODUxLDUuNDI0ICAgYy0zLjYxNywzLjYxNy01LjQyNCw3Ljg5OC01LjQyNCwxMi44NDdzMS44MDcsOS4yMzMsNS40MjQsMTIuODU0bDczLjA4OSw3My4wODRjMy42MjEsMy42MTQsNy45MDIsNS40MjQsMTIuODUxLDUuNDI0ICAgYzQuOTQ4LDAsOS4yMzYtMS44MSwxMi44NDctNS40MjRsNzMuMDg3LTczLjA4NGMzLjYyMS0zLjYyLDUuNDI4LTcuOTA1LDUuNDI4LTEyLjg1NHMtMS44MDctOS4yMjktNS40MjgtMTIuODQ3ICAgYy0zLjYxNC0zLjYxMy03Ljg5OC01LjQyNC0xMi44NDctNS40MjRoLTM2LjU0MlYyOTIuMzU2aDEwOS42MzN2MzYuNTUzYzAsNC45NDgsMS44MDcsOS4yMzIsNS40MiwxMi44NDcgICBjMy42MjEsMy42MTMsNy45MDUsNS40MjgsMTIuODU0LDUuNDI4YzQuOTQ0LDAsOS4yMjYtMS44MTQsMTIuODQ3LTUuNDI4bDczLjA4Ny03My4wOTFjMy42MTctMy42MTcsNS40MjQtNy45MDEsNS40MjQtMTIuODUgICBTNTA5LjgyLDI0Ni41ODUsNTA2LjE5OSwyNDIuOTY4eiIgZmlsbD0iIzAwMDAwMCIvPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+Cjwvc3ZnPgo=' />";
    }else{
        var all = document.getElementsByClassName("intro");
        for (var i = 0; i < all.length; i++) {
          all[i].style.display = 'inherit';
        }
        var all = document.getElementsByClassName("text");
        for (var i = 0; i < all.length; i++) {
          all[i].style.display = 'none';
        }
        var all = document.getElementsByClassName("draw");
        for (var i = 0; i < all.length; i++) {
          all[i].style.display = 'none';
        }
        document.getElementById("drawing-mode").innerHTML = "<img src='data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTkuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iTGF5ZXJfMSIgeD0iMHB4IiB5PSIwcHgiIHZpZXdCb3g9IjAgMCA1MTIgNTEyIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA1MTIgNTEyOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgd2lkdGg9IjY0cHgiIGhlaWdodD0iNjRweCI+CjxnPgoJPGc+CgkJPHBhdGggZD0iTTUwNS4wMjUsMTkuNTQ5Yy0xNC42ODgtMTQuNjg2LTQ0LjE0Ni02LjMwNy05Mi43MDgsMjYuMzc3Yy00MS4yNTQsMjcuNzY2LTkwLjczOCw2OS44MTktMTM5LjMzNiwxMTguNDE3ICAgIGMtNzIuMDQ3LDcyLjA0Ni0xMjYuODIzLDE0Mi43ODQtMTQ1LjA2MSwxODYuNDU4Yy0zLjAwMi0xLjA4OC02LjExNS0xLjk1OC05LjMyNy0yLjU5M2MtMTguODcyLTMuNzMzLTM5LjM2OSwxLjA0LTU2LjIzOCwxMy4wODYgICAgYy0yNC4yMDcsMTcuMjg2LTMwLjYxOCw0MS45NzEtMzEuNTQ5LDQ2LjEzMmMtNS4wOTYsMTkuMDMyLTE0Ljc0NywzNy4xOTEtMjcuOTIxLDUyLjUyOWMtNC4yMzcsNC45MzMtMy43NTMsMTIuMzQ5LDEuMDksMTYuNjkxICAgIGMxNi45MjcsMTUuMTcsMzguNTgsMjIuNzc5LDYxLjEwMiwyMi43NzljMjEuNzA2LDAsNDQuMjItNy4wNjksNjQuMDc3LTIxLjI0OWM5LjMxMS02LjY0OSwxNi4zNi0xNC4wMDEsMTcuNzI1LTE1LjQ1NiAgICBjMTYuODcyLTE4LjEzMSwyNC4wMzYtNDEuOTA0LDIwLjQ4Mi02My42MjVjNDIuODUtMTUuMzYxLDExNy41NTMtNzIuMTgxLDE5Mi44NzEtMTQ3LjQ5OSAgICBjNDguNTk4LTQ4LjU5OCw5MC42NTItOTguMDgzLDExOC40MTctMTM5LjMzNkM1MTEuMzMyLDYzLjY5Niw1MTkuNzEzLDM0LjIzOCw1MDUuMDI1LDE5LjU0OXogTTEyOS4zOTIsNDQ2LjQxNSAgICBjLTAuNjQyLDAuNjg1LTYuNDk1LDYuODUyLTE0LjEzLDEyLjMwMmMtMjcuNzMyLDE5LjgtNjEuNjg0LDIyLjA5LTg2LjM0NSw2Ljg0NWMxMS41NDktMTUuODM0LDIwLjEzMi0zMy42ODMsMjUuMDYzLTUyLjI1NCAgICB2LTAuMDAxYzAuMDU1LTAuMjA4LDAuMTA1LTAuNDE4LDAuMTQ5LTAuNjNjMC4wNDEtMC4xODksNC4xOTMtMTkuMTI3LDIyLjExOS0zMS45MjdjMTEuNTMtOC4yMzUsMjUuMjc3LTExLjU0NywzNy43MTEtOS4wODkgICAgYzEwLjI1NSwyLjAyNiwxOC44NzYsNy44OCwyNC4yNzUsMTYuNDhDMTQ4LjgyOSw0MDUuMDE4LDE0NS4xMDQsNDI5LjUzMiwxMjkuMzkyLDQ0Ni40MTV6IE0xNTkuMjE3LDM3Ni42NjMgICAgYy0wLjI0NS0wLjQxLTMuODctNy43Ny0xMC42MjQtMTMuMjRjNS44MTktMTUuNTU3LDE4LjM0Ni0zNi41ODQsMzUuODA2LTYwLjcyOWwzNy40NTUsMzcuNDU1ICAgIEMxOTUuNTA1LDM1OS4xMTYsMTczLjkxNCwzNzEuNDgsMTU5LjIxNywzNzYuNjYzeiBNMjQxLjE5OCwzMjUuNjg1bC00Mi4zMDEtNDIuMzAxYzcuMzEtOS40MSwxNS4yMTktMTkuMTU3LDIzLjY0OC0yOS4xMjcgICAgbDQ3LjgwNiw0Ny44MDZDMjYwLjIzMywzMTAuNjA4LDI1MC40ODksMzE4LjQ5MywyNDEuMTk4LDMyNS42ODV6IE00NTUuMTU5LDEwNC4yNjZjLTI2LjkyNiwzOC45MTYtNjYuNjQzLDg1LjIzNS0xMTEuODMyLDEzMC40MjIgICAgYy0xOC45NzMsMTguOTczLTM3LjM2NywzNi4yMzItNTQuODQ0LDUxLjY5NGwtNTAuMjU3LTUwLjI1N2MxNS45NC0xOC4wMzIsMzMuMzItMzYuNTM4LDUxLjY2MS01NC44NzcgICAgYzQ1LjE4OC00NS4xODksOTEuNTA3LTg0LjkwNSwxMzAuNDIyLTExMS44MzRjNDcuOTE2LTMzLjE1NSw2NC40NS0zMy4yMDgsNjcuNjI2LTMyLjc3NCAgICBDNDg4LjM3MSwzOS44MTMsNDg4LjMxMyw1Ni4zNTMsNDU1LjE1OSwxMDQuMjY2eiIgZmlsbD0iIzAwMDAwMCIvPgoJPC9nPgo8L2c+CjxnPgoJPGc+CgkJPHBhdGggZD0iTTExOS4yNTYsNDE0LjExOWMtNS43ODMtMy4xODMtMTMuMDUyLTEuMDc2LTE2LjIzNiw0LjcwOGMtMC4zMjIsMC41ODUtMC43MTEsMS4xMzItMS4xNTgsMS42MjYgICAgYy0wLjg5NCwwLjkzLTMuODMyLDMuNzctNi44ODQsNS45NTFjLTQuNjMsMy4zMDUtOS42MjYsNS42NzQtMTQuODUsNy4wNDFjLTYuMzg3LDEuNjcxLTEwLjIwOSw4LjIwMy04LjUzOCwxNC41OSAgICBjMS40MDYsNS4zNzIsNi4yNSw4LjkzLDExLjU1NSw4LjkzYzEuMDAyLDAsMi4wMTktMC4xMjcsMy4wMzQtMC4zOTFjOC4wNDktMi4xMDYsMTUuNjg0LTUuNzEsMjIuNjkzLTEwLjcxNCAgICBjNC40OTktMy4yMTMsMTAuNDcxLTkuMDk1LDEwLjUxMi05LjE0YzEuNzc3LTEuOTI3LDMuMzE5LTQuMDY5LDQuNTgzLTYuMzY2QzEyNy4xNDksNDI0LjU3LDEyNS4wNCw0MTcuMzAxLDExOS4yNTYsNDE0LjExOXoiIGZpbGw9IiMwMDAwMDAiLz4KCTwvZz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8L3N2Zz4K' />";
    }
  };

  if (fabric.PatternBrush) {
    var vLinePatternBrush = new fabric.PatternBrush(canvas);
    vLinePatternBrush.getPatternSrc = function() {

      var patternCanvas = fabric.document.createElement('canvas');
      patternCanvas.width = patternCanvas.height = 10;
      var ctx = patternCanvas.getContext('2d');

      ctx.strokeStyle = this.color;
      ctx.lineWidth = 5;
      ctx.beginPath();
      ctx.moveTo(0, 5);
      ctx.lineTo(10, 5);
      ctx.closePath();
      ctx.stroke();
        //savestate(); replcated with canvas on event
      return patternCanvas;
    };

    var hLinePatternBrush = new fabric.PatternBrush(canvas);
    hLinePatternBrush.getPatternSrc = function() {

      var patternCanvas = fabric.document.createElement('canvas');
      patternCanvas.width = patternCanvas.height = 10;
      var ctx = patternCanvas.getContext('2d');

      ctx.strokeStyle = this.color;
      ctx.lineWidth = 5;
      ctx.beginPath();
      ctx.moveTo(5, 0);
      ctx.lineTo(5, 10);
      ctx.closePath();
      ctx.stroke();
        //savestate(); replcated with canvas on event
      return patternCanvas;
    };

    var squarePatternBrush = new fabric.PatternBrush(canvas);
    squarePatternBrush.getPatternSrc = function() {

      var squareWidth = 10, squareDistance = 2;

      var patternCanvas = fabric.document.createElement('canvas');
      patternCanvas.width = patternCanvas.height = squareWidth + squareDistance;
      var ctx = patternCanvas.getContext('2d');

      ctx.fillStyle = this.color;
      ctx.fillRect(0, 0, squareWidth, squareWidth);
        //savestate(); replcated with canvas on event
      return patternCanvas;
    };

    var diamondPatternBrush = new fabric.PatternBrush(canvas);
    diamondPatternBrush.getPatternSrc = function() {

      var squareWidth = 10, squareDistance = 5;
      var patternCanvas = fabric.document.createElement('canvas');
      var rect = new fabric.Rect({
        width: squareWidth,
        height: squareWidth,
        angle: 45,
        fill: this.color
      });

      var canvasWidth = rect.getBoundingRect().width;

      patternCanvas.width = patternCanvas.height = canvasWidth + squareDistance;
      rect.set({ left: canvasWidth / 2, top: canvasWidth / 2 });

      var ctx = patternCanvas.getContext('2d');
      rect.render(ctx);
        //savestate(); replcated with canvas on event
      return patternCanvas;
    };

    var img = new Image();
    img.crossOrigin = "anonymous";
    img.src = '../img/texture.png';

    var texturePatternBrush = new fabric.PatternBrush(canvas);
    texturePatternBrush.source = img;
  }

  $('drawing-mode-selector').onchange = function() {

    if (this.value === 'hline') {
      canvas.freeDrawingBrush = vLinePatternBrush;
    }
    else if (this.value === 'vline') {
      canvas.freeDrawingBrush = hLinePatternBrush;
    }
    else if (this.value === 'square') {
      canvas.freeDrawingBrush = squarePatternBrush;
    }
    else if (this.value === 'diamond') {
      canvas.freeDrawingBrush = diamondPatternBrush;
    }
    else if (this.value === 'texture') {
      canvas.freeDrawingBrush = texturePatternBrush;
    }
    else {
      canvas.freeDrawingBrush = new fabric[this.value + 'Brush'](canvas);
    }

    if (canvas.freeDrawingBrush) {
      canvas.freeDrawingBrush.color = drawingColorEl.value;
      canvas.freeDrawingBrush.width = parseInt(drawingLineWidthEl.value, 10) || 1;
      canvas.freeDrawingBrush.shadow = new fabric.Shadow({
        blur: parseInt(drawingShadowWidth.value, 10) || 0,
        offsetX: 0,
        offsetY: 0,
        affectStroke: true,
        color: drawingShadowColorEl.value,
      });
      //savestate(); replcated with canvas on event
    }
  };

  drawingColorEl.onchange = function() {
    canvas.freeDrawingBrush.color = this.value;
  };
  drawingShadowColorEl.onchange = function() {
    canvas.freeDrawingBrush.shadow.color = this.value;
  };
  drawingLineWidthEl.onchange = function() {
    canvas.freeDrawingBrush.width = parseInt(this.value, 10) || 1;
    this.previousSibling.innerHTML = this.value;
  };
  drawingShadowWidth.onchange = function() {
    canvas.freeDrawingBrush.shadow.blur = parseInt(this.value, 10) || 0;
    this.previousSibling.innerHTML = this.value;
  };
  drawingShadowOffset.onchange = function() {
    canvas.freeDrawingBrush.shadow.offsetX = parseInt(this.value, 10) || 0;
    canvas.freeDrawingBrush.shadow.offsetY = parseInt(this.value, 10) || 0;
    this.previousSibling.innerHTML = this.value;
  };

  if (canvas.freeDrawingBrush) {
    canvas.freeDrawingBrush.color = drawingColorEl.value;
    canvas.freeDrawingBrush.width = parseInt(drawingLineWidthEl.value, 10) || 1;
    canvas.freeDrawingBrush.shadow = new fabric.Shadow({
      blur: parseInt(drawingShadowWidth.value, 10) || 0,
      offsetX: 0,
      offsetY: 0,
      affectStroke: true,
      color: drawingShadowColorEl.value,
    });
    //savestate(); replcated with canvas on event
  }
  
 ///
   /* canvas.on('mouse:wheel', function(opt) {
      var delta = opt.e.deltaY;
      var pointer = canvas.getPointer(opt.e);
      var zoom = canvas.getZoom();
      zoom = zoom + delta/10;
      if (zoom > 10) zoom = 10;
      if (zoom < 1) zoom = 1;
      canvas.zoomToPoint({ x: opt.e.offsetX, y: opt.e.offsetY }, zoom);
      opt.e.preventDefault();
      opt.e.stopPropagation();
    }); */
    
    function previewCanvas() {
      canvas.discardActiveObject(); canvas.renderAll();
      var dt = c.toDataURL('image/png');
      /* Change MIME type to trick the browser to downlaod the file instead of displaying it */
      //dt = dt.replace(/^data:image\/[^;]*/, 'data:application/octet-stream');

      /* In addition to <a>'s "download" attribute, you can define HTTP-style headers */
      //dt = dt.replace(/^data:application\/octet-stream/, 'data:application/octet-stream;headers=Content-Disposition%3A%20attachment%3B%20filename=Canvas.png');
    
      window.open(dt,'_blank');
    };
    preview.addEventListener('click', previewCanvas, false);
    
    function saveCanvas() {
      canvas.discardActiveObject(); canvas.renderAll();
      var dt = c.toDataURL('image/png');
      /* Change MIME type to trick the browser to downlaod the file instead of displaying it */
      dt = dt.replace(/^data:image\/[^;]*/, 'data:application/octet-stream');

      /* In addition to <a>'s "download" attribute, you can define HTTP-style headers */
      //dt = dt.replace(/^data:application\/octet-stream/, 'data:application/octet-stream;headers=Content-Disposition%3A%20attachment%3B%20filename=Canvas.png');
      var d = new Date();
      var n = d.getTime();

      this.download="sie"+n+".png";
      this.href=dt;
    };
    save.addEventListener('click', saveCanvas, false);
    
    var fonts = ["Pacifico", "VT323", "Quicksand", "Inconsolata", "Roboto", "Roboto Mono", "Amiri", "Cairo", "Changa", "Lalezar", "Tajawal", "IBM Plex Sans", "IBM Plex Sans Condensed", "IBM Plex Serif", "IBM Plex Mono", "Alegreya", "Alegreya Sans", "Merriweather", "Merriweather Sans", "Nunito", "Nunito Sans", "Quattrocento", "Quattrocento Sans", "Bungee", "Bungee Shade", "BioRhyme", "Fruktur", "Ewert", "Gravitas One", "Monoton", "Black Ops One", "Creepster", "Rubik", "Amiko", "Arima Madurai", "Farsan", "Lalezar", "Mogra", "Rakkas", "Rasa", "Shrikhand", "Suez One", "Yatra One", "Lateef", "El Messiri", "Scheherazade", "Reem Kufi", "Mada", "Lemonada", "Harmattan" , "Mirza", "Katibeh", "Rakkas", "Aref Ruqaa", "Baloo Bhaijaan", "Jomhuria"];
    

    addtext.onclick = function(){
        var all = document.getElementsByClassName("text");
        for (var i = 0; i < all.length; i++) {
          all[i].style.display = 'inherit';
        }
        var all = document.getElementsByClassName("draw");
        for (var i = 0; i < all.length; i++) {
          all[i].style.display = 'none';
        }
        var all = document.getElementsByClassName("intro");
        for (var i = 0; i < all.length; i++) {
          all[i].style.display = 'none';
        }
        
        canvas.isDrawingMode = false;isPicker=false;
            document.getElementById("drawing-mode").innerHTML = "<img src='data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTkuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iTGF5ZXJfMSIgeD0iMHB4IiB5PSIwcHgiIHZpZXdCb3g9IjAgMCA1MTIgNTEyIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA1MTIgNTEyOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgd2lkdGg9IjY0cHgiIGhlaWdodD0iNjRweCI+CjxnPgoJPGc+CgkJPHBhdGggZD0iTTUwNS4wMjUsMTkuNTQ5Yy0xNC42ODgtMTQuNjg2LTQ0LjE0Ni02LjMwNy05Mi43MDgsMjYuMzc3Yy00MS4yNTQsMjcuNzY2LTkwLjczOCw2OS44MTktMTM5LjMzNiwxMTguNDE3ICAgIGMtNzIuMDQ3LDcyLjA0Ni0xMjYuODIzLDE0Mi43ODQtMTQ1LjA2MSwxODYuNDU4Yy0zLjAwMi0xLjA4OC02LjExNS0xLjk1OC05LjMyNy0yLjU5M2MtMTguODcyLTMuNzMzLTM5LjM2OSwxLjA0LTU2LjIzOCwxMy4wODYgICAgYy0yNC4yMDcsMTcuMjg2LTMwLjYxOCw0MS45NzEtMzEuNTQ5LDQ2LjEzMmMtNS4wOTYsMTkuMDMyLTE0Ljc0NywzNy4xOTEtMjcuOTIxLDUyLjUyOWMtNC4yMzcsNC45MzMtMy43NTMsMTIuMzQ5LDEuMDksMTYuNjkxICAgIGMxNi45MjcsMTUuMTcsMzguNTgsMjIuNzc5LDYxLjEwMiwyMi43NzljMjEuNzA2LDAsNDQuMjItNy4wNjksNjQuMDc3LTIxLjI0OWM5LjMxMS02LjY0OSwxNi4zNi0xNC4wMDEsMTcuNzI1LTE1LjQ1NiAgICBjMTYuODcyLTE4LjEzMSwyNC4wMzYtNDEuOTA0LDIwLjQ4Mi02My42MjVjNDIuODUtMTUuMzYxLDExNy41NTMtNzIuMTgxLDE5Mi44NzEtMTQ3LjQ5OSAgICBjNDguNTk4LTQ4LjU5OCw5MC42NTItOTguMDgzLDExOC40MTctMTM5LjMzNkM1MTEuMzMyLDYzLjY5Niw1MTkuNzEzLDM0LjIzOCw1MDUuMDI1LDE5LjU0OXogTTEyOS4zOTIsNDQ2LjQxNSAgICBjLTAuNjQyLDAuNjg1LTYuNDk1LDYuODUyLTE0LjEzLDEyLjMwMmMtMjcuNzMyLDE5LjgtNjEuNjg0LDIyLjA5LTg2LjM0NSw2Ljg0NWMxMS41NDktMTUuODM0LDIwLjEzMi0zMy42ODMsMjUuMDYzLTUyLjI1NCAgICB2LTAuMDAxYzAuMDU1LTAuMjA4LDAuMTA1LTAuNDE4LDAuMTQ5LTAuNjNjMC4wNDEtMC4xODksNC4xOTMtMTkuMTI3LDIyLjExOS0zMS45MjdjMTEuNTMtOC4yMzUsMjUuMjc3LTExLjU0NywzNy43MTEtOS4wODkgICAgYzEwLjI1NSwyLjAyNiwxOC44NzYsNy44OCwyNC4yNzUsMTYuNDhDMTQ4LjgyOSw0MDUuMDE4LDE0NS4xMDQsNDI5LjUzMiwxMjkuMzkyLDQ0Ni40MTV6IE0xNTkuMjE3LDM3Ni42NjMgICAgYy0wLjI0NS0wLjQxLTMuODctNy43Ny0xMC42MjQtMTMuMjRjNS44MTktMTUuNTU3LDE4LjM0Ni0zNi41ODQsMzUuODA2LTYwLjcyOWwzNy40NTUsMzcuNDU1ICAgIEMxOTUuNTA1LDM1OS4xMTYsMTczLjkxNCwzNzEuNDgsMTU5LjIxNywzNzYuNjYzeiBNMjQxLjE5OCwzMjUuNjg1bC00Mi4zMDEtNDIuMzAxYzcuMzEtOS40MSwxNS4yMTktMTkuMTU3LDIzLjY0OC0yOS4xMjcgICAgbDQ3LjgwNiw0Ny44MDZDMjYwLjIzMywzMTAuNjA4LDI1MC40ODksMzE4LjQ5MywyNDEuMTk4LDMyNS42ODV6IE00NTUuMTU5LDEwNC4yNjZjLTI2LjkyNiwzOC45MTYtNjYuNjQzLDg1LjIzNS0xMTEuODMyLDEzMC40MjIgICAgYy0xOC45NzMsMTguOTczLTM3LjM2NywzNi4yMzItNTQuODQ0LDUxLjY5NGwtNTAuMjU3LTUwLjI1N2MxNS45NC0xOC4wMzIsMzMuMzItMzYuNTM4LDUxLjY2MS01NC44NzcgICAgYzQ1LjE4OC00NS4xODksOTEuNTA3LTg0LjkwNSwxMzAuNDIyLTExMS44MzRjNDcuOTE2LTMzLjE1NSw2NC40NS0zMy4yMDgsNjcuNjI2LTMyLjc3NCAgICBDNDg4LjM3MSwzOS44MTMsNDg4LjMxMyw1Ni4zNTMsNDU1LjE1OSwxMDQuMjY2eiIgZmlsbD0iIzAwMDAwMCIvPgoJPC9nPgo8L2c+CjxnPgoJPGc+CgkJPHBhdGggZD0iTTExOS4yNTYsNDE0LjExOWMtNS43ODMtMy4xODMtMTMuMDUyLTEuMDc2LTE2LjIzNiw0LjcwOGMtMC4zMjIsMC41ODUtMC43MTEsMS4xMzItMS4xNTgsMS42MjYgICAgYy0wLjg5NCwwLjkzLTMuODMyLDMuNzctNi44ODQsNS45NTFjLTQuNjMsMy4zMDUtOS42MjYsNS42NzQtMTQuODUsNy4wNDFjLTYuMzg3LDEuNjcxLTEwLjIwOSw4LjIwMy04LjUzOCwxNC41OSAgICBjMS40MDYsNS4zNzIsNi4yNSw4LjkzLDExLjU1NSw4LjkzYzEuMDAyLDAsMi4wMTktMC4xMjcsMy4wMzQtMC4zOTFjOC4wNDktMi4xMDYsMTUuNjg0LTUuNzEsMjIuNjkzLTEwLjcxNCAgICBjNC40OTktMy4yMTMsMTAuNDcxLTkuMDk1LDEwLjUxMi05LjE0YzEuNzc3LTEuOTI3LDMuMzE5LTQuMDY5LDQuNTgzLTYuMzY2QzEyNy4xNDksNDI0LjU3LDEyNS4wNCw0MTcuMzAxLDExOS4yNTYsNDE0LjExOXoiIGZpbGw9IiMwMDAwMDAiLz4KCTwvZz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8L3N2Zz4K' />";
        if(backgroundcolorchk.checked == false){textBackgroundColorSet = backgroundcolor.value}else{textBackgroundColorSet = "transparent"}
        var textbox = new fabric.Textbox('Add Text', {
          left: 50,
          top: 50,
          //width: 120,
          fontSize: fontsize.value,
          fill: fontcolor.value,
          fontFamily: fontfamily.options[fontfamily.selectedIndex].value,
          fontStyle: fontstyle.options[fontstyle.selectedIndex].value,
          textAlign: align.options[align.selectedIndex].value,
          textBackgroundColor: textBackgroundColorSet

        });
        canvas.add(textbox).setActiveObject(textbox);
        savestate(); // we still need this
    }

    fonts.unshift('Times New Roman');
    // Populate the fontFamily select
    var select = fontfamily;
    fonts.forEach(function(font) {
      var option = document.createElement('option');
      option.innerHTML = font;
      option.value = font;
      select.appendChild(option);
    });

    // Apply selected font on change
    fontfamily.onchange = function() {
      if (this.value !== 'Times New Roman') {
        loadAndUse(this.value);
      } else {
        canvas.getActiveObject().set("fontFamily", this.value);
        canvas.requestRenderAll(); savestate(); // we still need this
      }
    };
    
    fontcolor.onchange = function(){
          canvas.getActiveObject().set("fill", this.value);
          canvas.requestRenderAll(); savestate(); // we still need this
    }
    
    fontsize.onchange = function(){
          canvas.getActiveObject().set("fontSize", this.value);
          canvas.requestRenderAll(); savestate(); // we still need this
    }
    
    fontstyle.onchange = function(){
          canvas.getActiveObject().set("fontStyle", this.value);
          canvas.requestRenderAll(); savestate(); // we still need this
    }
    
    align.onchange = function(){
          canvas.getActiveObject().set("textAlign", this.value);
          canvas.requestRenderAll(); savestate(); // we still need this
    }
    
    backgroundcolor.onchange = function(){
        if(backgroundcolorchk.checked == false){
          canvas.getActiveObject().set("textBackgroundColor", this.value);
          canvas.requestRenderAll(); savestate(); // we still need this
        }else{
          canvas.getActiveObject().set("textBackgroundColor", "transparent");
          canvas.requestRenderAll(); savestate(); // we still need this
        }
    }
    
    backgroundcolorchk.onchange = function(){
        if(backgroundcolorchk.checked == false){
          canvas.getActiveObject().set("textBackgroundColor", backgroundcolor.value);
          canvas.requestRenderAll(); 
        }else{
          canvas.getActiveObject().set("textBackgroundColor", "transparent");
          canvas.requestRenderAll(); savestate(); // we still need this
        }
    }

    function loadAndUse(font) {
      var myfont = new FontFaceObserver(font)
      myfont.load()
        .then(function() {
          // when font is loaded, use it.
          canvas.getActiveObject().set("fontFamily", font);
          canvas.requestRenderAll(); savestate(); // we still need this
        }).catch(function(e) {
          //console.log(e)
          //alert('font loading failed ' + font);
        });
    }
    
    
    addimage.onclick = function(){
        canvas.isDrawingMode = false;isPicker=false;
            document.getElementById("drawing-mode").innerHTML = "<img src='data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTkuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iTGF5ZXJfMSIgeD0iMHB4IiB5PSIwcHgiIHZpZXdCb3g9IjAgMCA1MTIgNTEyIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA1MTIgNTEyOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgd2lkdGg9IjY0cHgiIGhlaWdodD0iNjRweCI+CjxnPgoJPGc+CgkJPHBhdGggZD0iTTUwNS4wMjUsMTkuNTQ5Yy0xNC42ODgtMTQuNjg2LTQ0LjE0Ni02LjMwNy05Mi43MDgsMjYuMzc3Yy00MS4yNTQsMjcuNzY2LTkwLjczOCw2OS44MTktMTM5LjMzNiwxMTguNDE3ICAgIGMtNzIuMDQ3LDcyLjA0Ni0xMjYuODIzLDE0Mi43ODQtMTQ1LjA2MSwxODYuNDU4Yy0zLjAwMi0xLjA4OC02LjExNS0xLjk1OC05LjMyNy0yLjU5M2MtMTguODcyLTMuNzMzLTM5LjM2OSwxLjA0LTU2LjIzOCwxMy4wODYgICAgYy0yNC4yMDcsMTcuMjg2LTMwLjYxOCw0MS45NzEtMzEuNTQ5LDQ2LjEzMmMtNS4wOTYsMTkuMDMyLTE0Ljc0NywzNy4xOTEtMjcuOTIxLDUyLjUyOWMtNC4yMzcsNC45MzMtMy43NTMsMTIuMzQ5LDEuMDksMTYuNjkxICAgIGMxNi45MjcsMTUuMTcsMzguNTgsMjIuNzc5LDYxLjEwMiwyMi43NzljMjEuNzA2LDAsNDQuMjItNy4wNjksNjQuMDc3LTIxLjI0OWM5LjMxMS02LjY0OSwxNi4zNi0xNC4wMDEsMTcuNzI1LTE1LjQ1NiAgICBjMTYuODcyLTE4LjEzMSwyNC4wMzYtNDEuOTA0LDIwLjQ4Mi02My42MjVjNDIuODUtMTUuMzYxLDExNy41NTMtNzIuMTgxLDE5Mi44NzEtMTQ3LjQ5OSAgICBjNDguNTk4LTQ4LjU5OCw5MC42NTItOTguMDgzLDExOC40MTctMTM5LjMzNkM1MTEuMzMyLDYzLjY5Niw1MTkuNzEzLDM0LjIzOCw1MDUuMDI1LDE5LjU0OXogTTEyOS4zOTIsNDQ2LjQxNSAgICBjLTAuNjQyLDAuNjg1LTYuNDk1LDYuODUyLTE0LjEzLDEyLjMwMmMtMjcuNzMyLDE5LjgtNjEuNjg0LDIyLjA5LTg2LjM0NSw2Ljg0NWMxMS41NDktMTUuODM0LDIwLjEzMi0zMy42ODMsMjUuMDYzLTUyLjI1NCAgICB2LTAuMDAxYzAuMDU1LTAuMjA4LDAuMTA1LTAuNDE4LDAuMTQ5LTAuNjNjMC4wNDEtMC4xODksNC4xOTMtMTkuMTI3LDIyLjExOS0zMS45MjdjMTEuNTMtOC4yMzUsMjUuMjc3LTExLjU0NywzNy43MTEtOS4wODkgICAgYzEwLjI1NSwyLjAyNiwxOC44NzYsNy44OCwyNC4yNzUsMTYuNDhDMTQ4LjgyOSw0MDUuMDE4LDE0NS4xMDQsNDI5LjUzMiwxMjkuMzkyLDQ0Ni40MTV6IE0xNTkuMjE3LDM3Ni42NjMgICAgYy0wLjI0NS0wLjQxLTMuODctNy43Ny0xMC42MjQtMTMuMjRjNS44MTktMTUuNTU3LDE4LjM0Ni0zNi41ODQsMzUuODA2LTYwLjcyOWwzNy40NTUsMzcuNDU1ICAgIEMxOTUuNTA1LDM1OS4xMTYsMTczLjkxNCwzNzEuNDgsMTU5LjIxNywzNzYuNjYzeiBNMjQxLjE5OCwzMjUuNjg1bC00Mi4zMDEtNDIuMzAxYzcuMzEtOS40MSwxNS4yMTktMTkuMTU3LDIzLjY0OC0yOS4xMjcgICAgbDQ3LjgwNiw0Ny44MDZDMjYwLjIzMywzMTAuNjA4LDI1MC40ODksMzE4LjQ5MywyNDEuMTk4LDMyNS42ODV6IE00NTUuMTU5LDEwNC4yNjZjLTI2LjkyNiwzOC45MTYtNjYuNjQzLDg1LjIzNS0xMTEuODMyLDEzMC40MjIgICAgYy0xOC45NzMsMTguOTczLTM3LjM2NywzNi4yMzItNTQuODQ0LDUxLjY5NGwtNTAuMjU3LTUwLjI1N2MxNS45NC0xOC4wMzIsMzMuMzItMzYuNTM4LDUxLjY2MS01NC44NzcgICAgYzQ1LjE4OC00NS4xODksOTEuNTA3LTg0LjkwNSwxMzAuNDIyLTExMS44MzRjNDcuOTE2LTMzLjE1NSw2NC40NS0zMy4yMDgsNjcuNjI2LTMyLjc3NCAgICBDNDg4LjM3MSwzOS44MTMsNDg4LjMxMyw1Ni4zNTMsNDU1LjE1OSwxMDQuMjY2eiIgZmlsbD0iIzAwMDAwMCIvPgoJPC9nPgo8L2c+CjxnPgoJPGc+CgkJPHBhdGggZD0iTTExOS4yNTYsNDE0LjExOWMtNS43ODMtMy4xODMtMTMuMDUyLTEuMDc2LTE2LjIzNiw0LjcwOGMtMC4zMjIsMC41ODUtMC43MTEsMS4xMzItMS4xNTgsMS42MjYgICAgYy0wLjg5NCwwLjkzLTMuODMyLDMuNzctNi44ODQsNS45NTFjLTQuNjMsMy4zMDUtOS42MjYsNS42NzQtMTQuODUsNy4wNDFjLTYuMzg3LDEuNjcxLTEwLjIwOSw4LjIwMy04LjUzOCwxNC41OSAgICBjMS40MDYsNS4zNzIsNi4yNSw4LjkzLDExLjU1NSw4LjkzYzEuMDAyLDAsMi4wMTktMC4xMjcsMy4wMzQtMC4zOTFjOC4wNDktMi4xMDYsMTUuNjg0LTUuNzEsMjIuNjkzLTEwLjcxNCAgICBjNC40OTktMy4yMTMsMTAuNDcxLTkuMDk1LDEwLjUxMi05LjE0YzEuNzc3LTEuOTI3LDMuMzE5LTQuMDY5LDQuNTgzLTYuMzY2QzEyNy4xNDksNDI0LjU3LDEyNS4wNCw0MTcuMzAxLDExOS4yNTYsNDE0LjExOXoiIGZpbGw9IiMwMDAwMDAiLz4KCTwvZz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8L3N2Zz4K' />";
        uploadimage.click();
    }
    
    setwhasimagebtn.onclick = function(){
        canvas.isDrawingMode = false;isPicker=false;
            document.getElementById("drawing-mode").innerHTML = "<img src='data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTkuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iTGF5ZXJfMSIgeD0iMHB4IiB5PSIwcHgiIHZpZXdCb3g9IjAgMCA1MTIgNTEyIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA1MTIgNTEyOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgd2lkdGg9IjY0cHgiIGhlaWdodD0iNjRweCI+CjxnPgoJPGc+CgkJPHBhdGggZD0iTTUwNS4wMjUsMTkuNTQ5Yy0xNC42ODgtMTQuNjg2LTQ0LjE0Ni02LjMwNy05Mi43MDgsMjYuMzc3Yy00MS4yNTQsMjcuNzY2LTkwLjczOCw2OS44MTktMTM5LjMzNiwxMTguNDE3ICAgIGMtNzIuMDQ3LDcyLjA0Ni0xMjYuODIzLDE0Mi43ODQtMTQ1LjA2MSwxODYuNDU4Yy0zLjAwMi0xLjA4OC02LjExNS0xLjk1OC05LjMyNy0yLjU5M2MtMTguODcyLTMuNzMzLTM5LjM2OSwxLjA0LTU2LjIzOCwxMy4wODYgICAgYy0yNC4yMDcsMTcuMjg2LTMwLjYxOCw0MS45NzEtMzEuNTQ5LDQ2LjEzMmMtNS4wOTYsMTkuMDMyLTE0Ljc0NywzNy4xOTEtMjcuOTIxLDUyLjUyOWMtNC4yMzcsNC45MzMtMy43NTMsMTIuMzQ5LDEuMDksMTYuNjkxICAgIGMxNi45MjcsMTUuMTcsMzguNTgsMjIuNzc5LDYxLjEwMiwyMi43NzljMjEuNzA2LDAsNDQuMjItNy4wNjksNjQuMDc3LTIxLjI0OWM5LjMxMS02LjY0OSwxNi4zNi0xNC4wMDEsMTcuNzI1LTE1LjQ1NiAgICBjMTYuODcyLTE4LjEzMSwyNC4wMzYtNDEuOTA0LDIwLjQ4Mi02My42MjVjNDIuODUtMTUuMzYxLDExNy41NTMtNzIuMTgxLDE5Mi44NzEtMTQ3LjQ5OSAgICBjNDguNTk4LTQ4LjU5OCw5MC42NTItOTguMDgzLDExOC40MTctMTM5LjMzNkM1MTEuMzMyLDYzLjY5Niw1MTkuNzEzLDM0LjIzOCw1MDUuMDI1LDE5LjU0OXogTTEyOS4zOTIsNDQ2LjQxNSAgICBjLTAuNjQyLDAuNjg1LTYuNDk1LDYuODUyLTE0LjEzLDEyLjMwMmMtMjcuNzMyLDE5LjgtNjEuNjg0LDIyLjA5LTg2LjM0NSw2Ljg0NWMxMS41NDktMTUuODM0LDIwLjEzMi0zMy42ODMsMjUuMDYzLTUyLjI1NCAgICB2LTAuMDAxYzAuMDU1LTAuMjA4LDAuMTA1LTAuNDE4LDAuMTQ5LTAuNjNjMC4wNDEtMC4xODksNC4xOTMtMTkuMTI3LDIyLjExOS0zMS45MjdjMTEuNTMtOC4yMzUsMjUuMjc3LTExLjU0NywzNy43MTEtOS4wODkgICAgYzEwLjI1NSwyLjAyNiwxOC44NzYsNy44OCwyNC4yNzUsMTYuNDhDMTQ4LjgyOSw0MDUuMDE4LDE0NS4xMDQsNDI5LjUzMiwxMjkuMzkyLDQ0Ni40MTV6IE0xNTkuMjE3LDM3Ni42NjMgICAgYy0wLjI0NS0wLjQxLTMuODctNy43Ny0xMC42MjQtMTMuMjRjNS44MTktMTUuNTU3LDE4LjM0Ni0zNi41ODQsMzUuODA2LTYwLjcyOWwzNy40NTUsMzcuNDU1ICAgIEMxOTUuNTA1LDM1OS4xMTYsMTczLjkxNCwzNzEuNDgsMTU5LjIxNywzNzYuNjYzeiBNMjQxLjE5OCwzMjUuNjg1bC00Mi4zMDEtNDIuMzAxYzcuMzEtOS40MSwxNS4yMTktMTkuMTU3LDIzLjY0OC0yOS4xMjcgICAgbDQ3LjgwNiw0Ny44MDZDMjYwLjIzMywzMTAuNjA4LDI1MC40ODksMzE4LjQ5MywyNDEuMTk4LDMyNS42ODV6IE00NTUuMTU5LDEwNC4yNjZjLTI2LjkyNiwzOC45MTYtNjYuNjQzLDg1LjIzNS0xMTEuODMyLDEzMC40MjIgICAgYy0xOC45NzMsMTguOTczLTM3LjM2NywzNi4yMzItNTQuODQ0LDUxLjY5NGwtNTAuMjU3LTUwLjI1N2MxNS45NC0xOC4wMzIsMzMuMzItMzYuNTM4LDUxLjY2MS01NC44NzcgICAgYzQ1LjE4OC00NS4xODksOTEuNTA3LTg0LjkwNSwxMzAuNDIyLTExMS44MzRjNDcuOTE2LTMzLjE1NSw2NC40NS0zMy4yMDgsNjcuNjI2LTMyLjc3NCAgICBDNDg4LjM3MSwzOS44MTMsNDg4LjMxMyw1Ni4zNTMsNDU1LjE1OSwxMDQuMjY2eiIgZmlsbD0iIzAwMDAwMCIvPgoJPC9nPgo8L2c+CjxnPgoJPGc+CgkJPHBhdGggZD0iTTExOS4yNTYsNDE0LjExOWMtNS43ODMtMy4xODMtMTMuMDUyLTEuMDc2LTE2LjIzNiw0LjcwOGMtMC4zMjIsMC41ODUtMC43MTEsMS4xMzItMS4xNTgsMS42MjYgICAgYy0wLjg5NCwwLjkzLTMuODMyLDMuNzctNi44ODQsNS45NTFjLTQuNjMsMy4zMDUtOS42MjYsNS42NzQtMTQuODUsNy4wNDFjLTYuMzg3LDEuNjcxLTEwLjIwOSw4LjIwMy04LjUzOCwxNC41OSAgICBjMS40MDYsNS4zNzIsNi4yNSw4LjkzLDExLjU1NSw4LjkzYzEuMDAyLDAsMi4wMTktMC4xMjcsMy4wMzQtMC4zOTFjOC4wNDktMi4xMDYsMTUuNjg0LTUuNzEsMjIuNjkzLTEwLjcxNCAgICBjNC40OTktMy4yMTMsMTAuNDcxLTkuMDk1LDEwLjUxMi05LjE0YzEuNzc3LTEuOTI3LDMuMzE5LTQuMDY5LDQuNTgzLTYuMzY2QzEyNy4xNDksNDI0LjU3LDEyNS4wNCw0MTcuMzAxLDExOS4yNTYsNDE0LjExOXoiIGZpbGw9IiMwMDAwMDAiLz4KCTwvZz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8L3N2Zz4K' />";
        uploadimage2.click();
    }

    uploadimage.addEventListener("change", function (e) {
      var file = e.target.files[0];
      var reader = new FileReader();
      reader.onload = function (f) {
        var data = f.target.result;                    
        fabric.Image.fromURL(data, function (img) {
          var oImg = img.set({left: 0, top: 0, angle: 0}).scale(1);
          canvas.add(oImg).renderAll();
          var a = canvas.setActiveObject(oImg);
          var dataURL = canvas.toDataURL({format: 'png', quality: 1});
        });
      };
      reader.readAsDataURL(file);
      setTimeout(function(){
        savestate(); // we still need this
      }, 200);
    });
    
    uploadimage2.addEventListener("change", function (e) {
      var file = e.target.files[0];
      var reader = new FileReader();
      reader.onload = function (f) {
        var data = f.target.result;                    
        fabric.Image.fromURL(data, function (img) {
          var oImg = img.set({left: 0, top: 0, angle: 0}).scale(1);
          canvas.add(oImg).renderAll();
          var a = canvas.setActiveObject(oImg);
          var dataURL = canvas.toDataURL({format: 'png', quality: 1});
        });
      };
      reader.readAsDataURL(file);
      setTimeout(function(){
        nw=parseInt(canvas.getActiveObject().width);
        nh=parseInt(canvas.getActiveObject().height);
        canvas.setHeight(nh);
        canvas.setWidth(nw);
        canvas.renderAll();
        savestate(); // we still need this
        info.innerHTML=nw+"px x "+nh+"px";
        defaultpos.click();
      }, 200);
    });

    function rgbToHex(r, g, b) {
    if (r > 255 || g > 255 || b > 255)
        throw "Invalid color component";
    return ((r << 16) | (g << 8) | b).toString(16);
    }
    
    area.onclick = function(){
              isPicker=false;
    };

    changesize.onclick = function(){
        ow=canvas.getWidth();
        oh=canvas.getHeight();
        var nw = prompt("Width:", ow);
        var nh = prompt("Height:", oh);
        if(nw == null || !Number(nw)){
            nw = ow;
        }
        if(nh == null || !Number(nh)){
            nh = oh;
        }
        canvas.setHeight(nh);
        canvas.setWidth(nw);
        canvas.renderAll();//savestate(); replcated with canvas on event
        info.innerHTML=nw+"px x "+nh+"px";
    };

    inversesize.onclick = function(){
        ow=canvas.getWidth();
        oh=canvas.getHeight();
        canvas.setHeight(ow);
        canvas.setWidth(oh);
        canvas.renderAll();//savestate(); replcated with canvas on event
        info.innerHTML=oh+"px x "+ow+"px";
    };
    
    colorpicker.onclick = function(){
        var all = document.getElementsByClassName("intro");
        for (var i = 0; i < all.length; i++) {
          all[i].style.display = 'inherit';
        }
        var all = document.getElementsByClassName("text");
        for (var i = 0; i < all.length; i++) {
          all[i].style.display = 'none';
        }
        var all = document.getElementsByClassName("draw");
        for (var i = 0; i < all.length; i++) {
          all[i].style.display = 'none';
        }
        isPicker=true;
        canvas.isDrawingMode = false;
            document.getElementById("drawing-mode").innerHTML = "<img src='data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTkuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iTGF5ZXJfMSIgeD0iMHB4IiB5PSIwcHgiIHZpZXdCb3g9IjAgMCA1MTIgNTEyIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA1MTIgNTEyOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgd2lkdGg9IjY0cHgiIGhlaWdodD0iNjRweCI+CjxnPgoJPGc+CgkJPHBhdGggZD0iTTUwNS4wMjUsMTkuNTQ5Yy0xNC42ODgtMTQuNjg2LTQ0LjE0Ni02LjMwNy05Mi43MDgsMjYuMzc3Yy00MS4yNTQsMjcuNzY2LTkwLjczOCw2OS44MTktMTM5LjMzNiwxMTguNDE3ICAgIGMtNzIuMDQ3LDcyLjA0Ni0xMjYuODIzLDE0Mi43ODQtMTQ1LjA2MSwxODYuNDU4Yy0zLjAwMi0xLjA4OC02LjExNS0xLjk1OC05LjMyNy0yLjU5M2MtMTguODcyLTMuNzMzLTM5LjM2OSwxLjA0LTU2LjIzOCwxMy4wODYgICAgYy0yNC4yMDcsMTcuMjg2LTMwLjYxOCw0MS45NzEtMzEuNTQ5LDQ2LjEzMmMtNS4wOTYsMTkuMDMyLTE0Ljc0NywzNy4xOTEtMjcuOTIxLDUyLjUyOWMtNC4yMzcsNC45MzMtMy43NTMsMTIuMzQ5LDEuMDksMTYuNjkxICAgIGMxNi45MjcsMTUuMTcsMzguNTgsMjIuNzc5LDYxLjEwMiwyMi43NzljMjEuNzA2LDAsNDQuMjItNy4wNjksNjQuMDc3LTIxLjI0OWM5LjMxMS02LjY0OSwxNi4zNi0xNC4wMDEsMTcuNzI1LTE1LjQ1NiAgICBjMTYuODcyLTE4LjEzMSwyNC4wMzYtNDEuOTA0LDIwLjQ4Mi02My42MjVjNDIuODUtMTUuMzYxLDExNy41NTMtNzIuMTgxLDE5Mi44NzEtMTQ3LjQ5OSAgICBjNDguNTk4LTQ4LjU5OCw5MC42NTItOTguMDgzLDExOC40MTctMTM5LjMzNkM1MTEuMzMyLDYzLjY5Niw1MTkuNzEzLDM0LjIzOCw1MDUuMDI1LDE5LjU0OXogTTEyOS4zOTIsNDQ2LjQxNSAgICBjLTAuNjQyLDAuNjg1LTYuNDk1LDYuODUyLTE0LjEzLDEyLjMwMmMtMjcuNzMyLDE5LjgtNjEuNjg0LDIyLjA5LTg2LjM0NSw2Ljg0NWMxMS41NDktMTUuODM0LDIwLjEzMi0zMy42ODMsMjUuMDYzLTUyLjI1NCAgICB2LTAuMDAxYzAuMDU1LTAuMjA4LDAuMTA1LTAuNDE4LDAuMTQ5LTAuNjNjMC4wNDEtMC4xODksNC4xOTMtMTkuMTI3LDIyLjExOS0zMS45MjdjMTEuNTMtOC4yMzUsMjUuMjc3LTExLjU0NywzNy43MTEtOS4wODkgICAgYzEwLjI1NSwyLjAyNiwxOC44NzYsNy44OCwyNC4yNzUsMTYuNDhDMTQ4LjgyOSw0MDUuMDE4LDE0NS4xMDQsNDI5LjUzMiwxMjkuMzkyLDQ0Ni40MTV6IE0xNTkuMjE3LDM3Ni42NjMgICAgYy0wLjI0NS0wLjQxLTMuODctNy43Ny0xMC42MjQtMTMuMjRjNS44MTktMTUuNTU3LDE4LjM0Ni0zNi41ODQsMzUuODA2LTYwLjcyOWwzNy40NTUsMzcuNDU1ICAgIEMxOTUuNTA1LDM1OS4xMTYsMTczLjkxNCwzNzEuNDgsMTU5LjIxNywzNzYuNjYzeiBNMjQxLjE5OCwzMjUuNjg1bC00Mi4zMDEtNDIuMzAxYzcuMzEtOS40MSwxNS4yMTktMTkuMTU3LDIzLjY0OC0yOS4xMjcgICAgbDQ3LjgwNiw0Ny44MDZDMjYwLjIzMywzMTAuNjA4LDI1MC40ODksMzE4LjQ5MywyNDEuMTk4LDMyNS42ODV6IE00NTUuMTU5LDEwNC4yNjZjLTI2LjkyNiwzOC45MTYtNjYuNjQzLDg1LjIzNS0xMTEuODMyLDEzMC40MjIgICAgYy0xOC45NzMsMTguOTczLTM3LjM2NywzNi4yMzItNTQuODQ0LDUxLjY5NGwtNTAuMjU3LTUwLjI1N2MxNS45NC0xOC4wMzIsMzMuMzItMzYuNTM4LDUxLjY2MS01NC44NzcgICAgYzQ1LjE4OC00NS4xODksOTEuNTA3LTg0LjkwNSwxMzAuNDIyLTExMS44MzRjNDcuOTE2LTMzLjE1NSw2NC40NS0zMy4yMDgsNjcuNjI2LTMyLjc3NCAgICBDNDg4LjM3MSwzOS44MTMsNDg4LjMxMyw1Ni4zNTMsNDU1LjE1OSwxMDQuMjY2eiIgZmlsbD0iIzAwMDAwMCIvPgoJPC9nPgo8L2c+CjxnPgoJPGc+CgkJPHBhdGggZD0iTTExOS4yNTYsNDE0LjExOWMtNS43ODMtMy4xODMtMTMuMDUyLTEuMDc2LTE2LjIzNiw0LjcwOGMtMC4zMjIsMC41ODUtMC43MTEsMS4xMzItMS4xNTgsMS42MjYgICAgYy0wLjg5NCwwLjkzLTMuODMyLDMuNzctNi44ODQsNS45NTFjLTQuNjMsMy4zMDUtOS42MjYsNS42NzQtMTQuODUsNy4wNDFjLTYuMzg3LDEuNjcxLTEwLjIwOSw4LjIwMy04LjUzOCwxNC41OSAgICBjMS40MDYsNS4zNzIsNi4yNSw4LjkzLDExLjU1NSw4LjkzYzEuMDAyLDAsMi4wMTktMC4xMjcsMy4wMzQtMC4zOTFjOC4wNDktMi4xMDYsMTUuNjg0LTUuNzEsMjIuNjkzLTEwLjcxNCAgICBjNC40OTktMy4yMTMsMTAuNDcxLTkuMDk1LDEwLjUxMi05LjE0YzEuNzc3LTEuOTI3LDMuMzE5LTQuMDY5LDQuNTgzLTYuMzY2QzEyNy4xNDksNDI0LjU3LDEyNS4wNCw0MTcuMzAxLDExOS4yNTYsNDE0LjExOXoiIGZpbGw9IiMwMDAwMDAiLz4KCTwvZz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8L3N2Zz4K' />";
        var ctx = c.getContext("2d");
        canvas.on('mouse:move', function(e) {
            if (isPicker) {
          // get the current mouse position
          
          var mouse = canvas.getPointer(e.e);
          var x = parseInt(mouse.x);
          var y = parseInt(mouse.y);
        
          // get the color array for the pixel under the mouse
          var px = ctx.getImageData(x, y, 1, 1).data;
          var hex = "#" + ("000000" + rgbToHex(px[0], px[1], px[2])).slice(-6);
          // report that pixel data
              if((px[0] != 0) || (px[1] != 0) || (px[2] != 0) || (px[3] != 0)){
              document.getElementById("colorpicker").style.background = hex;
              document.getElementById("status").innerHTML = hex;
              }else{
              document.getElementById("colorpicker").style.background = "transparent";
              document.getElementById("status").innerHTML = "transparent";
              }
              
            }
        });
    }
    
    var buttons = document.getElementsByClassName('realcolorswitch');

    for (var i = 0; i < buttons.length; i++){
        buttons[i].onclick = function(){
            var background = window.getComputedStyle(this, null).getPropertyValue("background-color");
            canvas.setBackgroundColor(background, canvas.renderAll.bind(canvas));
            savestate(); // we still need this
        };
    }
    
    var buttons = document.getElementsByClassName('filter');

    for (var i = 0; i < buttons.length; i++){
        buttons[i].onclick = function(){
            canvas.discardActiveObject(); canvas.renderAll();//savestate(); replcated with canvas on event
            var type=this.id;
            filter(geturl(),type);
            setTimeout(function(){
            canvas.clear();
            var background=document.getElementById("imgtmp").src;
            var data = background;                    
            fabric.Image.fromURL(data, function (img) {
              var oImg = img.set({left: 0, top: 0, angle: 0}).scale(1);
              canvas.add(oImg).renderAll();//savestate(); replcated with canvas on event
              var a = canvas.setActiveObject(oImg);
              var dataURL = canvas.toDataURL({format: 'png', quality: 1});
            });
            savestate(); // we still need this
            /*canvas.setBackgroundImage(background, canvas.renderAll.bind(canvas));*/
            }, 1000);
        };
    }

})();
