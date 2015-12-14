<!DOCTYPE html>
<html lang="es">

<head>
	<meta charset="UTF-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
	<meta name="mobile-web-app-capable" content="yes">
	<meta name="apple-mobile-web-app-capable" content="yes">
	<title>El Último Regalo - Mitocondria</title>
	<meta property="og:title" content="El último regalo">
	<meta property="og:site_name" content="Mitocondria El último regalo">
	<meta property="og:url" content="http://192.168.1.143:8080/public/">
	<meta property="og:description" content="Mitocondria tiene para ti una sorpresa muy especial que podrás compartir con tus amigos y familia. Juega con nosotros y corre para salvar el último regalo.">
	<meta property="og:image" content="assets/images/facebbok_banner.jpg"/>
	<meta property="fb:app_id" content="1644249609162562">
	<meta property="og:type" content="website">
	<link rel="shortcut icon" href="assets/favicon/favicon.ico" type="image/x-icon" />
	<link rel="apple-touch-icon" href="assets/favicon/apple-touch-icon.png" />
	<link rel="apple-touch-icon" sizes="57x57" href="assets/favicon/apple-touch-icon-57x57.png" />
	<link rel="apple-touch-icon" sizes="72x72" href="assets/favicon/apple-touch-icon-72x72.png" />
	<link rel="apple-touch-icon" sizes="76x76" href="assets/favicon/apple-touch-icon-76x76.png" />
	<link rel="apple-touch-icon" sizes="114x114" href="assets/favicon/apple-touch-icon-114x114.png" />
	<link rel="apple-touch-icon" sizes="120x120" href="assets/favicon/apple-touch-icon-120x120.png" />
	<link rel="apple-touch-icon" sizes="144x144" href="assets/favicon/apple-touch-icon-144x144.png" />
	<link rel="apple-touch-icon" sizes="152x152" href="assets/favicon/apple-touch-icon-152x152.png" />
	<link rel="apple-touch-icon" sizes="180x180" href="assets/favicon/apple-touch-icon-180x180.png" />
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
<<<<<<< HEAD
	<!--
=======
	<!-- game:js -->

	<!-- endinject -->
>>>>>>> b88913ed238aea1ae971a3e95530dc9b088c8493
	<script src="../vendors_game/videoGame/dist/1.Boot.js"></script>
	<script src="../vendors_game/videoGame/dist/2.Preload.js"></script>
	<script src="../vendors_game/videoGame/dist/3.0.PreGame.js"></script>
	<script src="../vendors_game/videoGame/dist/3.1.Connect.js"></script>
	<script src="../vendors_game/videoGame/dist/3.2.Game.js"></script>
	<script src="../vendors_game/videoGame/dist/3.3.PostGame.loser.js"></script>
	<script src="../vendors_game/videoGame/dist/3.3.PostGame.winner.js"></script>
	<script src="../vendors_game/videoGame/dist/4.Ranking.js"></script>
<<<<<<< HEAD
	-->
	<!-- game:js -->
	<script src="assets/js/videoGame/dist/1.Boot.min.js"></script>
	<script src="assets/js/videoGame/dist/2.Preload.min.js"></script>
	<script src="assets/js/videoGame/dist/3.0.PreGame.min.js"></script>
	<script src="assets/js/videoGame/dist/3.1.Connect.min.js"></script>
	<script src="assets/js/videoGame/dist/3.2.Game.min.js"></script>
	<script src="assets/js/videoGame/dist/3.3.PostGame.loser.min.js"></script>
	<script src="assets/js/videoGame/dist/3.3.PostGame.winner.min.js"></script>
	<script src="assets/js/videoGame/dist/4.Ranking.min.js"></script>
	<!-- endinject -->
=======
>>>>>>> b88913ed238aea1ae971a3e95530dc9b088c8493
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
