var regaloNavidad = regaloNavidad || {};
var stadoSiguiente;
regaloNavidad.Connection = function() {};
regaloNavidad.Connection.prototype = {
    preload: function() {

    },
    create: function() {
        console.log("Pepe");
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
        stadoSiguiente.start('Game');
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
