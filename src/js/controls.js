function zoomin(){
    var scaled = $("canvas");
    var matrixRegex = /matrix\((-?\d*\.?\d+),\s*0,\s*0,\s*(-?\d*\.?\d+),\s*0,\s*0\)/;
    var matches = scaled.css('transform').match(matrixRegex);
    var ratio1 = matches[1];
    var ratio2 = matches[2];
    ratio1 = Number(ratio1) + Number((ratio1/10));
    ratio2 = Number(ratio2) + Number((ratio2/10));
    scaled.css({
        'transform': 'scale(' + ratio1 + ', ' + ratio2 + ')',
        'transform-origin': 'top left'
    });
    scale0();
    scale3();
    scale4();
}
        
function zoomout(){
    var scaled = $("canvas");
    var matrixRegex = /matrix\((-?\d*\.?\d+),\s*0,\s*0,\s*(-?\d*\.?\d+),\s*0,\s*0\)/;
    var matches = scaled.css('transform').match(matrixRegex);
    var ratio1 = matches[1];
    var ratio2 = matches[2];
    ratio1 = Number(ratio1) - Number((ratio1/10));
    ratio2 = Number(ratio2) - Number((ratio2/10));
    scaled.css({
        'transform': 'scale(' + ratio1 + ', ' + ratio2 + ')',
        'transform-origin': 'top left'
    });
    scale0();
    scale3();
    scale4();
}

$("#defaultpos").click(function(){
    $("#area").css("top", 0);
    $("#area").css("left", 0);
    scale();
    scale2();
    scale3();
    scale4();
});

$("#zoomin").click(function(){
    zoomin();
});

$("#zoomout").click(function(){
    zoomout();
});

$("#totheleft").click(function(){
    left=$("#area").css("left");
    left = parseFloat(left) + 50;
    $("#area").css("left", left);
});

$("#totheright").click(function(){
    left=$("#area").css("left");
    left = parseFloat(left) - 50;
    $("#area").css("left", left);
});

$("#totop").click(function(){
    ttop=$("#area").css("top");
    ttop = parseFloat(ttop) + 50;
    $("#area").css("top", ttop);
});

$("#tobottom").click(function(){
    ttop=$("#area").css("top");
    ttop = parseFloat(ttop) - 50;
    $("#area").css("top", ttop);
});

$(".colorswitch").click(function(){
    background=$(this).css("background-color");
    $("#prearea").css("background-color", background);
    //$("body").css("background-color", background);
});

// wrapper from editor js for canvas sizing function
$("#changesize").click(function(){
    $("#defaultpos").click();
});
$("#inversesize").click(function(){
    $("#defaultpos").click();
});

function geturl(){
    var canvas=$("#c")[0];
    url=canvas.toDataURL();
    return url;
}

function filter(url, type){
    var imgObj = document.getElementById('imgtmp');
    imgObj.src = url;
    imgObj.setAttribute('crossOrigin','anonymous');
    setTimeout(function(){
    filterous.importImage(imgObj, {scale: 1,  format: "png"})
      .applyInstaFilter(type)
      .renderHtml(imgObj);
    }, 177);
}

$("#defaultpos2").click(function(){
    $("#defaultpos").click();
});

// menu functions
$("#newimage").click(function(){
    $("#clear-canvas").click();
    $("#changesize").click();
    $("#defaultpos").click();
});
$("#previewimage").click(function(){
    $("#preview").click();
});
$("#saveimage").click(function(){
    var elem = document.getElementById('save');

    var support = true;
    
    try {
        if (new MouseEvent('click', {bubbles: false}).bubbles !== false) {
            support = false;
        } else if (new MouseEvent('click', {bubbles: true}).bubbles !== true) {
            support = false;
        }
    } catch (e) {
        support = false;
    }
        var event;
        if (support) {
            event = new MouseEvent('click');
        }else{
            event = document.createEvent('Event');
            event.initEvent('click', true, true);
        }
        elem.dispatchEvent(event);
});
$("#exit").click(function(){
    location.href="http://abdelhafidh.com";
});
$("#mundo").click(function(){
    if($('#undo').prop('disabled')===false) $("#undo").click();
});
$("#mredo").click(function(){
    if($('#redo').prop('disabled')===false) $("#redo").click();
});
$("#mchangesize").click(function(){
    $("#changesize").click();
    $("#defaultpos").click();
});
$("#minversesize").click(function(){
    $("#inversesize").click();
    $("#defaultpos").click();
});
$("#minserttext").click(function(){
    $("#addtext").click();
});
$("#minsertimage").click(function(){
    $("#addimage").click();
});
$("#mabout").click(function(){
    window.open("http://abdelhafidh.com", '_blank');
});
$("#importimage").click(function(){
    $("#clear-canvas").click();
    $("#setwhasimagebtn").click();
});
$("#mdel").click(function(){
    $("#deletebtn").click();
});
$('html').keyup(function(e){
    if(e.keyCode == 46) {
        $("#deletebtn").click();
    }
    if(e.keyCode == 112) {
        $("#mabout").click();
    }
});
$(document).keydown(function(e){
    if( e.which === 90 && e.ctrlKey && !e.shiftKey ){
        if($('#undo').prop('disabled')===false) $("#undo").click();
    } 
    if( e.which === 90 && e.ctrlKey && e.shiftKey ){
        if($('#redo').prop('disabled')===false) $("#redo").click();
    }
});
// FONT PREVIEW
function fontpreviewfnct(){
    $("#fontpreview").html("");
    $("#fontfamily > option").each(function() {
        $("#fontpreview").append('<h3 class="fontpreviewselect" style="font-family: '+this.value+';">It is '+this.value+', مرحبا يا عالم</h3>');
    });
    $( "#fontpreview" ).dialog({
      height: 400,
      width: "100%"
    });
    prefontpreview();
}

$("#fontfamily").click(function(e){
    e.preventDefault();
    fontpreviewfnct();
});
// start
$("#startii").click(function(){
    $("#importimage").click();
    $("#overlay").hide();
});
$("#startsfs").click(function(){
    $("#newimage").click();
    $("#overlay").hide();
});

// init
$("#defaultpos").click();