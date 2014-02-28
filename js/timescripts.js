//-------------------
//  FIELDS
//-------------------
// img = new Image() is buggy in Chrome
var $img = document.createElement("img");
var myImage;
var angle = 0;

var docHeight, docWidth;
var border = document.createElement("img");

var imgX=0, imgY=0;
var imgOldX=0, imgOldY=0;
var imgWidth, imgHeight;

var canvas;
var context;

var w, h;

var imgScale = 1.0;

var text;
var yearIn = "";
var messageIn = "";

var layout = "york"

//-------------------
//  CONSTRUCTOR
//-------------------

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
    w = parseInt(w.substring(0, w.length - 2));
    h = $('#canvas').attr("height");
    h = parseInt(h.substring(0, h.length - 2));

    console.log("canvasw: " + w + "\tcanvash: " + h);
    // prevent scrolling on some devices
    $('body').on('touchmove', function(e) {
        e.preventDefault();
    });
});

$(function() {
	context.fillStyle = "#555";
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


