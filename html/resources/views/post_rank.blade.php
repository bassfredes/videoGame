<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Login Facebook javascript</title>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>
    <meta name="csrf_token" content="{{ csrf_token() }}" />
    <script>
        var puntaje;
        $(document).ready(function(){
            puntaje = $('#btn_ajax').data('puntaje');
            $('#btn_ajax').click(function(){
                $.ajax({
                    type: 'post',
                    url: '/post_rank',
                    data: {'puntaje': puntaje},
                    headers:{
                        'X-CSRF-TOKEN': $('meta[name="csrf_token"]').attr('content')
                    },
                    success: function(msg){
                        console.log(msg);
                        //$('body').append(msg.post.puntaje);
                    },
                    error: function(msg){
                        console.log('errores');
                    }
                });
                return false;
            });
        });
    </script>
</head>
<body>
    <div class="container">
        <div class="row">
            <div class="col-sm-12">
                <a id="btn_ajax" class="btn btn-primary" data-puntaje="10500">Envía el puntaje dentro de un data</a>
            </div>
        </div>
    </div>
</body>
</html>
