var regaloNavidad = regaloNavidad || {};
var stadoSiguiente;
regaloNavidad.Connection = function() {};
regaloNavidad.Connection.prototype = {
    preload: function() {

    },
    create: function() {
        this.backgroundConnection = this.game.add.sprite(0, 0, 'backgroundConnection');
        this.btnSalir = this.game.add.button((this.game.world.centerX)-60, this.game.world.height, 'btnSalir', this.clickOnbtnSalir, this);
        this.btnConectarse = this.game.add.button(this.game.world.width, this.game.world.centerY+80, 'btnConectarse', this.clickOnbtnConectarse, this);

        this.startBounceConnection();
        stadoSiguiente = this.state;
    },
    update: function() {
    },
    render: function() {
    },
    clickOnbtnSalir: function() {
    },
    clickOnbtnConectarse: function() {
        FB.login(function(response) {
            checkLoginState();
        }, {scope: 'public_profile,email,user_friends'});
    },
    startBounceConnection: function() {
        this.btnConectarse.x = this.game.world.width+this.btnConectarse.width;
        var bouncebtnConectarse = this.game.add.tween(this.btnConectarse);
        bouncebtnConectarse.to({ x: this.game.world.centerX-this.btnConectarse.width/2 }, 1000, Phaser.Easing.Bounce.In);
        bouncebtnConectarse.start();

        this.btnSalir.x = this.btnSalir.x;
        this.btnSalir.y = this.game.world.height-this.btnSalir.height+300;
        var bouncebtnSalir = this.game.add.tween(this.btnSalir);
        bouncebtnSalir.to({ y: this.game.world.height-this.btnSalir.height-20 }, 2500, Phaser.Easing.Bounce.InOut);
        bouncebtnSalir.start();

    }
};

function checkLoginState() {
    FB.getLoginStatus(function(response) {
        statusChangeCallback(response);
    });
}
function statusChangeCallback(response) {
    if (response.status === 'connected') {
        // Logged into your app and Facebook.
        FB.api('/me?fields=name,email,birthday,devices,friends,picture', function(response) {
            idFacebookUser = response.id;
            console.log('Successful login for: ' + response.name);
            console.log(response);
            //$('#status').html('Thanks for logging in, <img src="'+response.picture.data.url+'" /> ' + response.name + '!');
            $.ajax({
                url: '/js_fblogin_callback',
                type: 'get',
                success: function () {
                    console.log('Conectados a FB y usuario guardado');
                }
            });
        });
        stadoSiguiente.start('Game');
    }
}
