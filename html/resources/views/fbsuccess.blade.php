<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>success</title>
</head>
<body>
success
@if (session('message'))
    <div class="alert alert-success">
        {{ session('message') }}
    </div>
@endif
</body>
</html>
