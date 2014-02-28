<?php   
    //Referennce this to include the image
    $myTimeImgAsset = "http://media-cache-ak0.pinimg.com/originals/c9/b8/06/c9b8066c932f02f8f20e68caa913bec7.jpg";
    $cameraIMG = "http://media-cache-ak0.pinimg.com/originals/7c/a3/c8/7ca3c88b9374d260c23cb05efd128a4a.jpg";
    $appName = "TimefY";
?>

<html>
<head>
	<title>TimeifY</title>
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0">
    <link href="https://fonts.googleapis.com/css?family=Roboto:400,100,100italic,300,900italic,500,900,700,700italic,400italic,500italic,300italic" rel='stylesheet' type='text/css'>
    <script src="http://code.jquery.com/jquery-1.11.0.min.js"></script>
    <script src="http://code.jquery.com/jquery-migrate-1.2.1.min.js"></script>
    <script src="hammer.js-1.0.6/hammer.js"></script>
    <!--<script src="js/bootstrap.js"></script>
    <link rel="stylesheet" type="text/css" href="css/colors.css">
    <link rel="stylesheet" type="text/css" href="css/text.css">-->
    <link rel="stylesheet" type="text/css" href="css/timestyle.css">
</head>

<body>

    <div class="cameraDiv" style="width: 100%;">
        <!-- Content goes here! -->
        <!-- Picture Btn -->
        <input type="file" accept="image/*" capture="camera" id="file-input" style="visibility:hidden;" />
        <img id="cameraBtn" src="/assets/btn_camera.png" width="75px" height="75px" />
        <!-- Picture Btn End -->
        <a href="#" id="rotate"><img width="75px" height="75px"  src="/assets/btn_rotate.png"></a>
        <a href="#" id="save"><img width="75px" height="75px"  src="/assets/btn_download.png"></a>
    </div>

    <div class="textForm">
        <h2>YEAR</h2>
        <input type="text" id="yearIn"></input>
        <h2>GOAL</h2>
        <textarea id="messageIn" placeholder="What are your goals?"></textarea>
        <p>
            <a href="#" id="donebtn">DONE</a>
        </p>
    </div>

    <canvas id="canvas" width="500px" height="300px">
    </canvas>

    <script src="js/timescripts.js"></script>
</body>
</html>
