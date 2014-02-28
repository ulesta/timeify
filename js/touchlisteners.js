//-------------------
//  HAMMER MULTITOUCH HANDLERS
//-------------------
var element = document.getElementById('canvas');
var hammertime1 = Hammer(element).on("drag", function(event) {
    var dx = event.gesture.deltaX;
    var dy = event.gesture.deltaY;
    console.log(dx + "\t" + dy);
    // clear canvas
    context.fillStyle = "#555";
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
    if (yearIn.length > 0 && messageIn.length > 0)
    { 
        text = yearIn + ": " + messageIn;
    } else 
    {
        text = "";
    }

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
    context.fillStyle = "#555";
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
