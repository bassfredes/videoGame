var regaloNavidad = regaloNavidad || {};

var puntajeText_01;
var puntajeText_02;
var puntajeText_03;
var puntajeText_04;

var initialPuntaje01 = 0;
var initialPuntaje02 = 0;
var initialPuntaje03 = 0;
var initialPuntaje04 = 0;

var tiempoPostGame = 0;
regaloNavidad.PostGame_winner = function() {};
regaloNavidad.PostGame_winner.prototype = {
    preload: function() {
        this.game.world.setBounds(0, 0, this.game.width, this.game.height);
        if(bonificacion > 0) {
            bonificacion = bonificacion - puntajePorEstrella;
        }
        console.log("puntajePorMitoCoin: "+puntajePorMitoCoin);
        console.log("puntajePorEstrella: "+puntajePorEstrella);
        console.log("bonificacion: "+bonificacion);
        console.log("puntaje: "+puntaje);
    },
    create: function() {
        this.backgroundWinner = this.game.add.sprite(0, 0, 'backgroundWinner');
        this.btnVolverAJugar = this.game.add.button(this.game.world.width, this.game.world.centerY+230, 'btnVolverAJugar', this.clickOnbtnVolverAJugar, this);
        this.btnVolverAJugar.anchor.setTo(0.5);
        this.btnRanking = this.game.add.button(this.game.world.width, this.game.world.centerY+170, 'btnRanking', this.clickOnbtnRanking, this);
        this.btnRanking.anchor.setTo(0.5);
        this.btnCompartir = this.game.add.button(this.game.world.centerX, this.game.world.height, 'btnCompartir', this.clickOnbtnCompartir, this);
        this.btnCompartir.anchor.setTo(0.5);

        this.startBounceVolverAJugar();
        puntajeText_01 = this.game.add.text(this.game.world.centerX, this.game.world.centerY+50, '', { fill: '#FFD500'});
        puntajeText_01.setShadow(1, 1, 'rgba(0,0,0,0.5)', 10);
        puntajeText_01.resolution = 1;
        puntajeText_01.anchor.setTo(0.5);
        puntajeText_01.font = "Lobster";
        puntajeText_01.fontSize = 28;
        puntajeText_02 = this.game.add.text(this.game.world.centerX, this.game.world.centerY+90, '', { fill: '#FFD500'});
        puntajeText_02.setShadow(1, 1, 'rgba(0,0,0,0.5)', 10);
        puntajeText_02.resolution = 1;
        puntajeText_02.anchor.setTo(0.5);
        puntajeText_02.font = "Lobster";
        puntajeText_02.fontSize = 28;
        puntajeText_03 = this.game.add.text(this.game.world.centerX, this.game.world.centerY+130, '', { fill: '#FFD500'});
        puntajeText_03.setShadow(1, 1, 'rgba(0,0,0,0.5)', 10);
        puntajeText_03.resolution = 1;
        puntajeText_03.anchor.setTo(0.5);
        puntajeText_03.font = "Lobster";
        puntajeText_03.fontSize = 28;
        puntajeText_04 = this.game.add.text(this.game.world.centerX, this.game.world.centerY+180, '', { fill: '#FFFFFF'});
        puntajeText_04.setShadow(1, 1, 'rgba(0,0,0,0.5)', 10);
        puntajeText_04.resolution = 1;
        puntajeText_04.anchor.setTo(0.5);
        puntajeText_04.font = "Lobster";
        puntajeText_04.fontSize = 42;

        this.game.time.events.loop(Phaser.Timer.SECOND, this.updateTimeGameOver, this);
    },
    update: function() {
        if(tiempoPostGame > 0){
            if(initialPuntaje01 < puntajePorMitoCoin) {
                initialPuntaje01 += 100;
            }
            if(initialPuntaje01 >= puntajePorMitoCoin) {
                initialPuntaje01 = puntajePorMitoCoin;
            }
            if(initialPuntaje02 < puntajePorEstrella) {
                initialPuntaje02 += 100;
            }
            if(initialPuntaje02 >= puntajePorEstrella) {
                initialPuntaje02 = puntajePorEstrella;
            }
            if(initialPuntaje03 < bonificacion) {
                initialPuntaje03 += 100;
            }
            if(initialPuntaje03 >= bonificacion) {
                initialPuntaje03 = bonificacion;
            }
            if(initialPuntaje04 < puntaje) {
                initialPuntaje04 += 100;
            }
            if(initialPuntaje04 >= puntaje) {
                initialPuntaje04 = puntaje;
            }
        }
        puntajeText_01.setText("Monedas: "+initialPuntaje01);
        puntajeText_02.setText("Estrellas: "+initialPuntaje02);
        puntajeText_03.setText("Bonificación: "+initialPuntaje03);
        puntajeText_04.setText("Total: "+initialPuntaje04);
    },
    render: function() {
    },
    updateTimeGameOver: function() {
        tiempoPostGame++;
    },
    clickOnbtnCompartir: function() {
    },
    clickOnbtnRanking: function() {
    },
    clickOnbtnVolverAJugar: function() {
    },
    startBounceVolverAJugar: function() {
        this.btnVolverAJugar.x = this.btnVolverAJugar.x+this.btnVolverAJugar.width;
        var bouncebtnVolverAJugar = this.game.add.tween(this.btnVolverAJugar);
        bouncebtnVolverAJugar.to({ x: this.game.world.width-this.btnVolverAJugar.width+70 }, 1000, Phaser.Easing.Bounce.In);
        bouncebtnVolverAJugar.start();

        this.btnRanking.x = this.game.world.width+this.btnRanking.width;
        this.btnRanking.scale.setTo(0.8, 0.8);
        var bouncebtnRanking = this.game.add.tween(this.btnRanking);
        bouncebtnRanking.to({ x: this.game.world.width-this.btnRanking.width+17 }, 3000, Phaser.Easing.Bounce.InOut);
        bouncebtnRanking.start();

        this.btnCompartir.y = this.game.world.height+this.btnCompartir.height;
        var bouncebtnCompartir = this.game.add.tween(this.btnCompartir);
        bouncebtnCompartir.to({ y: this.game.world.height-this.btnCompartir.height+10 }, 3500, Phaser.Easing.Bounce.InOut);
        bouncebtnCompartir.start();

    }
};
