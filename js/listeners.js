//-------------------
//  ONCLICK HANDLERS
//-------------------

$(window).resize(function () {
    docHeight = $( window ).height();
    docWidth = $( window ).width();

    console.log("docHeight = " + docHeight + "\tdocWidth = " +  docWidth);
    $( "#canvas" ).attr("width", docWidth + "px")
                .attr("height", docHeight + "px");

    w = $('#canvas').attr("width");
    w = parseInt(w.substring(0, w.length - 2));
    h = $('#canvas').attr("height");
    h = parseInt(h.substring(0, h.length - 2));

    redrawCanvas();
});

$("a#rotate").on('click', function(e) {
    angle += 90;
    // clear canvas
    context.fillStyle = "#555";
    context.fillRect(0,0,w,h);
    // save canvas matrixs
    context.save();
    // Translate to the center point of our image
    if (myImage) {
       context.translate(imgX + myImage.width * imgScale * 0.5, imgY + myImage.height * imgScale * 0.5);
       // Perform the rotation
       context.rotate(angle * Math.PI / 180);
       // Translate back to the top left of our image
       context.translate(-myImage.width * imgScale * 0.5, -myImage.height * imgScale * 0.5);
       // Finally we draw the image
       context.drawImage(myImage, 0, 0, myImage.width*imgScale, myImage.height*imgScale);
       //context.drawImage(myImage, 0, 0);
       grayScale();
    }
    // And restore the context to clear and matrix changes  
    context.restore();
    context.drawImage(border,0,0,w,h);
    // -- debug -- console.log("Rotated!"); console.log("Angle: " + angle);
});

$("a#save").on('click', function(e) {
    e.preventDefault();
    var dataURL = canvas.toDataURL();
    var win = window;
    win.title = "MyTime";
    win.open().document.write('<img width="' + w +'" height="' + h + '" src="' + dataURL + '"/>');

});

$("a#donebtn").on('click', function(e) {
    e.preventDefault();
    $("div.textFormContent").slideToggle(150);
});

$("#cameraBtn").click(function() {
    console.log("camera button clicked");
    $("#file-input").click();
});

$("#toggleMenu").click(function(e) {
    e.preventDefault();
    $("div.menuBar").slideToggle(150);
});

$("#toggleDialog").click(function(e) {
    e.preventDefault();
    $("div.textFormContent").slideToggle(150);
});

$("#yearIn").on('change', function() {
    yearIn = $("#yearIn").val();
    redrawCanvas();
});

$("#messageIn").on('change', function() {
    messageIn = $("#messageIn").val();
    redrawCanvas();
});

$("#toggleLayout").on('click', function() {
    if (layout === "york") {
        layout = "lassonde";
        border.src = './assets/frame_lassonde.png';
        redrawCanvas();
    } else if (layout === "lassonde") {
        layout = "york";
        border.src = './assets/MyTimeAsset.png';
        redrawCanvas();
    }
});

$("#rotate, #toggleLayout").on('click', function() {
    var $this;
    $this = $(this).children();
    $(this).children().animate({
        width: 90,
        height: 90
     }, 150, function() {
        $this.animate({
            width: 75,
            height: 75
        }, 100, function() {
        // Animation complete.
    });
  });
}); 