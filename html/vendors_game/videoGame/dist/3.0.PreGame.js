var regaloNavidad = regaloNavidad || {};
var stadoSiguiente;
regaloNavidad.PreGame = function() {};
regaloNavidad.PreGame.prototype = {
    preload: function() {

    },
    create: function() {
        this.backgroundComenzar = this.game.add.sprite(0, 0, 'backgroundComenzar');
        this.btnComenzar = this.game.add.button((this.game.world.centerX)-145, this.game.world.height, 'btnComenzar', this.clickOnbtnComenzar, this);
        this.btnRanking = this.game.add.button(this.game.world.width, this.game.world.centerY+80, 'btnRanking', this.clickOnbtnRanking, this);
        this.btnCompartir = this.game.add.button(this.game.world.width, this.game.world.centerY, 'btnCompartir', this.clickOnbtnCompartir, this);

        this.startBounceComenzarJuego();
        stadoSiguiente = this.state;

    },
    update: function() {
    },
    render: function() {
        this.game.debug.inputInfo(32, 38);
    },
    clickOnbtnCompartir: function() {
    },
    clickOnbtnRanking: function() {
        stadoSiguiente.start('Ranking');
    },
    clickOnbtnComenzar: function() {
        stadoSiguiente.start('Connection');
    },
    startBounceComenzarJuego: function() {
        this.btnComenzar.x = this.btnComenzar.x;
        this.btnComenzar.y = this.game.world.height-this.btnComenzar.height+300;
        var bouncebtnComenzar = this.game.add.tween(this.btnComenzar);
        bouncebtnComenzar.to({ y: this.game.world.height-this.btnComenzar.height-20 }, 2000, Phaser.Easing.Bounce.InOut);
        bouncebtnComenzar.start();

        this.btnRanking.x = this.game.world.width+this.btnRanking.width;
        var bouncebtnRanking = this.game.add.tween(this.btnRanking);
        bouncebtnRanking.to({ x: this.game.world.width-this.btnRanking.width-20 }, 4500, Phaser.Easing.Bounce.InOut);
        bouncebtnRanking.start();

        this.btnCompartir.x = this.game.world.width+this.btnCompartir.width;
        var bouncebtnCompartir = this.game.add.tween(this.btnCompartir);
        bouncebtnCompartir.to({ x: this.game.world.width-this.btnCompartir.width-20 }, 4000, Phaser.Easing.Bounce.InOut);
        bouncebtnCompartir.start();

    }
};
