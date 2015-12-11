<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Login Facebook javascript</title>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>
    <script src="/assets/js/scripts.js"></script>
    <script>
    // Load the SDK asynchronously
    (function(d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) return;
        js = d.createElement(s); js.id = id;
        js.src = "//connect.facebook.net/en_US/sdk.js";
        fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
    </script>
    <meta name="csrf_token" content="{{ csrf_token() }}" />

</head>
<body>
    <div class="container">
        <div class="row">
            <div class="col-sm-6">
                <!--fb:login-button scope="public_profile,email,user_friends" onlogin="checkLoginState();">
                </fb:login-button-->
                <a class="btn btn-primary" id="fbLogin">Login</a>

                <div id="status">
                </div>
            </div>
            <div class="col-sm-6">
                <a id="btn_ajax" class="btn btn-primary" data-puntaje="100">Envía el puntaje dentro de un data</a>
            </div>
        </div>
    </div>
</body>
</html>
