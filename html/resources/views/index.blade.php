<!DOCTYPE html>
<html lang="es">

<head>
	<meta charset="UTF-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
	<meta name="mobile-web-app-capable" content="yes">
	<meta name="apple-mobile-web-app-capable" content="yes">
	<title>El Último Regalo - Mitocondria</title>
	<!-- !CSS -->
	<!-- inject:css -->
	<link rel="stylesheet" href="assets/css/reset.min.css">
	<link rel="stylesheet" href="assets/css/style.min.css">
	<link rel="stylesheet" href="assets/js/fancybox/jquery.fancybox.css">
	<!-- endinject -->
	<!-- !JS -->
	<!-- head:js -->
	<script src="assets/js/gameController/dist/gamecontroller.min.js"></script>
	<script src="assets/js/jquery/dist/jquery.min.js"></script>
	<script src="assets/js/phaser/build/phaser.min.js"></script>
	<script src="assets/js/state-transition/dist/phaser-state-transition-plugin.min.js"></script>
	<script src="assets/js/scripts.js"></script>
	<!-- endinject -->
	<!-- game:js -->

	<!-- endinject -->
	<script src="../vendors_game/videoGame/dist/1.Boot.js"></script>
	<script src="../vendors_game/videoGame/dist/2.Preload.js"></script>
	<script src="../vendors_game/videoGame/dist/3.0.PreGame.js"></script>
	<script src="../vendors_game/videoGame/dist/3.1.Connect.js"></script>
	<script src="../vendors_game/videoGame/dist/3.2.Game.js"></script>
	<script src="../vendors_game/videoGame/dist/3.3.PostGame.loser.js"></script>
	<script src="../vendors_game/videoGame/dist/3.3.PostGame.winner.js"></script>
	<script src="../vendors_game/videoGame/dist/4.Ranking.js"></script>
	<script>
    // Load the SDK asynchronously
    (function(d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) return;
        js = d.createElement(s); js.id = id;
        js.src = "//connect.facebook.net/en_US/sdk.js";
        fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
	window.fbAsyncInit = function() {
	    FB.init({
	        appId      : '1644249609162562',
	        cookie     : true,  // enable cookies to allow the server to access
	        // the session
	        xfbml      : true,  // parse social plugins on this page
	        version    : 'v2.5' // use version 2.2
	    });
	};
    </script>
    <meta name="csrf_token" content="{{ csrf_token() }}" />
</head>

<body>
	<div id="wrapper">
		<div class="header"></div>
		<!-- /header -->
		<div class="main"></div>
		<!-- /main -->
		<div class="footer"></div>
		<!-- /footer -->
	</div>
	<!--!/#wrapper -->
	<!-- !Javascript - for fast page loading -->
	<!-- inject:js -->
	<script src="assets/js/videoGame/dist/main.min.js"></script>
	<script src="assets/js/fancybox/jquery.fancybox.pack.js"></script>
	<!-- endinject -->
</body>

</html>
