//-------------------
//  FIELDS
//-------------------
var $img = new Image();
var myImage;
var angle = 0;

var docHeight, docWidth;
var border = new Image();

var imgX=0, imgY=0;
var imgOldX=0, imgOldY=0;
var imgWidth, imgHeight;

var canvas;
var context;

var w, h;

var imgScale = 1.0;

var yearIn, messageIn;

//-------------------
//  CONSTRUCTOR
//-------------------
/*(function() {
    canvas = $('#canvas')[0];
    context = canvas.getContext('2d');
    border.src = 'MyTimeAsset.png';

	docHeight = $( window ).height();
	docWidth = $( window ).width();

	console.log("docHeight = " + docHeight + "\tdocWidth = " +  docWidth);
	$( "#canvas" ).attr("width", docWidth + "px")
                .attr("height", docHeight + "px");

    w = $('#canvas').attr("width");
    w = w.substring(0, w.length - 2);
    h = $('#canvas').attr("height");
    h = h.substring(0, h.length - 2);
    console.log("canvasw: " + w + "\tcanvash: " + h);
    // prevent scrolling on some devices
    $('body').on('touchmove', function(e) {
        e.preventDefault();
    });
})();*/

$(document).ready(function() {
    canvas = $('#canvas')[0];
    context = canvas.getContext('2d');
    border.src = './assets/MyTimeAsset.png';

    docHeight = $( window ).height();
    docWidth = $( window ).width();

    console.log("docHeight = " + docHeight + "\tdocWidth = " +  docWidth);
    $( "#canvas" ).attr("width", docWidth + "px")
                .attr("height", docHeight + "px");

    w = $('#canvas').attr("width");
    w = w.substring(0, w.length - 2);
    h = $('#canvas').attr("height");
    h = h.substring(0, h.length - 2);
    console.log("canvasw: " + w + "\tcanvash: " + h);
    // prevent scrolling on some devices
    $('body').on('touchmove', function(e) {
        e.preventDefault();
    });
});

$(function() {
	context.fillStyle = "#9ea7b8";
	context.fillRect(0,0,w,h);

    $('#file-input').change(function(e) {
        var file = e.target.files[0],
            imageType = /image.*/;
        
        if (!file.type.match(imageType))
            return;
        
        var reader = new FileReader();
        reader.onload = fileOnload;
        reader.readAsDataURL(file);
        
    });
    
    // draw image on canvas as soon as file input is received
    function fileOnload(e) {
        $img = $('<img>', { src: e.target.result });
        console.log($img[0]);
		$img.load(function() {
        	context.drawImage(this, 0, 0);
        	myImage = this;
        	context.drawImage(border,0,0,w,h);
            imgWidth = myImage.width;
            imgHeight = myImage.height;
        });
    }

    border.onload = function() {
    	context.drawImage(border,0,0,w,h);
    };
});


//-------------------
//  ONCLICK HANDLERS
//-------------------
$("a#rotate").on('click', function(e) {
    angle += 90;
    // clear canvas
    context.fillStyle = "#9ea7b8";
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
    $("div.textForm").hide();
    yearIn = $("#yearIn").val();
    messageIn = $("#messageIn").val();
});

$("#cameraBtn").click(function(){
    console.log("camera button clicked");
    $("#file-input").click();
});



//-------------------
//  HAMMER MULTITOUCH HANDLERS
//-------------------
var element = document.getElementById('canvas');
var hammertime1 = Hammer(element).on("drag", function(event) {
    var dx = event.gesture.deltaX;
    var dy = event.gesture.deltaY;
    console.log(dx + "\t" + dy);
    // clear canvas
    context.fillStyle = "#9ea7b8";
    context.fillRect(0,0,w,h);
    // save canvas matrix
    context.save();
    // Translate to the center point of our image
    if (myImage) {
        console.log("REACHED MY IMAGE");
        context.translate(imgX + dx + myImage.width * imgScale * 0.5, imgY + dy + myImage.height * imgScale * 0.5);
        // Perform the rotation
        context.rotate(angle * Math.PI / 180);
        // -- debug -- console.log(angle * Math.PI / 180);
        // Translate back to the top left of our image
        context.translate(-myImage.width * imgScale * 0.5, -myImage.height * imgScale * 0.5);
        // Finally we draw the image
        //context.scale(imgScale,imgScale);
        context.drawImage(myImage, 0, 0, myImage.width*imgScale, myImage.height*imgScale);
        // set image to grayscale
        grayScale();
    }
    // And restore the context ready for the next loop
    context.restore();
    context.drawImage(border,0,0,w,h);

    // Initialize some variables for text drawing
    var maxWidth = w/3;
    var lineHeight = 30;
    var x = 20;
    var y = h/2;
    // MURICA
    var text = yearIn + ": " + messageIn;

    context.font = '2em Helvetica';
    context.fillStyle = '#ffffff';

    wrapText(context, text, x, y, maxWidth, lineHeight);
}).on("dragend", function(event) {
    var dx = event.gesture.deltaX;
    var dy = event.gesture.deltaY;
    // -- debug -- alert("Drags has ended! dx=" + dx + " dy=" + dy);
    imgX += dx;
    imgY += dy;
});

var hammertime2 = Hammer(element).on("transform", function(event) {
    var scale = event.gesture.scale;
    // clear canvas
    context.fillStyle = "#9ea7b8";
    context.fillRect(0,0,w,h);
    // save canvas matrix
    context.save();
    imgScale = scale;
    if (myImage) {
        context.translate(imgX + myImage.width * 0.5, imgY + myImage.height * 0.5);
        // Perform the rotation
        context.rotate(angle * Math.PI / 180);
        // -- debug -- console.log(angle * Math.PI / 180);
        // Translate back to the top left of our image
        context.translate(-myImage.width * 0.5, -myImage.height * 0.5);
        // Finally we draw the image
        context.scale(scale,scale);
        context.drawImage(myImage, 0, 0);
    }
    context.restore();
    context.drawImage(border,0,0,w,h);
});


//-------------------
//  HELPER METHODS
//-------------------
// wrapText() allows text to be wrapped in a given width
function wrapText(context, text, x, y, maxWidth, lineHeight) {
    var words = text.split(' ');
    var line = '';
    y += lineHeight;
    for(var n = 0; n < words.length; n++) {
        var testLine = line + words[n] + ' ';
        var metrics = context.measureText(testLine);
        console.log("font height: " + metrics.emHeightAscent);
        var testWidth = metrics.width;
        if (testWidth > maxWidth && n > 0) {
            context.fillText(line, x, y);
            line = words[n] + ' ';
            y += lineHeight;
        } else {
            line = testLine;
        }
    }
    context.fillText(line, x, y);
}
// grayScale() allows to grayscale the current contents of the
function grayScale() {
    // get image data
    var imgData = context.getImageData(0, 0, w, h);
    var data = imgData.data;
    // loop and change pixel value
    for(var i = 0; i < data.length; i += 4) {
        var brightness = 0.34 * data[i] + 0.5 * data[i + 1] + 0.16 * data[i + 2];
        data[i] = brightness;
        data[i + 1] = brightness;
        data[i + 2] = brightness;
    }  
    // update image
    context.putImageData(imgData, 0, 0);
}
