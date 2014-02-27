<html>
<head>
	<title>TimeifY</title>
	<script src="http://code.jquery.com/jquery-1.11.0.min.js"></script>
<script src="http://code.jquery.com/jquery-migrate-1.2.1.min.js"></script>
</head>

<style>
	* {
		padding: 0px;
		margin: 0px;
	}
</style>

<body>

<canvas id="canvas" width="500px" height="300px"></canvas>
 <input type="file" accept="image/*" capture="camera" id="file-input">


<script>

var docHeight;
var docWidth;

(function() {
	docHeight = $( window ).height();
	docWidth = $( window ).width();
	console.log("docHeight = " + docHeight + "\tdocWidth = " +  docWidth);
	$( "#canvas" )
	.attr("width", docWidth + "px")
	.attr("height", docHeight + "px");
})();

$(function() {
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
        var $img = $('<img>', { src: e.target.result });
        var canvas = $('#canvas')[0];
        var context = canvas.getContext('2d');
        //context.rotate(90);

        $img.load(function() {
            context.drawImage(this, 0, 0);
        });
    }
});
</script>



</body>
</html>