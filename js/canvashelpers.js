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

function redrawCanvas() {
    context.fillStyle = "#555";
    context.fillRect(0,0,w,h);
    // save canvas matrix
    context.save();
    // Translate to the center point of our image
    if (myImage) {
        console.log("REACHED MY IMAGE");
        context.translate(imgX + myImage.width * imgScale * 0.5, imgY + myImage.height * imgScale * 0.5);
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

    console.log("border.src = " + border.src + "\ncurrent Layout: " + layout);
}