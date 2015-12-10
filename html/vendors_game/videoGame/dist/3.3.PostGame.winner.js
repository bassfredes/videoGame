var regaloNavidad = regaloNavidad || {};

regaloNavidad.PostGame_winner = function() {};
regaloNavidad.PostGame_winner.prototype = {
    preload: function() {
    },
    create: function() {
        this.backgroundWinner = this.game.add.sprite(0, 0, 'backgroundWinner');
        this.btnVolverAJugar = this.game.add.button(this.game.world.width, this.game.world.centerY, 'btnVolverAJugar', this.clickOnbtnVolverAJugar, this);
        this.btnVolverAJugar.anchor.setTo(0.5);
        this.btnRanking = this.game.add.button(this.game.world.width, this.game.world.centerY+80, 'btnRanking', this.clickOnbtnRanking, this);
        this.btnRanking.anchor.setTo(0.5);
        this.btnCompartir = this.game.add.button(this.game.world.centerX, this.game.world.height, 'btnCompartir', this.clickOnbtnCompartir, this);
        this.btnCompartir.anchor.setTo(0.5);

        this.startBounceVolverAJugar();
    },
    update: function() {

    },
    render: function() {

    },
    clickOnbtnCompartir: function() {
    },
    clickOnbtnRanking: function() {
    },
    clickOnbtnVolverAJugar: function() {

    },
    startBounceVolverAJugar: function() {
        this.btnVolverAJugar.x = this.btnVolverAJugar.x;
        this.btnVolverAJugar.y = this.game.world.height-this.btnVolverAJugar.height+300;
        var bouncebtnVolverAJugar = this.game.add.tween(this.btnVolverAJugar);
        bouncebtnVolverAJugar.to({ x: this.game.world.width-this.btnVolverAJugar.width-20 }, 4000, Phaser.Easing.Bounce.InOut);
        bouncebtnVolverAJugar.start();

        this.btnRanking.x = this.game.world.width+this.btnRanking.width;
        var bouncebtnRanking = this.game.add.tween(this.btnRanking);
        bouncebtnRanking.to({ y: this.game.world.width-this.btnRanking.width-20 }, 4500, Phaser.Easing.Bounce.InOut);
        bouncebtnRanking.start();

        this.btnCompartir.x = this.game.world.width+this.btnCompartir.width;
        var bouncebtnCompartir = this.game.add.tween(this.btnCompartir);
        bouncebtnCompartir.to({ y: this.game.world.height-this.btnCompartir.height-20 }, 2000, Phaser.Easing.Bounce.InOut);
        bouncebtnCompartir.start();

    }
};
