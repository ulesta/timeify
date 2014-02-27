<?php   
    //Referennce this to include the image
    $myTimeImgAsset = "http://media-cache-ak0.pinimg.com/originals/c9/b8/06/c9b8066c932f02f8f20e68caa913bec7.jpg";
    $cameraIMG = "http://media-cache-ak0.pinimg.com/originals/7c/a3/c8/7ca3c88b9374d260c23cb05efd128a4a.jpg";
    $appName = "TimefY";
?>

<html>
<head>
	<title>TimeifY</title>
	<script src="http://code.jquery.com/jquery-1.11.0.min.js"></script>
<script src="http://code.jquery.com/jquery-migrate-1.2.1.min.js"></script>
    <script src="hammer.js-1.0.6/hammer.js"></script>
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0">
    <link href="https://fonts.googleapis.com/css?family=Roboto:400,100,100italic,300,900italic,500,900,700,700italic,400italic,500italic,300italic" rel='stylesheet' type='text/css'>
        <link rel="stylesheet" type="text/css" href="css/colors.css">
        <link rel="stylesheet" type="text/css" href="css/text.css">
</head>

<style>
	* {
		padding: 0px;
		margin: 0px;
	}

    a {
        text-decoration: none;
    }

	div#menu {
		position: fixed;
		top: 0;
		left: 0;
	}
    body {
                background-color: #e5e5e6;
                width: 100%;
            }

            #cameraBtn {
                margin-right: auto;
                margin-left: auto;
            }

            .cameraDiv {
                width: 100%;
                text-align: center;
                position: absolute;
                bottom: 16px;
            }

        div.textForm {
            text-align: center;
            position: fixed;
            left: -40%;
            margin-left: 50%;
            width: 80%;
            background-color: white;
            padding: 0.5em;
            border-radius: 0em 0em 2.5em 2.5em;
            font-family: helvetica;
            font-weight: bolder;
        }

        input#yearIn, textarea#messageIn {
            margin: 0.5em;
            border: 3px solid #cccccc;
            padding: 5px;
            font-family: Tahoma, sans-serif;
            font-size: 14pt;
        }

        textarea#messageIn {
            width: 95%;
        }

        h2 {

            color: #e41937;
            letter-spacing: 0.2em;
        }

        a#donebtn {
            display: block;
            margin: 0 auto;
            color: white;
            width: 5em;
            border-radius: 0.5em;
            padding: 1.5em;
            background-color: #e41937;
        }


</style>

<body>

<div class="cameraDiv" style="width: 100%;">

            <!-- Content goes here! -->

            <!-- Picture Btn -->
            <input type="file" accept="image/*" capture="camera" id="file-input" style="visibility:hidden;" />
            <img id="cameraBtn" src="<?php print($cameraIMG); ?>" width="100px" height="100px" />
            <!-- Picture Btn End -->
            <a href="#" id="rotate"><img width="100px" height="100px"  src="https://cdn1.iconfinder.com/data/icons/defaulticon/icons/png/256x256/redo.png"></a>
            <a href="#" id="save"><img width="80px" height="80px"  src="save.png"></a>
</div>

<div class="textForm">
    <h2>YEAR</h2>
    <input type="text" id="yearIn"></input>
    <h2>GOAL</h2>
    <textarea id="messageIn" placeholder="What are your goals?"></textarea>
    <p><a href="#" id="donebtn">DONE</a></p>
</div>

<canvas id="canvas" width="500px" height="300px">
</canvas>
 
<!--div id="menu">
<input type="file" accept="image/*" capture="camera" id="file-input">

<p>
    <span id="xcoord">0</span>
    <span id="ycoord">0</span>
</p>
</div-->



        <script src="http://code.jquery.com/jquery-1.11.0.min.js"></script>
        <script src="http://code.jquery.com/jquery-migrate-1.2.1.min.js"></script>
        <script>
            //This is the onClick Listner for the button
            $("#cameraBtn").click(function(){
                console.log("camera button clicked");
                $("#file-input").click();
            });
        </script>
<script src="js/bootstrap.js"></script>


<script>
var $img = new Image();
var myImage;
var angle = 0;

var docHeight;
var docWidth;
var border = new Image();

var imgX = 0;
var imgY = 0;

var imgOldX = 0;
var imgOldY = 0;

var imgWidth;
var imgHeight;

var canvas;
var context;

var w, h;

var h

var imgScale = 1.0;



(function() {
    // CONSTRUCTOR INITIALIZE ALL VALS
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

})();

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
</script>


<script>

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

</script>

<script>
    var yearIn;
    var messageIn;
</script>


<script>
// on-click handlers
 $("a#rotate").on('click', function(e) {
        angle += 90;
        // clear canvas
        context.fillStyle = "#9ea7b8";
        context.fillRect(0,0,w,h);
        // save canvas matrixs
        context.save();
    	// Translate to the center point of our image
        if (myImage) 
        {
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
    	// And restore the context ready for the next loop  
        context.restore();
   	 	context.drawImage(border,0,0,w,h);

   	 	console.log("Rotated!");
        console.log("Angle: " + angle);
    });

$("a#save").on('click', function(e) {
        e.preventDefault();
        var dataURL = canvas.toDataURL();
        console.log(dataURL);
        window.open(dataURL);
    });

$("a#donebtn").on('click', function(e) {
        $("div.textForm").hide();
        yearIn = $("#yearIn").val();
        messageIn = $("#messageIn").val();
    });
</script>

<script>
// Hammer multitouch plugin
    var element = document.getElementById('canvas');
    var hammertime = Hammer(element).on("drag", function(event) {
        var dx = event.gesture.deltaX;
        var dy = event.gesture.deltaY;
        console.log(dx + "\t" + dy);
        // clear canvas
        context.fillStyle = "#9ea7b8";
        context.fillRect(0,0,w,h);
        // save canvas matrix
        context.save();
        // Translate to the center point of our image
        if (myImage) 
        {
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

        var maxWidth = w/3;
      var lineHeight = 30;
      var x = 20;
      var y = h/2;
      // MURICA
      var year = "2015";
      var message = "To do the hackathon";
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


var hammertime = Hammer(element).on("transform", function(event) {
        var scale = event.gesture.scale;
        // clear canvas
        context.fillStyle = "#9ea7b8";
        context.fillRect(0,0,w,h);
        // save canvas matrix
        context.save();
        imgScale = scale;
        if (myImage) 
        {
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
        //alert("transform!!");
    });


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
          }
          else {
            line = testLine;
          }
        }
        context.fillText(line, x, y);
        //y += lineHeight + lineHeight/2;
        //context.fillText(major + " " + grad, x, y);
      }

</script>


</body>
</html>
